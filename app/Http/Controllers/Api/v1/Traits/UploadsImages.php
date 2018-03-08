<?php

namespace App\Http\Controllers\Api\v1\Traits;

use Storage;

trait UploadsImages
{
    /**
     * Upload images
     *
     * @param $images
     * @return array
     */
    protected function uploadImages($images)
    {
        if (empty($images)) {
            return [];
        }

        $prefix = '/storage/images/';
        $paths = [];

        foreach ($images as $key => $list) {
            foreach ($list as $image) {
                $name = str_random(5).uniqid().'.'.$image->extension();
                $image->storeAs('images', $name, 'public');
                $paths[$key][] = $prefix.$name;
            }
        }

        return $paths;
    }

    /**
     * A wrapper to upload a single image.
     *
     * @param $image
     * @return mixed
     */
    protected function uploadSingleImage($image)
    {
        $paths = ['images' => [$image]];
        $images = $this->uploadImages($paths);

        return array_shift($images['images']);
    }

    /**
     * Delete a set of observation images.
     *
     * @param $images
     */
    protected function deleteImages($images)
    {
        foreach ($images as $key => $list) {
            foreach ($list as $image) {
                $name = trim(str_replace('/storage', 'public/', $image), '/');
                if (Storage::exists($name)) {
                    Storage::delete($name);
                }
            }
        }
    }
}
