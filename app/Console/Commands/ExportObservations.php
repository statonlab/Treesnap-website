<?php

namespace App\Console\Commands;

use App\Group;
use App\Observation;
use App\Services\Archive;
use Illuminate\Console\Command;

class ExportObservations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'observations:export {--group_id=-1} {--user_id=-1} {file : The name of the output file}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Export observations into CSV.';

    /**
     * @var resource
     */
    protected $file;

    /**
     * @var array
     */
    protected $images = [];

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $group_id = $this->optional($this->option('group_id'));
        $user_id = $this->optional($this->option('user_id'));
        $file = $this->argument('file');

        $this->file = fopen($file, 'w');
        if (! $this->file) {
            $this->error('Unable to open file '.$file);

            return;
        }

        $observations = Observation::with(['user']);

        if ($group_id) {
            $observations->whereIn('user_id',
                Group::findOrFail($group_id)->users->pluck('id'));
        } elseif ($user_id) {
            $observations->where('user_id', $user_id);
        }

        fputcsv($this->file, [
            'Identifier',
            'User Name',
            'User Email',
            'Species',
            'Collection Date',
            'Latitude',
            'Longitude',
            'Location Accuracy',
            'Diameter',
            'Diameter Unit',
            'Address',
            'Comments',
            'Images JSON',
        ]);

        $observations->get()->map(function (Observation $observation) {
            $this->printCsv($observation);
        });

        fclose($this->file);

        $archive = new Archive($this->images);
        $archive->zip('images.zip');

        $this->info('Done!');
    }

    /**
     * @param $value
     * @return |null
     */
    protected function optional($value)
    {
        if ($value == -1) {
            return null;
        }

        return $value;
    }

    /**
     * @param \App\Observation $observation
     */
    protected function printCsv(Observation $observation)
    {
        $species = $observation->observation_category;
        if ($species === 'Other') {
            $species = $observation->data['otherLabel'] ?? 'Other';
        }

        $data = [
            $observation->custom_id ?? 'undefined',
            $observation->user->name,
            $observation->user->email,
            $species,
            $observation->collection_date->toDateTimeString(),
            $observation->latitude,
            $observation->longitude,
            $observation->location_accuracy,
            $observation->data['diameterNumeric'] ?? 0,
            $observation->data['diameterNumeric_units'] ?? 'IN',
            $observation->address['formatted'] ?? '',
            $observation->data['comment'] ?? '',
            json_encode($observation->images),
        ];

        fputcsv($this->file, $data);

        $this->extractImages($observation->images);
    }

    /**
     * @param array $images
     */
    protected function extractImages(array $images)
    {
        foreach ($images as $data) {
            foreach ($data as $image) {
                $i = storage_path('app/public/images/'.basename($image));
                if (file_exists($i)) {
                    $this->images[] = $i;
                }
            }
        }
    }
}
