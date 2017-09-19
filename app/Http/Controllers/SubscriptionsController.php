<?php

namespace App\Http\Controllers;

use App\Filter;
use Illuminate\Http\Request;

class SubscriptionsController extends Controller
{
    public function unsubscribeFilter(Filter $filter) {
        $this->authorize('update', $filter);
        $filter->notify = 0;
        return view('unsubscribed')->with([
            'name' => $filter->name
        ]);
    }
}
