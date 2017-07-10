<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\Responds;
use App\Note;
use Illuminate\Http\Request;

class NotesController extends Controller
{
    use Responds;

    /**
     * Get all notes related to a user.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $user = $request->user();

        return $this->success($user->notes);
    }

    /**
     * Get a note related to user and an observation.
     *
     * @param $observation_id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($observation_id, Request $request)
    {
        $user = $request->user();
        $note = Note::where(['observation_id' => $observation_id, 'user_id' => $user->id])->firstOrFail();

        return $this->success($note);
    }

    /**
     * Create a note record.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        $this->validate($request, [
            'observation_id' => 'required|integer|exists:observations,id',
            'note' => 'nullable|min:3',
        ]);

        $user = $request->user();

        if (empty($request->note)) {
            $deleted = false;

            $note = Note::where([
                'observation_id' => $request->observation_id,
                'user_id' => $user->id,
            ])->first();

            if ($note) {
                $note->delete();
                $deleted = true;
            }

            return $this->created([
                'id' => null,
                'note' => '',
                'observation_id' => $request->observation_id,
                'user_id' => $user->id,
                'updated_at' => null,
                'created_at' => null,
                'deleted' => $deleted,
            ]);
        }

        $note = Note::updateOrCreate([
            'user_id' => $request->user()->id,
            'observation_id' => $request->observation_id,
        ], ['note' => $request->note]);

        return $this->created(array_merge($note->toArray(), ['created' => true]));
    }

    /**
     * Delete a note record.
     *
     * @param $id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id, Request $request)
    {
        $note = Note::findOrFail($id);

        if ($note->id !== $request->user()->id) {
            return $this->unauthorized();
        }

        $note->delete();

        return $this->created('Note deleted');
    }
}
