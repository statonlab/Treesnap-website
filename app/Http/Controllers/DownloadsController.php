<?php

namespace App\Http\Controllers;

use App\Collection;
use App\DownloadStatistic;
use App\File;
use App\Filter;
use App\Http\Controllers\Traits\CreatesDownloadableFiles;
use App\Http\Controllers\Traits\FiltersObservations;
use App\Http\Controllers\Traits\Observes;
use App\Observation;
use App\Services\MetaLabels;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Storage;
use App\User;
use App\Http\Controllers\Traits\DealsWithObservationPermissions;

class DownloadsController extends Controller
{
    use Observes, DealsWithObservationPermissions, FiltersObservations, CreatesDownloadableFiles;

    /**
     * Supported formats.
     *
     * @var array
     */
    protected $extensions = [
        'csv',
        'tsv',
    ];

    /**
     * ALL labels available for all species, in no particular order
     * @var array
     */
    protected $labels;

    /**
     * ALL labels available for each species, keyed by species name
     * @var array
     */
    protected array $species_labels;

    /**
     * The single species selected in the Species dropdown. Defaults to ''
     * @var string
     */
    protected string $single_species = '';

    /**
     * One or more species selected in the Advanced Filter. Defaults to [].
     * If filtering by multiple species, is overwritten to be in same format as $labels
     * @var array
     */
    protected array $advanced_species = [];

    /**
     * DownloadsController constructor.
     */
    public function __construct()
    {
        $this->labels = (new MetaLabels())->toArray();
        unset($this->labels['comment']);
        $this->species_labels = (new MetaLabels())->speciesLabelstoArray();
    }

    /**
     * @param int $id
     * @param \Illuminate\Http\Request $request
     * @param string $extension
     * @return \Symfony\Component\HttpFoundation\StreamedResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function filter($id, Request $request, $extension = 'tsv')
    {
        /** @var \App\User $user */
        $user = $request->user();

        $filter = Filter::findOrFail($id);

        $this->authorize('view', $filter);

        if (!$this->allowedExtension($extension)) {
            return abort(422, 'Invalid extension');
        }

        $label = $this->fileNameEscape($filter->name);
        $path = 'downloads/' . $label . '_' . uniqid() . '.' . $extension;
        $name = $label . '_' . Carbon::now()->format('m_d_Y') . '.' . $extension;

        $header = $this->prepHeader();

        $filtered = Filter::apply($filter->rules);
        $filtered = $filtered->with(['latinName', 'user']);

        if (!$user) {
            $filtered->where('is_private', false);
        } elseif (!$user->isAdmin() && !$user->isScientist()) {
            $filtered = $this->addPrivacyClause($filtered, $user);
        }

        $count = $this->count($filtered);

        $filtered->withCount([
            'flags' => function ($query) {
                $query->where('reason', 'This tree is the wrong species');
            },
            'confirmations as incorrect_marks' => function ($query) {
                $query->where('correct', false);
            },
            'confirmations as correct_marks' => function ($query) {
                $query->where('correct', true);
            },
        ]);

        $this->download($path, $name, $count);

