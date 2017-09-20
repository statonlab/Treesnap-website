<?php

namespace App\Http\Controllers;

use App\Collection;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Storage;

class DownloadsController extends Controller
{
    public function collection(Collection $collection, Request $request)
    {
        if (! $collection->users->contains('id', $request->user()->id)) {
            return abort(403);
        }

        $observations = $collection->observations;

        $path = 'downloads/'.$collection->label.'_'.uniqid() . '.tsv';
        $name = $collection->label.'_'.Carbon::now()->format('m_d_Y').'.tsv';


        $header = [
            'Observation Category',
            'Coordinates',
            'Comments',
            'Address',
            'Collection Date',
        ];
        Storage::disk('local')->put($path, implode("\t", $header) . "\n");

        $observations->map(function ($observation) use ($path) {
            $line = [
                $observation->observation_category,
                "{$observation->latitude}, {$observation->longitude}",
                isset($observation->data['comments']) ? $observation->data['comments'] : 'NULL',
                $observation->address['formatted'],
                $observation->collection_date->toDateString(),
            ];
            Storage::disk('local')->append($path, implode("\t", $line)."\n");
        });

        $file = Storage::disk('local')->get($path);

        return response()->download(base_path('storage/app/'.$path), $name);
    }
}
