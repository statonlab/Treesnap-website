<?php

namespace App\Http\Controllers;

use App\SamplingProject;
use Illuminate\Http\Request;
use App\Http\Controllers\Traits\Responds;

class SamplingProjectController extends Controller
{
    use Responds;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $projects = SamplingProject::with('owner')
            ->withCount('users');

        return $this->success($projects->get());
    }

    /**
     * Show a sampling project record.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\SamplingProject $project
     */
    public function show(Request $request, SamplingProject $project)
    {
        return $this->success($project);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        $user = $request->user();

        $this->authorize('create', SamplingProject::class);

        $this->validate($request, [
           'has_public_coordinates' => 'required|bool',
           'name' => 'required|max:255',
           'traits.*' => 'required|array',
        ]);

        $project = SamplingProject::create([
            'user_id' => $user->id,
            'has_public_coordinates' => $request->has_public_coordinates,
            'name' => $request->name,
            'traits' => $request->traits,
        ]);

        return $this->created($project);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\SamplingProject  $project
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, SamplingProject $project)
    {
        $this->validate($request, [
            'has_public_coordinates' => 'required|bool',
            'name' => 'required|max:255',
            'traits' => 'required',
            'users' => 'required|array',
            'users.*' => 'exists:users,id',
        ]);

        $project->fill([
            'has_public_coordinates' => $request->has_public_coordinates,
            'name' => $request->name,
            'traits' => $request->traits,
        ])->save();

        foreach ($request->users as $user) {
            $project->users()->attach($user);
        }

        return $this->created($project);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\SamplingProject  $project
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Request $request, SamplingProject $project)
    {
        $this->authorize('delete', $project);

        $project->delete();

        return $this->success('Sampling project deleted successfully.');
    }
}
