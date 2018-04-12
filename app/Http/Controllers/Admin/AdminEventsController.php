<?php

namespace App\Http\Controllers\Admin;

use App\Event;
use App\Http\Controllers\Traits\Responds;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminEventsController extends Controller
{
    use Responds;

    /**
     * Get all events
     *
     * @param $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = intval($request->per_page) ?: 10;

        $events = Event::with([
            'user' => function ($query) {
                $query->select(['id', 'name']);
            },
        ])->paginate($limit);

        $events->getCollection()->transform(function (Event $event) {
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

    /**
     * Show an individual event.
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function show($id)
    {
        $event = Event::with([
            'user' => function ($query) {
                $query->select(['id', 'name']);
            },
        ])->findOrFail($id);

        $this->authorize('view', $event);

        return $this->success($event);
    }

    /**
     * Create a new event.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function create(Request $request)
    {
        $user = $request->user();

        $this->authorize('create', Event::class);

        $this->validate($request, $this->getValidationRules());

        $event = Event::create([
            'user_id' => $user->id,
            'title' => $request->title,
            'location' => $request->location,
            'start_date' => Carbon::createFromFormat('Y-m-d H:i:s', $request->start_date),
            'end_date' => Carbon::createFromFormat('Y-m-d H:i:s', $request->end_date),
            'timezone' => $request->timezone,
            'link' => $request->link,
            'platform' => $request->platform,
            'description' => $request->description,
        ]);

        $event->load([
            'user' => function ($query) {
                $query->select(['id', 'name']);
            },
        ]);

        return $this->created($event);
    }

    /**
     * Update an existing event.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function update($id, Request $request)
    {
        $event = Event::findOrFail($id);

        $this->authorize('update', $event);

        $this->validate($request, $this->getValidationRules());

        $event->update([
            'title' => $request->title,
            'location' => $request->location,
            'start_date' => Carbon::createFromFormat('Y-m-d H:i:s', $request->start_date),
            'end_date' => Carbon::createFromFormat('Y-m-d H:i:s', $request->end_date),
            'timezone' => $request->timezone,
            'link' => $request->link,
            'platform' => $request->platform,
            'description' => $request->description,
        ]);

        $event->load([
            'user' => function ($query) {
                $query->select(['id', 'name']);
            },
        ]);

        return $this->created($event);
    }

    /**
     * Delete an event.
     *
     * @param $id
     * @param \Illuminate\Http\Request $request
     * @throws \Illuminate\Auth\Access\AuthorizationException|\Exception
     */
    public function delete($id, Request $request)
    {
        $event = Event::findOrFail($id);

        $this->authorize('delete', $event);

        $event->delete();

        return $this->created();
    }

    /**
     * Get events validation rules for create and update.
     *
     * @return array
     */
    protected function getValidationRules()
    {
        return [
            'title' => 'required|max:255',
            'location' => 'nullable|max:255',
            'start_date' => 'required|date_format:Y-m-d H:i:s',
            'end_date' => 'required|date_format:Y-m-d H:i:s',
            'timezone' => 'required|min:3|max:3',
            'link' => 'nullable|url',
            'platform' => 'nullable|max:20',
            'description' => 'required|min:3',
        ];
    }
}
