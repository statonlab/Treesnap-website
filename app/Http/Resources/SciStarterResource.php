<?php

namespace App\Http\Resources;

use App\User;
use Exception;

class SciStarterResource extends Resource
{
    /**
     * The authentication key.
     *
     * @var string
     */
    protected $key;

    /**
     * Our Project ID.
     *
     * @var int
     */
    protected $project_id;

    /**
     * SciStarterResource constructor.
     */
    public function __construct()
    {
        parent::__construct();

        $this->setBaseUrl('https://scistarter.com/api');
        $this->key = config('services.scistarter.key');
        $this->project_id = config('services.scistarter.project_id');
    }

    /**
     * Retrieve a profile.
     *
     * @param \App\User $user
     * @return bool
     */
    public function profile(User $user)
    {
        $hash = hash('sha256', $user->email);
        $response = $this->get('profile/id', [
            'key' => $this->key,
            'hashed' => $hash,
        ]);

        $data = json_decode($response->getBody(), true);

        if (isset($data['error'])) {
            return false;
        }

        if (($data['result'] ?? '') === 'success') {
            return $data['scistarter_profile_id'];
        }

        return false;
    }

    /**
     * Register a new event.
     *
     * @param int $profile_id The SciStarter profile ID
     * @see \App\Http\Resources\SciStarterResource::profile()
     * @param string $type The type of the event as defined by the SciStarter API
     *                     (one of: 'collection', 'signup' or 'classification')
     * @param array $parameters
     * @throws \Exception
     *
     * @return array
     */
    public function event($profile_id, $type, $extras = [])
    {
        $type = strtolower($type);
        $allowed_types = ['collection', 'signup', 'classification'];
        if (! in_array($type, $allowed_types)) {
            throw new Exception('Invalid SciStarter event type. Please provide one of: "collection", "signup" or "classification".');
        }

        $response = $this->post('record_event?key='.$this->key, [
                'project_id' => $this->project_id,
                'profile_id' => $profile_id,
                'type' => $type,
            ] + $extras);

        return json_decode($response->getBody(), true);
    }
}
