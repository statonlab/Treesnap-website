<?php

namespace App\Console\Commands;

use App\Observation;
use App\Services\Thumbnail;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Storage;

class ImageFixOrientation extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'image:fix-orientation';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Finds and fixes images with wrong orientation';

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
        Observation::chunk(200, function ($observations) {
            foreach ($observations as $observation) {
                $this->fixOrientation($observation);
            }
        });
    }

    /**
     * Do the fixing.
     *
     * @param $observation
     */
    protected function fixOrientation($observation)
    {
        $needs_thumbnail = false;
        foreach ($observation->images as $key => $images) {
            foreach ($images as $index => $image_path) {
                // Deal only with JPEG images
                $path = trim(str_replace('/storage', 'public', $image_path), '/');
                $path = str_replace('public/', 'app/public/', storage_path($path));

                if (! File::exists($path)) {
                    continue;
                }

                if (strtolower(File::extension($path) !== 'jpeg')) {
                    continue;
                }

                $exif = exif_read_data($path);
                if (! isset($exif['Orientation'])) {
                    continue;
                }

                if ($exif['Orientation'] !== 6) {
                    continue;
                }

                // The image has an invalid orientation, let's fix it
                $image = imagecreatefromjpeg($path);
                $rotated = imagerotate($image, 270, 0);
                $stream = fopen($path, 'wr');
                $fixed = imagejpeg($rotated, $stream, 100);
                if ($fixed) {
                    // Get public path
                    $needs_thumbnail = true;
                    $this->info("Fixed: $path");
                } else {
                    $this->error("Error: $path");
                }

                // Free up the memory
                imagedestroy($image);
                imagedestroy($rotated);
            }
        }

        if ($needs_thumbnail) {
            $thumbnail = new Thumbnail($observation);
            $path = $thumbnail->make();
            $observation->thumbnail = $path;
            $this->info("Thumbnail created: $path");
            $observation->save();
        }
    }
}
