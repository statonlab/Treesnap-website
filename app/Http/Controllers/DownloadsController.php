<?php

namespace App\Http\Controllers;

use App\Collection;
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
     * @var array
     */
    protected $labels;

    /**
     * DownloadsController constructor.
     */
    public function __construct()
    {
        $this->labels = (new MetaLabels())->toArray();
        unset($this->labels['comment']);
    }

    /**
     * @param int $id
     * @param \Illuminate\Http\Request $request
     * @param string $extension
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function filter($id, Request $request, $extension = 'tsv')
    {
        /** @var \App\User $user */
        $user = $request->user();

        $filter = Filter::findOrFail($id);

        $this->authorize('view', $filter);

        if (! $this->allowedExtension($extension)) {
            return abort(422, 'Invalid extension');
        }

        $label = $this->fileNameEscape($filter->name);
        $path = 'downloads/'.$label.'_'.uniqid().'.'.$extension;
        $name = $label.'_'.Carbon::now()->format('m_d_Y').'.'.$extension;

        $header = $this->prepHeader();

        Storage::put($path, $this->line($header, $extension));

        $filtered = Filter::apply($filter->rules);
        $filtered = $filtered->with(['latinName']);

        if (! $user) {
            $filtered->where('is_private', false);
        } elseif (! $user->isAdmin() && ! $user->isScientist()) {
            $filtered = $this->addPrivacyClause($filtered, $user);
        }

        $filtered->chunk(200, function ($observations) use ($user, $path, $extension) {
            foreach ($observations as $observation) {
                $line = $this->prepObservationLine($observation, $user);

                if ($line !== false) {
                    Storage::append($path, $this->line($line, $extension));
                }
            }
        });

        $this->createAutoRemovableFile($path, $user->id);

        return response()->download(storage_path('app/'.$path), $name);
    }

    /**
     * Create a collection of observations file.
     *
     * @param \App\Collection $collection
     * @param \Illuminate\Http\Request $request
     * @param string $extension
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function collection(Collection $collection, Request $request, $extension = 'tsv')
    {
        /** @var \App\User $user */
        $user = $request->user();
        if (! $collection->users->contains('id', $user->id)) {
            return abort(403);
        }

        if (! $this->allowedExtension($extension)) {
            return abort(422, 'Invalid extension');
        }

        $label = $this->fileNameEscape($collection->label);

        $path = 'downloads/'.$label.'_'.uniqid().'.'.$extension;
        $name = $label.'_'.Carbon::now()->format('m_d_Y').'.'.$extension;

        $header = $this->prepHeader();

        Storage::put($path, $this->line($header, $extension));

        // Generate Collection
        $collection->observations()
            ->with(['latinName'])
            ->chunk(200, function ($observations) use ($user, $path, $extension) {
                foreach ($observations as $observation) {
                    $line = $this->prepObservationLine($observation, $user);

                    if ($line !== false) {
                        Storage::append($path, $this->line($line, $extension));
                    }
                }
            });

        $this->createAutoRemovableFile($path, $user->id);

        return response()->download(storage_path('app/'.$path), $name);
    }

    /**
     * Download from My Observations Page.
     *
     * @param \Illuminate\Http\Request $request
     * @param string $extension
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function myObservations(Request $request, $extension = 'tsv')
    {
        $this->validate($request, [
            'search' => 'nullable',
            'collection_id' => 'nullable|exists:collections,id',
            'category' => ['nullable', Rule::in($this->observation_categories)],
            'group_id' => 'nullable|exists:groups,id',
            'advanced_filter' => 'nullable|json',
        ]);

        $user = $request->user();

        if (! $this->allowedExtension($extension)) {
            return abort(422, 'Invalid extension');
        }

        $label = $this->fileNameEscape('observations');
        $path = 'downloads/'.$label.'_'.uniqid().'.'.$extension;
        $name = $label.'_'.Carbon::now()->format('m_d_Y').'.'.$extension;

        $header = $this->prepHeader();

        Storage::put($path, $this->line($header, $extension));

        $this->getFilteredObservations($request)->chunk(200, function ($observations) use ($user, $path, $extension) {
            foreach ($observations as $observation) {
                $line = $this->prepObservationLine($observation, $user);

                if ($line !== false) {
                    Storage::append($path, $this->line($line, $extension));
                }
            }
        });

        $this->createAutoRemovableFile($path, $user->id);

        return response()->download(storage_path('app/'.$path), $name);
    }

    /**
     * Create the header array.
     *
     * @return array
     */
    protected function prepHeader()
    {
        $header = [
            'Unique ID',
            'Custom Identifier',
            'Observation Category',
            'Latin Name',
            'Latitude',
            'Longitude',
            'Location Accuracy',
            'Comments',
            'Address',
            'Collection Date',
        ];

        // Add meta labels to header
        return array_merge($header, $this->getMetaHeader());
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
        if ($this->hasPrivilegedPermissions($user, $observation)) {
            $latitude = $observation->latitude;
            $longitude = $observation->longitude;
            $location_accuracy = "Exact: within {$observation->location_accuracy} meters";
        } elseif ($observation->isPrivate) {
            // Ignore the observation if it is private and the user
            // does not have privileged permissions to access it
            return false;
        }

        if (! $observation->has_private_comments || $user->id === $observation->user_id) {
            $comment = isset($observation->data['comment']) ? $observation->data['comment'] : '';
        } elseif (isset($observation->data['comment'])) {
            unset($observation->data['comment']);
        }

        $line = [
            "{$observation->id}-{$observation->mobile_id}",
            $observation->custom_id ?: 'NULL',
            $observation->observation_category,
            "{$observation->latinName->genus} {$observation->latinName->species}",
            $latitude,
            $longitude,
            $location_accuracy,
            $comment,
            $observation->address['formatted'],
            $observation->collection_date->toDateString(),
        ];

        return array_merge($line, $this->extractMetaData($observation));
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
    protected function getMetaHeader()
    {
        return array_values($this->labels);
    }

    /**
     * Extract meta data as a line from observation.
     *
     * @param Observation $observation
     */
    protected function extractMetaData($observation)
    {
        $data = $observation->data;
        $line = [];
        foreach ($this->labels as $key => $label) {
            if (isset($data[$key])) {
                if (preg_match('/^\[.*\]$/i', $data[$key])) {
                    $line[] = implode(',', json_decode($data[$key]));
                } else {
                    $line[] = $data[$key];
                }
            } else {
                $line[] = 'NULL';
            }
        }

        return $line;
    }
}
