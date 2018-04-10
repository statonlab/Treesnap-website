<?php

namespace App\Http\Controllers;

use App\Collection;
use App\File;
use App\Http\Controllers\Traits\Observes;
use App\Observation;
use App\Services\MetaLabels;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Storage;

class DownloadsController extends Controller
{
    use Observes;

    protected $extensions = [
        'csv',
        'tsv',
    ];

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
     * Create an collection of observations file.
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

        $header = [
            'Unique ID',
            'Observation Category',
            'Latin Name',
            'Coordinates',
            'Comments',
            'Address',
            'Collection Date',
        ];

        // Add meta labels to header
        $header = array_merge($header, $this->getMetaHeader());

        Storage::put($path, $this->line($header, $extension));

        // Generate Collection
        $collection->observations()
            ->with(['latinName'])
            ->chunk(200, function ($observations) use ($user, $path, $extension) {
                foreach ($observations as $observation) {
                    if ($this->hasPrivilegedPermissions($user, $observation)) {
                        $comment = isset($observation->data['comment']) ? $observation->data['comment'] : '';
                        $location = "{$observation->latitude}, {$observation->longitude}";
                    } else {
                        $comment = '';
                        $location = "{$observation->fuzzy_coords['latitude']}, {$observation->fuzzy_coords['longitude']}";
                    }

                    $line = [
                        $observation->mobile_id,
                        $observation->observation_category,
                        "{$observation->latinName->genus} {$observation->latinName->species}",
                        $location,
                        $comment,
                        $observation->address['formatted'],
                        $observation->collection_date->toDateString(),
                    ];

                    // Add meta data line
                    $line = array_merge($line, $this->extractMetaData($observation));
                    Storage::append($path, $this->line($line, $extension));
                }
            });

        $this->createAutoRemovableFile($path, $user->id);

        return response()->download(storage_path('app/'.$path), $name);
    }

    /**
     * Checks if a user has privileged access to an observation.
     *
     * @param User $user
     * @param Observation $observation
     * @return bool True if user has privileged access or false otherwise.
     */
    protected function hasPrivilegedPermissions(User $user, Observation $observation)
    {
        // Owners can access the observation private information
        if ($user->id === $observation->user_id) {
            return true;
        }

        // Admins and scientists can access the observation
        if ($user->isAdmin() || $user->isScientist()) {
            return true;
        }

        // Check if the owner has shared this observation with the user
        return $user->hasFriend($observation->user_id);
    }

    /**
     * Create a line based on extension.
     *
     * @param array $row
     * @param string $extension tsv or csv
     * @return string
     */
    protected function line(array $row, $extension)
    {
        switch ($extension) {
            case "tsv":
                return $this->tsvLine($row);
                break;
            case "csv":
                return $this->csvLine($row);
                break;
        }

        return '';
    }

    /**
     * Create a CSV line from array.
     *
     * @param array $row
     * @return string
     */
    protected function csvLine(array $row)
    {
        foreach ($row as $key => $value) {
            // Remove all quotes from the string since that's against csv specs
            $row[$key] = '"'.str_replace('"', '', $value).'"';
        }

        return implode(",", $row)."\n";
    }

    /**
     * Create a TSV line from array.
     *
     * @param array $row
     * @return string
     */
    protected function tsvLine(array $row)
    {
        return implode("\t", $row)."\n";
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
