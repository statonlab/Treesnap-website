<?php

namespace Tests\Feature;

use App\Observation;
use App\User;
use DB;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ObservationsAPITest extends TestCase
{
    use WithoutMiddleware, DatabaseTransactions;

    /**
     * Tests get request for all observation related to a user.
     *
     * @return void
     */
    public function testGettingRecords()
    {
        $this->actingAs(User::first());

        $response = $this->get('/api/v1/observations');

        $response->assertJsonStructure([
            'data' => [
                [
                    'observation_id',
                    'user_id',
                    'observation_category',
                    'meta_data',
                    'location' => [
                        'longitude',
                        'latitude',
                        'accuracy',
                    ],
                    'images',
                    'date',
                    'meta_data',
                    'is_private',
                ],
            ],
        ])->assertStatus(200);
    }

    /**
     * Test getting a specific record for a user.
     */
    public function testGettingOneRecord()
    {
        $user = User::first();
        $this->actingAs($user);

        $observation = Observation::where('user_id', $user->id)->first();

        $response = $this->get("/api/v1/observation/{$observation->id}");

        $response->assertJsonStructure([
            'data' => [
                'observation_id',
                'user_id',
                'observation_category',
                'meta_data',
                'location' => [
                    'longitude',
                    'latitude',
                    'accuracy',
                ],
                'images',
                'date',
                'meta_data',
                'is_private',
            ],
        ])->assertStatus(200);
    }

    /**
     * Test authorization to access some else's records.
     */
    public function testGettingRecordThatDoesNotBelongToTheUser()
    {
        $user = User::first();
        $this->actingAs($user);

        $observation = Observation::where('user_id', '!=', $user->id)->first();

        $response = $this->get("/api/v1/observation/{$observation->id}");

        $response->assertStatus(401);
    }

    /**
     * Test requests for non-existent records.
     */
    public function testGettingARecordThatDoesNotExist()
    {
        $user = User::first();
        $this->actingAs($user);

        // Make up a weird id
        $id = 'ua700xf';

        $response = $this->get("/api/v1/observation/{$id}");

        $response->assertStatus(404);
    }

    /**
     * Test creating a new observation.
     */
    public function testCreatingARecord()
    {
        $user = User::first();
        $this->actingAs($user);

        $response = $this->post("/api/v1/observations", [
            'observation_category' => 'American Chestnut',
            'meta_data' => json_encode([
                'comment' => 'Comment: This record has been added via a test.',
            ]),
            'longitude' => -90.03073,
            'latitude' => 34.090,
            'location_accuracy' => 5.00,
            'date' => '03-23-2017 20:00:00',
            'images' => [
                'images' => [
                    UploadedFile::fake()->image('avatar.jpg'),
                    UploadedFile::fake()->image('guy.jpg'),
                ],
            ],
            'is_private' => true,
            'mobile_id' => 1234,
        ]);

        $response->assertJsonStructure(['data' => ['observation_id']])->assertStatus(201);
    }

    /**
     * Test updating an existing observation.
     */
    public function testUpdatingARecord()
    {
        $user = User::first();
        $this->actingAs($user);
        $observation = $user->observations()->orderby('id', 'desc')->first();

        $response = $this->post("/api/v1/observation/{$observation->id}", [
            'observation_category' => 'American Chestnut',
            'meta_data' => json_encode([
                'comment' => 'Comment: This record has been updated via a test',
            ]),
            'longitude' => -90.03073,
            'latitude' => 34.090,
            'location_accuracy' => 5.00,
            'date' => '03-23-2017 20:00:00',
            'images' => [
                'images' => [
                    UploadedFile::fake()->image('avatar2.jpg'),
                    UploadedFile::fake()->image('hem.jpg'),
                ],
            ],
            'is_private' => true,
            'mobile_id' => 4021,
        ]);

        $response->assertJsonStructure(['data' => ['observation_id']])->assertStatus(201);
    }

    /**
     * Test unauthorized update request.
     */
    public function testUnauthorizedRecordUpdating()
    {
        $user = User::first();
        $this->actingAs($user);
        $observation = Observation::where('user_id', '!=', $user->id)->orderby('id', 'desc')->first();

        $response = $this->post("/api/v1/observation/{$observation->id}", [
            'data'
        ]);

        $response->assertStatus(401);
    }

    /**
     * Test deleting a record.
     */
    public function testDeletingARecord()
    {
        $user = User::has('observations')->first();
        $this->actingAs($user);
        $observation = $user->observations()->orderby('id', 'desc')->first();

        $response = $this->delete("/api/v1/observation/{$observation->id}");

        $response->assertStatus(200);
    }

    /**
     * Test deleting a record that belongs to someone else.
     */
    public function testDeletingUnauthorizedRecord()
    {
        $user = User::has('observations')->first();
        $this->actingAs($user);
        $observation = Observation::where('user_id', '!=', $user->id)->first();

        $response = $this->delete("/api/v1/observation/{$observation->id}");

        $response->assertStatus(401);
    }
}
