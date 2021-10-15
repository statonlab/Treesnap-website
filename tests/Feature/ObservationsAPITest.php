<?php

namespace Tests\Feature;

use App\Observation;
use App\User;
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
        $user = factory(User::class)->create();
        factory(Observation::class, 10)->create(['user_id' => $user->id]);
        $this->actingAs($user);

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
        $user = factory(User::class)->create();
        $observation = factory(Observation::class)->create([
            'user_id' => $user->id,
        ]);
        $this->actingAs($user);

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
     * Test that comments marked as private don't show up for other users.
     *
     * @test
     */
    public function testPrivateCommentsDoNotShow()
    {
        $user = factory(User::class)->create();
        $observation = factory(Observation::class)->create([
            'is_private' => false,
            'has_private_comments' => true,
        ]);

        $this->actingAs($user);
        $response = $this->get('/web/observation/'.$observation->id);

        $response->assertStatus(200);
        $json = $response->json();
        $this->assertArrayNotHasKey('comment', $json['data']['meta_data']);
    }

    /**
     * Test that comments NOT marked as private Do show up for other users.
     *
     * @test
     */
    public function testPublicCommentsDoShow()
    {
        $user = factory(User::class)->create();
        $observation = factory(Observation::class)->create([
            'has_private_comments' => false,
            'is_private' => false,
        ]);

        $this->actingAs($user);
        $response = $this->get('/web/observation/'.$observation->id);

        $response->assertStatus(200);
        $json = $response->json();
        $this->assertArrayHasKey('comment', $json['data']['meta_data']);
    }

    /**
     * Test authorization to access some else's records.
     *
     * @test
     */
    public function testGettingRecordThatDoesNotBelongToTheUser()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);
        $observation = factory(Observation::class)->create();

        $response = $this->get("/api/v1/observation/{$observation->id}");

        $response->assertStatus(401);
    }

    /**
     * Test requests for non-existent records.
     */
    public function testGettingARecordThatDoesNotExist()
    {
        $user = factory(User::class)->create();
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
        $user = factory(User::class)->create();
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
            'is_private' => true,
            'mobile_id' => 1234,
            'other_identifiers' => 'some_id,some_id2',
        ]);

        $response->assertJsonStructure(['data' => ['observation_id']])->assertStatus(201);
        $data = $response->json()['data'];
        $observation = Observation::find($data['observation_id']);
        $this->assertNotEmpty($observation);
        $this->assertTrue(in_array('some_id',
            $observation->customIdentifiers->pluck('identifier')->toArray()));
    }

    /**
     * Test adding observations incrementally.
     */
    public function testAddingImagesIncrementallyToAnObservation()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        $observation = factory(Observation::class)->create([
            'user_id' => $user->id,
        ]);
        $images_count = collect($observation->images)->reduce(function ($carry, $item) {
            return $carry + count($item);
        });

        $response = $this->post("/api/v1/observation/image/$observation->id", [
            'key' => 'images',
            'image' => UploadedFile::fake()->image('avatar.jpg'),
        ]);

        $response->assertStatus(201);

        // Get the updated observation again from the DB
        $observation = Observation::find($observation->id);
        $new_count = collect($observation->images)->reduce(function ($carry, $item) {
            return $carry + count($item);
        });

        $this->assertEquals($images_count + 1, $new_count);
    }

    /**
     * Test updating an existing observation.
     */
    public function testUpdatingARecord()
    {
        $user = factory(User::class)->create();
        factory(Observation::class, 10)->create([
            'user_id' => $user->id,
        ]);
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
            'other_identifiers' => 'unique_identifier',
        ]);

        $response->assertJsonStructure(['data' => ['observation_id']])->assertStatus(201);

        $data = $response->json()['data'];
        $observation = Observation::find($data['observation_id']);
        $this->assertNotEmpty($observation);
        $this->assertTrue(in_array('unique_identifier',
            $observation->customIdentifiers->pluck('identifier')->toArray()));
    }

    /**
     * Test unauthorized update request.
     */
    public function testUnauthorizedRecordUpdating()
    {
        $user1 = factory(User::class)->create();
        $user2 = factory(User::class)->create();
        $this->actingAs($user1);
        $observation = factory(Observation::class)->create([
            'user_id' => $user2->id,
        ]);

        $response = $this->post("/api/v1/observation/{$observation->id}", [
            'data',
        ]);

        $response->assertStatus(401);
    }

    /**
     * Test deleting a record.
     */
    public function testDeletingARecord()
    {
        $observation = factory(Observation::class)->create();
        $user = $observation->user;
        $this->actingAs($user);

        $response = $this->delete("/api/v1/observation/{$observation->id}");

        $response->assertStatus(200);
    }

    /**
     * Test deleting a record that belongs to someone else.
     */
    public function testDeletingUnauthorizedRecord()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        // This observation will automatically create its own user
        // The user it creates is not the same as the acting user
        $observation = factory(Observation::class)->create();

        $response = $this->delete("/api/v1/observation/{$observation->id}");

        $response->assertStatus(401);
    }

    /**
     * Test the custom_id field.
     *
     * @test
     */
    public function testCreatingObservationWithCustomIDField()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user);

        $response = $this->post('/api/v1/observations', [
            'observation_category' => 'American Chestnut',
            'meta_data' => json_encode([
                'comment' => 'Comment: This record has been added via a test.',
            ]),
            'longitude' => -90.03073,
            'latitude' => 34.090,
            'location_accuracy' => 5.0,
            'date' => '03-23-2017 20:00:00',
            'is_private' => true,
            'mobile_id' => 12345678,
            'custom_id' => 'myCustomID',
        ]);

        $response->assertStatus(201);

        $json = $response->json();
        $observation_id = $json['data']['observation_id'];

        $observation = Observation::find($observation_id);

        $this->assertEquals('myCustomID', $observation->custom_id);
    }
}
