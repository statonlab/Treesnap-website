<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Traits\Observable;
use App\Observation;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\v1\ResponseTrait;
use Illuminate\Validation\Rule;

class ObservationsController extends Controller
{
    use ResponseTrait, Observable;

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
        $observation = $user->observations()->where('id', $id)->first();

        if (!$observation) {
            return $this->notFound('The observation you requested was not found.');
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
        $observation = $user->observations()->where('id', $id)->first();

        if (!$observation) {
            return $this->notFound('The observation you requested was not found.');
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
        $this->validate($request, $this->validationRules());

        // TODO: UPLOAD IMAGES HERE
        $images = [
          '/images/ash.jpg',
        ];

        // Create the record
        $observation = Observation::create([
          'user_id' => $user->id,
          'observation_category' => $request->observation_category,
          'data' => json_decode($request->meta_data),
          'longitude' => $request->longitude,
          'latitude' => $request->latitude,
          'location_accuracy' => $request->location_accuracy,
          'collection_date' => $request->date,
          'images' => $request->images,
          'is_private' => $request->is_private,
        ]);

        if (!$observation) {
            return $this->error('Request could not be completed. Error code: 100');
        }

        return $this->created(['observation_id' => $observation->id]);
    }

    /**
     * Updates an existing record related to the authenticated user.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request)
    {
        $user = $request->user();

        // Make sure the user is updating a record that they own
        $rules = array_merge($this->validationRules(), [
          'observation_id' => [
            'required',
            Rule::exists('observations', 'id')->where('user_id', $user->id),
          ],
        ]);

        $this->validate($request, $rules);

        // TODO: UPLOAD IMAGES HERE
        $images = [
          '/images/ash.jpg',
        ];

        // Create the record
        $observation = Observation::update([
          'user_id' => $user->id,
          'observation_category' => $request->observation_category,
          'data' => json_decode($request->meta_data),
          'longitude' => $request->longitude,
          'latitude' => $request->latitude,
          'location_accuracy' => $request->location_accuracy,
          'collection_date' => $request->date,
          'images' => $request->images,
          'is_private' => $request->is_private,
        ])->where();

        if (!$observation) {
            return $this->error('Request could not be completed. Error code: 100');
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
          'date' => 'date_format:"m-d-Y H:i:s"',
          'images.*' => 'required|mimes:jpg,jpeg,png,bmp|max:2048',
          'is_private' => 'required|boolean',
        ];
    }
}
