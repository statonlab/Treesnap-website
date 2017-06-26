<?php

namespace App\Http\Controllers\Admin;

use App\Confirmation;
use App\Http\Controllers\Traits\Responds;
use App\Observation;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ConfirmationsController extends Controller
{
    use Responds;

    /**
     * Get all confirmation records with their related observations.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $confirmations = $user->confirmations()->with('observations')->get();

        return $this->success($confirmations);
    }

    /**
     * Create or update a confirmation.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        $this->validate($request, [
            'observation_id' => 'required|exists:observations,id',
            'correct' => 'required|boolean',
        ]);

        $confirmation = Confirmation::updateOrCreate([
            'observation_id' => $request->observation_id,
            'user_id' => $request->user()->id,
        ], [
            'correct' => $request->correct,
        ]);

        return $this->created($confirmation);
    }

    /**
     * Delete a confirmation record.
     *
     * @param $id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id, Request $request)
    {
        $user = $request->user();
        $confirmation = Confirmation::where('user_id', $user->id)->findOrFail($id);

        $confirmation->delete();

        return $this->success('Confirmation deleted successfully');
    }

    /**
     * Count number of confirmed observations.
     *
     * @param $observation_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function count($observation_id)
    {
        $observation = Observation::findOrFail($observation_id);

        $correct = $observation->confirmations()->where('correct', true)->count();
        $incorrect = $observation->confirmations()->where('correct', false)->count();

        return $this->success([
            'correct' => $correct,
            'incorrect' => $incorrect,
        ]);
    }
}
