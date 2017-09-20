<?php

namespace App\Http\Controllers;

use App\Collection;
use App\File;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Storage;

class DownloadsController extends Controller
{
    protected $extensions = [
        'csv',
        'tsv',
    ];

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
        $user = $request->user();
        if (! $collection->users->contains('id', $user->id)) {
            return abort(403);
        }

        if (! $this->allowedExtension($extension)) {
            return abort(400, 'Invalid extension');
        }

        $path = 'downloads/'.$collection->label.'_'.uniqid().'.'.$extension;
        $name = $collection->label.'_'.Carbon::now()->format('m_d_Y').'.'.$extension;

        $header = [
            'Observation Category',
            'Coordinates',
            'Comments',
            'Address',
            'Collection Date',
        ];

        Storage::disk('local')->put($path, $this->line($header, $extension));

        $collection->observations()->chunk(200, function ($observation) use ($path, $extension) {
            $line = [
                $observation->observation_category,
                "{$observation->latitude}, {$observation->longitude}",
                isset($observation->data['comment']) ? $observation->data['comment'] : 'NULL',
                $observation->address['formatted'],
                $observation->collection_date->toDateString(),
            ];
            Storage::disk('local')->append($path, $this->line($line, $extension));
        });

        $this->createAutoRemovableFile($path, $user->id);

        return response()->download(storage_path('app/'.$path), $name);
    }

    /**
     * Create a line based on extension.
     *
     * @param array $row
     * @param $extension
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
            $row[$key] = '"'.$value.'"';
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

    protected function createAutoRemovableFile($path, $user_id)
    {
        return File::create([
            'user_id' => $user_id,
            'path' => $path,
            'auto_delete' => true,
        ]);
    }
}
