<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Traits\Observable;
use App\Observation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\Responds;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Validator;

class ObservationsController extends Controller
{
    use Responds, Observable;

    /**
     * Get all observations related to a user.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $observations = $user->observations()->get();
        $data = [];

        foreach ($observations as $observation) {
            $data[] = $this->getObservationJson($observation);
        }

        return $this->success($data);
    }

    /**
     * Get one observation that is related to the authenticated user.
     *
     * @param $id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id, Request $request)
    {
        $user = $request->user();
        $observation = Observation::where('id', $id)->first();

        if (!$observation) {
            return $this->notFound('The observation you requested was not found.');
        }

        if ($observation->user_id != $user->id) {
            return $this->unauthorized();
        }

        return $this->success($this->getObservationJson($observation));
    }

    /**
     * Delete an observation related to the authenticated user.
     *
     * @param $id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id, Request $request)
    {
        $user = $request->user();

        // Make sure the user is updating a record that they own
        $observation = Observation::where('id', $id)->first();

        if (!$observation) {
            return $this->notFound('The observation you requested was not found.');
        }

        if ($observation->user_id != $user->id) {
            return $this->unauthorized();
        }

        $observation->delete();

        return $this->success([
          'data' => 'Observation has been deleted successfully',
        ]);
    }

    /**
     * Creates a new observation record.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), $this->validationRules());
        if ($validator->fails()) {
            return $this->error($validator->errors(), 200);
        }

        Log::info($request->all());

        /*
         * if ($request->has('images')) {
        } else {
            return $this->error('Images are required.', 200);
        }
         */
        // Upload images

        $images = $this->uploadImages($request->images);

        // Create the record
        $observation = Observation::create([
          'user_id' => $user->id,
          'observation_category' => $request->observation_category,
          'data' => json_decode($request->meta_data),
          'longitude' => $request->longitude,
          'latitude' => $request->latitude,
          'location_accuracy' => $request->location_accuracy,
          'collection_date' => Carbon::createFromFormat('m-d-Y H:i:s', $request->date),
          'images' => $images,
          'is_private' => $request->is_private,
        ]);

        if (!$observation) {
            return $this->error('Request could not be completed', 100);
        }

        return $this->created(['observation_id' => $observation->id]);
    }

    /**
     * Updates an existing record related to the authenticated user.
     *
     * @param $id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, Request $request)
    {
        $user = $request->user();

        // Make sure the user is updating a record that they own
        $observation = Observation::where('id', $id)->first();

        if (!$observation) {
            return $this->notFound('The observation you requested was not found.');
        }

        if ($observation->user_id != $user->id) {
            return $this->unauthorized();
        }

        $validator = Validator::make($request->all(), $this->validationRules());
        if ($validator->fails()) {
            return $this->error($validator->errors(), 200);
        }

        // Upload images
        $images = $this->uploadImages($request->images);

        // Create the record
        $observation->update([
          'user_id' => $user->id,
          'observation_category' => $request->observation_category,
          'data' => json_decode($request->meta_data),
          'longitude' => $request->longitude,
          'latitude' => $request->latitude,
          'location_accuracy' => $request->location_accuracy,
          'collection_date' => Carbon::createFromFormat('m-d-Y H:i:s', $request->date),
          'images' => $images,
          'is_private' => $request->is_private,
        ]);

        if (!$observation) {
            return $this->error('Request could not be completed', 101);
        }

        return $this->created('Observation record has been updated successfully');
    }

    /**
     * Returns the validation rules for observation create/update requests.
     *
     * @return array
     */
    protected function validationRules()
    {
        return [
          'observation_category' => [
            'required',
            Rule::in($this->observation_categories),
          ],
          'meta_data' => 'required|json',
          'longitude' => 'required|numeric',
          'latitude' => 'required|numeric',
          'location_accuracy' => 'required|numeric',
          'date' => 'required|date_format:"m-d-Y H:i:s"',
          'images.*' => 'required|image|max:2048',
          'is_private' => 'required|boolean',
        ];
    }

    /**
     * Upload images
     *
     * @param $images
     * @return array
     */
    protected function uploadImages($images)
    {
        $prefix = '/storage/images/';
        $paths = [];
        foreach ($images as $image) {
            $name = str_random(5) . uniqid() . '.' . $image->extension();
            $image->storeAs('images', $name, 'public');
            $paths[] = $prefix . $name;
        }

        return $paths;
    }
}
