<?php

namespace App\Console\Commands;

use App\File;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Storage;

class DeleteOldDownloadableFiles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'files:flush-old';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Removes old downloadable files from storage.';

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
        $files = File::where('auto_delete', true)->get();

        foreach ($files as $file) {
            if ($file->created_at->addHours(4)->greaterThan(Carbon::now())) {
                return;
            }

            if (Storage::delete($file->path)) {
                $file->delete();
            }
        }

        return 0;
    }
}
