<?php

namespace App\Http\Controllers;

use App\Event;
use App\Http\Controllers\Traits\Responds;
use Carbon\Carbon;
use Illuminate\Http\Request;

class EventsController extends Controller
{
    use Responds;

    /**
     * Get a list of events.
     *
     * @param int $limit
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($limit = 3)
    {
        $events = Event::where('end_date', '>', Carbon::now())
            ->orderBy('start_date', 'asc')
            ->limit($limit)
            ->get()
            ->makeHidden('user_id')
            ->map(function (Event $event) {
                $start_date = $event->start_date;
                $end_date = $event->end_date;

                $event->formatted_start_date = [
                    'month' => $start_date->format('M'),
                    'day' => $start_date->format('d'),
                    'year' => $start_date->year,
                    'time' => $start_date->format('g:i A'),
                ];

                $event->formatted_end_date = $end_date ? [
                    'month' => $end_date->format('M'),
                    'day' => $end_date->format('d'),
                    'year' => $end_date->year,
                    'time' => $end_date->format('g:i A'),
                ] : null;

                return $event;
            });

        return $this->success($events);
    }
}
