<?php

namespace App\Http\Controllers;

use App\Collection;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Storage;

class DownloadsController extends Controller
{
    protected $extensions = [
        'csv',
        'tsv',
    ];

    public function collection(Collection $collection, Request $request, $extension = 'tsv')
    {
        if (! $collection->users->contains('id', $request->user()->id)) {
            return abort(403);
        }

        if (! $this->allowedExtension($extension)) {
            return abort(400, 'Invalid extension');
        }

        $observations = $collection->observations;

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

        $observations->map(function ($observation) use ($path, $extension) {
            $line = [
                $observation->observation_category,
                "{$observation->latitude}, {$observation->longitude}",
                isset($observation->data['comment']) ? $observation->data['comment'] : 'NULL',
                $observation->address['formatted'],
                $observation->collection_date->toDateString(),
            ];
            Storage::disk('local')->append($path, $this->line($line, $extension));
        });

        return response()->download(storage_path('app/'.$path), $name);
    }

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
    }

    protected function csvLine(array $row)
    {
        foreach ($row as $key => $value) {
            $row[$key] = '"'.$value.'"';
        }

        return implode(",", $row)."\n";
    }

    protected function tsvLine(array $row)
    {
        return implode("\t", $row)."\n";
    }

    protected function allowedExtension($ext)
    {
        return in_array($ext, $this->extensions);
    }
}
