<?php

namespace App\Services;

use App\Observation;
use Intervention\Image\ImageManagerStatic as Image;
use Storage;

class Thumbnail
{
    protected $observation;

    protected $options = [];

    /**
     * Thumbnail constructor.
     *
     * @param \App\Observation $observation
     */
    public function __construct(Observation $observation, array $options = [])
    {
        $this->observation = $observation;

        $this->options = array_merge([
            'width' => 600,
            'height' => 400,
            'storage_path' => 'app/public/thumbnails',
            'public_path' => '/storage/thumbnails',
            'default_image_path' => '/images/placeholder.png',
        ], $options);

        $this->options['storage_path'] = rtrim($this->options['storage_path'], '/');
        $this->options['public_path'] = rtrim($this->options['public_path'], '/');
    }

    /**
     * Make the thumbnails.
     *
     * @return string
     */
    public function make()
    {
        $this->deleteExistingThumbnail();

        $path = $this->flattenImages($this->observation->images);

        if ($path === false) {
            return $this->options['default_image_path'];
        }

        $path = $this->extractPath($path);

        if (! Storage::exists(str_replace('app/', '', $path))) {
            return $this->options['default_image_path'];
        }

        $image = Image::make(storage_path($path));
        $image->fit(600, 400);
        $thumbnail = $image->filename.'.'.$image->extension;
        $image->save(storage_path("{$this->options['storage_path']}/{$thumbnail}"));

        return "{$this->options['public_path']}/{$thumbnail}";
    }

    /**
     * Flatten images object to a one level array.
     *
     * @param array $images
     * @return string|boolean
     */
    protected function flattenImages($images)
    {
        foreach ($images as $image) {
            if (is_array($image)) {
                return $this->flattenImages($image);
                continue;
            }

            return $image;
        }

        return false;
    }

    /**
     * Get the storage path for the image.
     *
     * @param string $image
     * @param boolean $thumbnail whether the image is a thumbnail or a full image.
     * @return string
     */
    protected function extractPath($image, $thumbnail = false)
    {
        $parts = explode('/', $image);
        $name = $parts[count($parts) - 1];
        $subPath = $thumbnail ? 'thumbnails' : 'images';

        return "app/public/{$subPath}/{$name}";
    }

    /**
     * Delete any existing thumbnails from storage.
     */
    protected function deleteExistingThumbnail()
    {
        if (empty($this->observation->thumbnail)) {
            return;
        }

        $path = str_replace('app/', '', $this->extractPath($this->observation->thumbnail, true));

        if (! Storage::exists($path)) {
            return;
        }

        Storage::delete($path);
    }
}