<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Api\v1\Traits\UploadsImages;
use App\Http\Controllers\Traits\Responds;
use App\Jobs\CreateObservationThumbnailJob;
use App\Observation;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ImagesController extends Controller
{
    use UploadsImages, Responds;

    /**
     * Add a new image to an existing observation.
     *
     * @param int $id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create($id, Request $request)
    {
        /** @var Observation $observation */
        $observation = Observation::findOrFail($id);

        if ($observation->user_id !== $request->user()->id) {
            return $this->unauthorized();
        }

        $this->validate($request, [
            'key' => 'nullable',
            // Allow up to 30MB image size
            'image' => 'required|image|max:30240',
        ]);

        // Determine whether a thumbnail job should be dispatched
        //$should_create_thumbnail = false;
        //if (empty($observation->images)) {
        //    $should_create_thumbnail = true;
        //}

        // Upload and add image to observation
        $key = $request->key ?: 'images';
        $image = $this->uploadSingleImage($request->image);
        $observation = $this->mergeImageToObservation($observation, $key, $image);

        // Create a thumbnail if needed
        //if ($should_create_thumbnail) {
        $this->dispatch(new CreateObservationThumbnailJob($observation));
        //}

        return $this->created('Image has been saved successfully');
    }

    /**
     * Save image into existing observation.
     *
     * @param \App\Observation $observation
     * @param string $key the image key
     * @param string $image Image path
     *
     * @return Observation
     */
    protected function mergeImageToObservation(Observation $observation, $key, $image)
    {
        $observation_images = $observation->images;
        $observation_images[$key][] = $image;
        $observation->fill(['images' => $observation_images])->save();

        return $observation;
    }
}
