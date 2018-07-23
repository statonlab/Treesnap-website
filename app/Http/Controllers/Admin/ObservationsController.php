<?php

namespace App\Http\Controllers\Admin;

use App\Observation;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ObservationsController extends Controller
{
    public function index(Request $request) {
        $limit = 6;
        if($request->limit) {
            $limit = intval($request->limit) ?: 6;
        }

        $orderBy = 'created_at';
        $orderDir = 'desc';

        $observations = Observation::with('user');
    }
}