        return response()->streamDownload(function () use ($filtered, $user, $extension, $header) {
            echo $this->line($header, $extension);

            foreach ($filtered->cursor() as $observation) {
                $line = $this->prepObservationLine($observation, $user);

                if ($line !== false) {
                    echo $this->line($line, $extension);
                }
            }
        }, $name);
    }

    /**
     * Create a collection of observations file.
     *
     * @param \App\Collection $collection
     * @param \Illuminate\Http\Request $request
     * @param string $extension
     * @return \Symfony\Component\HttpFoundation\StreamedResponse
     */
    public function collection(Collection $collection, Request $request, $extension = 'tsv')
    {
        /** @var \App\User $user */
        $user = $request->user();
        if (!$collection->users->contains('id', $user->id)) {
            return abort(403);
        }

        if (!$this->allowedExtension($extension)) {
            return abort(422, 'Invalid extension');
        }

        $label = $this->fileNameEscape($collection->label);

        $path = 'downloads/' . $label . '_' . uniqid() . '.' . $extension;
        $name = $label . '_' . Carbon::now()->format('m_d_Y') . '.' . $extension;

        $header = $this->prepHeader();

        // Generate Collection
        $filtered = $collection->observations();
        $count = $this->count($filtered);
        $this->download($path, $name, $count);

        $filtered->with(['latinName', 'user']);
        $filtered->withCount([
            'flags' => function ($query) {
                $query->where('reason', 'This tree is the wrong species');
            },
            'confirmations as incorrect_marks' => function ($query) {
                $query->where('correct', false);
            },
            'confirmations as correct_marks' => function ($query) {
                $query->where('correct', true);
            },
        ]);

        return response()->streamDownload(function () use ($filtered, $user, $path, $extension, $header) {
            echo $this->line($header, $extension);

            foreach ($filtered->cursor() as $observation) {
                $line = $this->prepObservationLine($observation, $user);

                if ($line !== false) {
                    echo $this->line($line, $extension);
                }
            }
        }, $name);
        //$this->createAutoRemovableFile($path, $user->id);
    }

    /**
     * Download from My Observations Page.
     *
     * @param \Illuminate\Http\Request $request
     * @param string $extension
     * @return \Symfony\Component\HttpFoundation\StreamedResponse
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException|\Illuminate\Validation\ValidationException
     */
    public function myObservations(Request $request, $extension = 'tsv')
    {
        $this->validate($request, [
            'search' => 'nullable',
            'collection_id' => 'nullable|exists:collections,id',
            'category' => ['nullable', Rule::in($this->observation_categories)],
            'group_id' => 'nullable|exists:groups,id',
            'advanced_filter' => 'nullable|integer|exists:filters,id',
            'advanced_filters' => 'nullable|json',
            'status' => 'nullable|in:marked_correct_by_anyone,marked_correct_by_me',
        ]);

        $user = $request->user();

        if (!$this->allowedExtension($extension)) {
            return abort(422, 'Invalid extension');
        }

        $label = $this->fileNameEscape('observations');
        $path = 'downloads/' . $label . '_' . uniqid() . '.' . $extension;
        $name = $label . '_' . Carbon::now()->format('m_d_Y') . '.' . $extension;

        // Advanced filters get priority
        // If the advanced filter is selected, parse the observations and only pass $labels that exist within any of the observations' data columns
        if ($request->advanced_filters && array_values(json_decode($request->advanced_filters)->categories)) {
            $this->advanced_species = array_values(json_decode($request->advanced_filters)->categories);
        } // If the category filter is selected, parse the observations and only pass $labels that exist within any of the observations' data columns
        elseif ($request->category) {
            $this->single_species = $request->category;
        }

        $filtered = $this->getFilteredObservations($request);
        $filtered->withCount([
            'flags' => function ($query) {
                $query->where('reason', 'This tree is the wrong species');
            },
            'confirmations as incorrect_marks' => function ($query) {
                $query->where('correct', false);
            },
            'confirmations as correct_marks' => function ($query) {
                $query->where('correct', true);
            },
        ]);
        $count = $this->count($filtered);
        $this->download($path, $name, $count);

        return response()->streamDownload(function () use ($filtered, $user, $extension) {
            $header = $this->prepHeader();
            echo $this->line($header, $extension);

            foreach ($filtered->cursor() as $observation) {
                $line = $this->prepObservationLine($observation, $user);

                if ($line !== false) {
                    echo $this->line($line, $extension);
                }
            }
        }, $name);
    }

    /**
     * Create the header array.
     *
     * @return array
     */
    protected function prepHeader(): array
    {
        $header = [
            'Unique ID',
            'Custom Identifier',
            'Observation Category',
            'Latin Name',
            'Submitter',
            'Latitude',
            'Longitude',
            'Location Accuracy',
            'Comments',
            'Address',
            'Collection Date',
            'Flagged as Incorrect Species',
            'Marked as Correct Species',
        ];

        return array_merge($header, $this->getMetaHeader(), ['Url']);
    }

    /**
     * Prepares a line.
     *
     * @param $observation
     * @param $user
     * @return array|bool Returns an array of observation data.
     *                    Returns false if the observation is private.
     */
    protected function prepObservationLine($observation, $user)
    {
        $comment = '';
        $latitude = $observation->fuzzy_coords['latitude'];
        $longitude = $observation->fuzzy_coords['longitude'];
        $location_accuracy = 'Fuzzy: within 8 kilometers';
        $user_name = $observation->user->is_anonymous ? 'Anonymous' : $observation->user->name;
        if ($this->hasPrivilegedPermissions($user, $observation)) {
            $latitude = $observation->latitude;
            $longitude = $observation->longitude;
            $location_accuracy = "Exact: within {$observation->location_accuracy} meters";
            $user_name = $observation->user->name;
        } elseif ($observation->isPrivate) {
            // Ignore the observation if it is private and the user
            // does not have privileged permissions to access it
            return false;
        }

        $data = $observation->data;
        if (!$observation->has_private_comments || $user->id === $observation->user_id) {
            $comment = isset($data['comment']) ? preg_replace('/\s+/', ' ', trim($data['comment'])) : '';
        }

        $line = [
            $observation->mobile_id,
            $observation->custom_id ?: 'NULL',
            $observation->observation_category,
            "{$observation->latinName->genus} {$observation->latinName->species}",
            $user_name,
            $latitude,
            $longitude,
            $location_accuracy,
            $comment,
            $observation->address['formatted'],
            $observation->collection_date->toDateString(),
            (($observation->incorrect_marks ?? 0) + ($observation->flags_count ?? 0)) . ' times',
            "$observation->correct_marks times",
        ];

        $url = [url("observation/$observation->id")];

        return array_merge($line, $this->extractMetaData($observation), $url);
    }

    /**
     * Checks if given extension is allowed.
     *
     * @param $ext
     * @return bool
     */
    protected function allowedExtension($ext)
    {
        return in_array($ext, $this->extensions);
    }

    /**
     * Create a file DB record that can be auto removed.
     *
     * @param $path
     * @param $user_id
     * @return $this|\Illuminate\Database\Eloquent\Model
     */
    protected function createAutoRemovableFile($path, $user_id)
    {
        return File::create([
            'user_id' => $user_id,
            'path' => $path,
            'auto_delete' => true,
        ]);
    }

    /**
     * Clean up file names.
     *
     * @param $name
     * @return mixed
     */
    protected function fileNameEscape($name)
    {
        $name = str_replace('/', '_', $name);
        $name = str_replace(' ', '_', $name);

        return $name;
    }

    /**
     * Generate an array of labels for the header.
     *
     * @return array
     */
    protected function getMetaHeader(): array
    {
        // advanced filters get priority
        if ($this->advanced_species !== []) {
            // returns only labels used in the species specified in the Advanced Filter
            $advanced_labels = collect($this->advanced_species)->map(function ($name, $key) {
                return collect($this->species_labels[$name])->mapWithKeys(function ($species_label, $key) {
                    return [$species_label => $this->labels[$species_label]];
                });
            })->toArray();

            $this->advanced_species = array_merge(...$advanced_labels);

            return $this->advanced_species;
        } elseif ($this->single_species !== '') {
            // returns only labels used in the single species specified
            return collect($this->species_labels[$this->single_species])->map(function ($species_label) {
                return $this->labels[$species_label];
            })->toArray();
        } else {
            return array_values($this->labels);
        }
    }

    /**
     * Extract meta data as a line from observation.
     *
     * @param Observation $observation
     * @return array
     */
    protected function extractMetaData($observation)
    {
        $data = $observation->data;
        if (isset($data['comment'])) {
            unset($data['comment']);
        }
        $line = [];

        // advanced filters get priority
        if ($this->advanced_species !== []) {
            $iter = $this->advanced_species;
        } elseif ($this->single_species !== '') {
            $iter = array_flip($this->species_labels[$this->single_species]);
        } else {
            $iter = $this->labels;
        }

        foreach ($iter as $key => $label) {
            if (isset($data[$key])) {
                // categoryClicker must be handled differently
                if (isset($data[$key]['categories'])) {
                    $counts = $data[$key]['counts'];
                    $categories = $data[$key]['categories'];
                    $line[] = implode(', ', array_map(function ($count, $category) {
                        return "$count $category";
                    }, $counts, $categories));
                    // properly handle measurement values. i hope
                } elseif (str_ends_with($key, '_values')) {
                    $units = $data[substr($key,0, -7).'_units'];
                    $search = array_search(strtolower($units), array_map('strtolower', $data[$key]));
                    $line[] = $data[$key][$search];
                } else {
                    if (preg_match('/^\[.*\]$/i', $data[$key])) {
                        $line[] = implode(',', json_decode($data[$key]));
                    } else {
                        $line[] = $data[$key];
                    }
                }
            } else {
                $line[] = 'NULL';
            }
        }

        return $line;
    }

    /**
     * Get the count of observations.
     *
     * @param \App\Observation $observations
     * @return int
     */
    protected function count($observations)
    {
        $count = clone $observations;

        return $count->count();
    }

    /**
     * Send a download response and collect statistics.
     *
     * @param $path
     * @param $name
     * @param $count
     * @return void
     */
    protected function download($path, $name, $count)
    {
        $user = auth()->user();

        DownloadStatistic::create([
            'user_id' => $user->id,
            'observations_count' => $count,
        ]);
        //return response()->download(storage_path('app/'.$path), $name);
    }
}
