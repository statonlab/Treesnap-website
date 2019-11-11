<?php

namespace App\Services;

use App\Exceptions\UnableToCreateArchiveException;
use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Support\Facades\File;
use Storage;
use ZipArchive;

class Archive
{
    /**
     * A collection of file paths.
     *
     * @var \Illuminate\Support\Collection
     */
    protected $files;

    /**
     * Storage system.
     *
     * @var \Illuminate\Contracts\Filesystem\Filesystem
     */
    protected $storage;

    /**
     * FileCollection constructor.
     *
     * @param string[] $files
     * @param \Illuminate\Contracts\Filesystem\Filesystem $storage
     */
    public function __construct(array $files = [], Filesystem $storage = null)
    {
        $this->files = $files;
        $this->storage = $storage ?? Storage::disk();
    }

    /**
     * Add a file.
     *
     * @param string $file The file to add.
     * @return $this
     */
    public function add(string $file)
    {
        $this->files[] = $file;

        return $this;
    }

    /**
     * Get the list of files.
     *
     * @return \Illuminate\Support\Collection
     */
    public function files()
    {
        return $this->files;
    }

    /**
     * @param $file_path
     * @return $this
     */
    public function remove($file_path)
    {
        $this->files = array_filter($this->files, function ($file) use ($file_path) {
            return $file !== $file_path;
        });

        return $this;
    }

    /**
     * Create a zip file.
     *
     * @param string $path Optional file name. The file created will be placed in the
     *                      given disk.
     * @return string
     * @throws \App\Exceptions\UnableToCreateArchiveException
     */
    public function zip(string $name = null)
    {
        if (is_null($name)) {
            $name = uniqid().".zip";
        }

        $path = $this->storage->path($name);

        $zip = new ZipArchive();
        if ($zip->open($path, ZipArchive::CREATE) !== true) {
            throw new UnableToCreateArchiveException("Unable to create archive zip file at $path");
        }

        foreach ($this->files as $name => $file) {
            if (! file_exists($file)) {
                throw new UnableToCreateArchiveException("File $file does not exist and therefore we are unable to add it to the archive.");
            }

            if ($zip->addFile($file,
                    is_int($name) ? File::basename($file) : $name) === false) {
                throw new UnableToCreateArchiveException("Unable to add file $file to archive $path");
            }
        }

        if ($zip->close() !== true) {
            throw new UnableToCreateArchiveException("Unable to save archive zip file at $path");
        }

        return $path;
    }
}
