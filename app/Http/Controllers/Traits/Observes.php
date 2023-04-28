<?php

namespace App\Http\Controllers\Traits;

use App\Collection;
use App\Services\MetaLabels;

trait Observes
{
    /**
     * Observation Categories.
     * Currently only names of plants.
     *
     * @var array
     */
    protected $observation_categories = [
        'American Chestnut',
        'American Beech',
        'Cacao',
        'Ash',
        'Hemlock',
        'White Oak',
        'American Elm',
        'Florida Torreya',
        'Eastern Larch',
        'Tanoak',
        'Pacific Madrone',
        'Oregon Ash',
        'Butternut',
        'Pinyon Pine',
        'Sassafras',
        'Other',
    ];

    /**
     * Get only the fields that we need from the DB.
     * This also allows join statements to be predictable.
     *
     * @var array
     */
    protected $observation_select_fields = [
        'observations.id',
        'observations.user_id',
        'observation_category',
        'observations.data',
        'observations.longitude',
        'observations.latitude',
        'observations.location_accuracy',
        'observations.address',
        'observations.images',
        'observations.collection_date',
        'observations.is_private',
        'observations.mobile_id',
        'observations.thumbnail',
    ];

    /**
     * Formats the observation record into the expected response.
     *
     * @param \App\Observation $observation
     * @param bool $admin
     * @param \App\User $user
     * @return array
     */
    protected function getObservationJson($observation, $admin = false, $user = null)
    {
        // Set Image Urls
        $images = [
            'images' => [],
        ];

        foreach ($observation->images as $key => $list) {
            foreach ($list as $image) {
                $images[$key][] = url($image);
            }
        }

        // In case fuzzified coordinates were not generated for this observation
        if (empty($observation->fuzzy_coords)) {
            $observation->fuzzy_coords = $this->fuzifyCoorinates($observation->latitude,
                $observation->longitude);
        }

        $isOwner = false;
        $inGroup = false;

        if ($user && $user->id === $observation->user_id) {
            $data = $observation->data;
            $isOwner = true;
        } elseif ($observation->has_private_comments) {
            $data = array_except($observation->data, ['comment']);
        } else {
            $data = $observation->data;
        }

        if ($user && ! $admin && ! $isOwner) {
            $inGroup = $user->hasFriend($observation->user_id);
        }

        $showData = $admin || $isOwner || $inGroup;

        return [
            'observation_id' => $observation->id,
            'user_id' => $observation->user_id,
            'observation_category' => $observation->observation_category,
            'meta_data' => $data,
            'location' => [
                'latitude' => $showData ? $observation->latitude : $observation->fuzzy_coords['latitude'],
                'longitude' => $showData ? $observation->longitude : $observation->fuzzy_coords['longitude'],
                'accuracy' => $observation->location_accuracy,
                'address' => $showData ? $observation->address : [],
            ],
            'images' => $images,
            'date' => $observation->collection_date,
            'is_private' => $observation->is_private,
            'mobile_id' => $observation->mobile_id,
            'flags' => $user ? $observation->flags : [],
            'collections' => $user ? $observation->collections : [],
            'confirmations' => $observation->confirmations,
            'thumbnail' => $observation->thumbnail,
            'user' => $this->getUserDetails($observation, $user, $inGroup, $admin),
            'has_private_comments' => $observation->has_private_comments,
            'custom_id' => $observation->custom_id,
            'identifiers' => $observation->relationLoaded('customIdentifiers') ? $observation->customIdentifiers : [],
        ];
    }

    /**
     * Determine whether the user name is anonymous.
     *
     * @param \App\Observation $observation
     * @param \App\User $user
     * @param bool $inGroup
     * @param bool $isAdmin
     * @return array
     */
    protected function getUserDetails($observation, $user, $inGroup, $isAdmin)
    {
        $anonymous = $observation->user->is_anonymous;
        $owner = false;

        if ($user) {
            $owner = $observation->user->id === $user->id;
        }

        $displayName = $isAdmin || ! $anonymous || $owner || $inGroup;

        return [
            'name' => $displayName ? $observation->user->name : 'Anonymous',
            'id' => $observation->user->id,
        ];
    }

