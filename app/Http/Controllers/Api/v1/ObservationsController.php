<?php

namespace App\Http\Controllers\Api\v1;

use App\Events\ObservationCreated;
use App\Events\ObservationDeleted;
use App\Http\Controllers\Api\v1\Traits\UploadsImages;
use App\Http\Controllers\Traits\Observes;
use App\LatinName;
use App\Observation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\Responds;
use Illuminate\Validation\Rule;
use Validator;
use Storage;

class ObservationsController extends Controller
{
    use Responds, Observes, UploadsImages;

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
            $data[] = $this->getObservationJson($observation, true, false);
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

        if (! $observation) {
            return $this->notFound('The observation you requested was not found.');
        }

        if ($observation->user_id != $user->id) {
            return $this->unauthorized();
        }

        return $this->success($this->getObservationJson($observation, true, false));
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

        // Make sure the user is deleting a record that they own
        $observation = Observation::where('id', $id)->first();

        if (! $observation) {
            return $this->notFound('The observation you requested was not found.');
        }

        if ($observation->user_id != $user->id) {
            return $this->unauthorized();
        }

        // Delete All Images
        $this->deleteImages($observation->images);

        // Broadcast that an observation has been deleted
        event(new ObservationDeleted());

        $observation->delete();

        return $this->success('Observation has been deleted successfully');
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

        // Upload images
        $images = $this->uploadImages($request->images);

        // Fuzzify coordinates for non-admin users
        $fuzzy_coords = $this->fuzifyCoorinates($request->latitude, $request->longitude);

        // Create the record
        $data = json_decode($request->meta_data);

        $observation = Observation::create([
            'user_id' => $user->id,
            'observation_category' => $request->observation_category,
            'data' => ! empty($data) ? $data : [],
            'longitude' => $request->longitude,
            'latitude' => $request->latitude,
            'location_accuracy' => $request->location_accuracy,
            'collection_date' => Carbon::createFromFormat('m-d-Y H:i:s', $request->date),
            'images' => $images,
            'fuzzy_coords' => $fuzzy_coords,
            'is_private' => $request->is_private,
            'mobile_id' => $request->mobile_id,
            'thumbnail' => '/images/placeholder-min.png',
            'latin_name_id' => LatinName::getID($request->observation_category, $data),
        ]);

        if (! $observation) {
            return $this->error('Request could not be completed', 100);
        }

        // Fire event
        event(new ObservationCreated($observation));

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
        $observation = Observation::find($id);

        if (! $observation) {
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
        $old_images = $observation->images;
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
            'mobile_id' => $request->mobile_id,
        ]);

        if (! $observation) {
            return $this->error('Request could not be completed', 101);
        }

        // Delete all old images
        $this->deleteImages($old_images);

        return $this->created(['observation_id' => $observation->id]);
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
            'meta_data' => 'json|nullable',
            'longitude' => 'required|numeric',
            'latitude' => 'required|numeric',
            'location_accuracy' => 'required|numeric',
            'date' => 'required|date_format:"m-d-Y H:i:s"',
            'images' => 'nullable',
            'images.*.*' => 'required|image|max:10240',
            'is_private' => 'required|boolean',
            'mobile_id' => 'required|numeric',
        ];
    }
}
