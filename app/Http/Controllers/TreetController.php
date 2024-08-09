<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Treet;

class TreetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->validate($request, [
            'limit' => 'nullable|integer|min:6|max:90',
        ]);

        $limit = $request->limit ?: 10;

        $treets = Treet::select(['id','app_name', 'image_path', 'description', 'url', 'created_at'])
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();

        $treets->map(function ($treet) {
            $treet->date = $treet->created_at->format('m/d/y');
        });

        return $this->success($treets);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $this->authorize('create', Treet::class);

        $urls = ['Treesnap' => "https://treesnap.org/",
            'FlorestaDB' => "https://app.florestadb.org/login",
            'HealthyWoods' => "https://healthywoodsapp.org/",
            'Avid Deer' => "https://aviddeer.com/",
            'Eastern Forest Pests' => "https://easternforestpests.com/"];


        $treet = Treet::create([
            'app_name' => $request->app_name,
            'image_path' => $request->image_path,
            'description' => $request->description,
            'url' => $urls[$request->app_name]
        ]);

        return $this->created($treet);

    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Treet $treet)
    {
        $urls = ['Treesnap' => "https://treesnap.org/",
            'FlorestaDB' => "https://app.florestadb.org/login",
            'HealthyWoods' => "https://healthywoodsapp.org/",
            'Avid Deer' => "https://aviddeer.com/",
            'Eastern Forest Pests' => "https://easternforestpests.com/"];

        $this->authorize('edit', Treet::class);

        $treet = Treet::find($request->id);

        $treet->update([
            'app_name' => $request->app_name ?: $treet->app_name,
            'image_path' => $request->image_path ?: $treet->image_path,
            'description' => $request->description ?: $treet->description,
            'url' => $urls[$request->app_name]
        ]);
        return $this->success($treet);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Treet $treet)
    {
        $this->authorize('destroy', Treet::class);

        $treet->find($request->id)->delete();
        return $this->success($treet);
    }

}
