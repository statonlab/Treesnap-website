<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\Responds;
use Illuminate\Http\Request;

class CSRFController extends Controller
{
    use Responds;

    public function index(Request $request)
    {
        return $this->success([
            '_token' => csrf_token(),
            'is_logged_in' => $request->user() ? true : false,
        ]);
    }
}
