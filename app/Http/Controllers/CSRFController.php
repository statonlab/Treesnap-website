<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\Responds;
use Illuminate\Http\Request;

class CSRFController extends Controller
{
    use Responds;

    public function index()
    {
        return $this->success(csrf_token());
    }
}
