<?php

namespace App\Http\Controllers\WebServices\v1\ResponseFormatters;

use App\Observation;
use App\Services\MetaLabels;
use App\User;
use Illuminate\Support\Carbon;

class ObservationResponse
{
    /**
     * The authenticated user.
     *
     * @var \App\User
     */
    protected $user;

    /**
     * ObservationResponse constructor.
     *
     * @param \App\User $user The authenticated user.
     * @param \App\Observation $observation The observation to format.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Get a formatted observation array.
     *
     * @param \App\Observation $observation
     * @return array
     */
    public function format(Observation $observation)
    {
        $has_privileges = $this->hasPrivilegedAccess($observation);
        $include_comments = $observation->user_id !== $this->user->id ? $observation->has_private_comments : true;
        $category = trim($observation->observation_category);
        if ($category === 'Other' && isset($observation->data['otherLabel'])) {
            $category = "Other ({$observation->data['otherLabel']})";
        }

        return [
            'id' => $observation->id,
            'custom_id' => $observation->custom_id,
            'category' => $category,
            'genus' => $observation->latinName->genus,
            'species' => $observation->latinName->species,
            'submitter' => $observation->user->is_anonymous && ! $has_privileges ? 'Anonymous' : $observation->user->name,
            'thumbnail' => url($observation->thumbnail),
            'images' => $this->attachUrlToImages($observation->images),
            'longitude' => $has_privileges ? $observation->longitude : $observation->fuzzy_coords['longitude'],
            'latitude' => $has_privileges ? $observation->latitude : $observation->fuzzy_coords['latitude'],
            'location_accuracy' => $has_privileges ? "Within $observation->location_accuracy meters radius" : 'Within 8 kilometers radius',
            'collection_date' => Carbon::createFromDate($observation->collection_date)->format('Y-m-d H:i:s \G\M\T O'),
            'meta_data' => $this->constructMetaDataArray($observation->data, $include_comments),
            'url' => url("/observation/$observation->id"),
        ];
    }

    /**
     * A meta data formatter.
     *
     * @param array $data
     * @param  bool $include_comments whether to include comments
     * @return array
     */
    protected function constructMetaDataArray($data, $include_comments = true)
    {
        $constructed = $data;

        if (isset($constructed['comment']) && ! $include_comments) {
            unset($constructed['comment']);
        }

        return $constructed;
    }

    protected function attachUrlToImages($images)
    {
        if (empty($images)) {
            return [];
        }

        $newImages = [];
        foreach ($images as $key => $list) {
            foreach ($list as $item) {
                $newImages[$key][] = url($item);
            }
        }

        return $newImages;
    }

    /**
     * Whether the user has privileged access to the observation.
     *
     * @param \App\Observation $observation
     * @return bool
     */
    protected function hasPrivilegedAccess(Observation $observation)
    {
        $role = $this->user->role->name;

        if (in_array(strtolower($role), ['admin', 'scientist'])) {
            return true;
        }

        if ($this->user->hasFriend($observation->user_id)) {
            return true;
        }

        return false;
    }
}
