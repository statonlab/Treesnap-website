<?php

namespace App\Http\Controllers;

use App\Services\Geocoder;
use Faker\Generator;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        dd(Geocoder::address(36.085666, -82.299790));
    }
}
