<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Treet;

class TreetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $treets = Treet::all();
        return $treets;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $treet = Treet::create([
            'app_name' => $request->app_name,
            'image_path' => $request->image_path,
            'description' => $request->description
        ]);
        return $this->created($treet);

    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Treet $treet)
    {
        $treet = Treet::find($request->id);

        $treet->update([
            'app_name' => $request->app_name,
            'image_path' => $request->image_path,
            'description' => $request->description
        ]);
        return $this->success($treet);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Treet $treet)
    {
        $treet->find($request->id)->delete();
        return $this->success($treet);
    }
    
    public function getTreetFeed(Request $request)
    {
        $this->validate($request, [
            'limit' => 'nullable|integer|min:6|max:90',
        ]);

        $limit = $request->limit ?: 10;

        $treets = Treet::select(['id','app_name', 'image_path', 'description', 'created_at'])
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
        
        $treets->map(function ($treet) {
            $treet->date = $treet->created_at->diffForHumans();
        });

        
        return $this->success($treets);
    }
}