    /**
     * Fuzzify coordinates.
     *
     * @param $original_latitude
     * @param $original_longitude
     * @return array
     */
    protected function fuzifyCoorinates($original_latitude, $original_longitude)
    {
        // Generate fuzzified coordinates.  Transform by 10,000 to ensure mt_rand is working on integers
        $miles = 5;
        //72.4637681159 = 1000 / 69 miles per lat/2 for radius
        $range = $miles * 72.4637681159;
        $latitude = $original_latitude * 10000 + mt_rand($range * (-1), $range);
        $longitude = $original_longitude * 10000 + mt_rand($range * (-1), $range);

        return [
            'latitude' => $latitude / 10000,
            'longitude' => $longitude / 10000,
        ];
    }

    /**
     * Create a response optimized for the map.
     *
     * @param $observations
     * @param bool $isAdmin
     * @param \App\User|bool $authenticated_user
     * @return array
     */
    protected function prepForMap($observations, bool $isAdmin, \App\User|bool $authenticated_user = false): array
    {
        $all = [];
        /** @var \App\Observation $observation */
        foreach ($observations as $observation) {
            $flattenedImages = [];
            foreach ($observation->images as $images) {
                foreach ($images as $image) {
                    $flattenedImages[] = $image;
                }
            }

            if (empty($observation->fuzzy_coords)) {
                $observation->fuzzy_coords = $this->fuzifyCoorinates($observation->latitude,
                    $observation->longitude);
            }

            $inGroup = false;
            $owner = false;

            if ($authenticated_user) {
                $owner = $observation->user_id === $authenticated_user->id;
            }
            if ($authenticated_user && !$isAdmin && !$owner) {
                $inGroup = $authenticated_user->hasFriend($observation->user_id);
            }

            $title = $observation->observation_category;
            $title = $title === 'Other' && isset($observation->data['otherLabel']) ? "{$title} ({$observation->data['otherLabel']})" : $title;
            $shareData = $isAdmin || $inGroup || $owner;

            if (! $observation->has_private_comments || ($authenticated_user && $authenticated_user->id === $observation->user_id)) {
                $data = $observation->data;
            } else {
                $data = array_except($observation->data, ['comment']);
            }

            $owner = $this->getUserDetails($observation, $authenticated_user, $inGroup,
                $isAdmin);

            $all[] = [
                'id' => $observation->id,
                'title' => $title,
                'category' => $observation->observation_category,
                'images' => $flattenedImages,
                'position' => [
                    'latitude' => $shareData ? $observation->latitude : $observation->fuzzy_coords['latitude'],
                    'longitude' => $shareData ? $observation->longitude : $observation->fuzzy_coords['longitude'],
                    'address' => $shareData ? $observation->address : [],
                    'accuracy' => $observation->location_accuracy,
                ],
                'owner' => $owner['name'],
                'user_id' => $owner['id'],
                'date' => $observation->collection_date->toDateString(),
                'data' => $data,
                'ref' => null,
                'flags' => $authenticated_user ? $observation->flags : [],
                'collections' => $authenticated_user ? $observation->collections : [],
                'confirmations_count' => $observation->confirmations_count,
                'thumbnail' => $observation->thumbnail,
                'has_private_comments' => $observation->has_private_comments,
                'custom_id' => $observation->custom_id,
                'mobile_id' => $observation->mobile_id,
            ];
        }

        return $all;
    }

    /**
     * Get the human readable label by key.
     *
     * @param $key
     * @return mixed
     */
    protected function getLabel($key)
    {
        $labels = new MetaLabels();
        if (! is_null($labels->{$key})) {
            return $labels->{$key};
        }

        return $key;
    }
}
