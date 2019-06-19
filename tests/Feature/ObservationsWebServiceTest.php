<?php

namespace Tests\Feature;

use App\Observation;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Laravel\Passport\Passport;
use Tests\TestCase;

class ObservationsWebServiceTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();
        $this->withHeader('Accept', 'application/json');
    }

    public function testMyObservationsService()
    {
        /** @var User $user */
        $user = factory(User::class)->create();
        $token = $user->createToken(uniqid());
        factory(Observation::class, 10)->create([
            'user_id' => $user,
        ]);

        $this->actingAs($user);

        $response = $this->withHeader('Authorization', "Bearer $token->accessToken")
            ->get('/web-services/v1/my-observations', [
                'per_page' => 25,
                'page' => 1,
            ]);

        $response->assertStatus(200);
        $response->assertJsonStructure($this->getPaginatedObservationResponseStructure());
    }

    public function testObservationsService()
    {
        /** @var User $user */
        $user = factory(User::class)->create();
        $token = $user->createToken(uniqid());
        factory(Observation::class, 10)->create([
            'user_id' => $user,
        ]);

        $this->actingAs($user);

        $response = $this->withHeader('Authorization', "Bearer $token->accessToken")
            ->get('/web-services/v1/observations', [
                'per_page' => 25,
                'page' => 1,
            ]);

        $response->assertStatus(200);
        $response->assertJsonStructure($this->getPaginatedObservationResponseStructure());
    }

    public function testGettingAnObservation()
    {
        /** @var User $user */
        $user = factory(User::class)->create();

        /** @var Observation $observation */
        $observation = factory(Observation::class)->create(['user_id' => $user->id]);

        $token = $user->createToken(uniqid());

        $response = $this->withHeader('Authorization', 'Bearer '.$token->accessToken)
            ->get('/web-services/v1/observation/'.$observation->id);
        $response->assertSuccessful();
    }

    protected function getPaginatedObservationResponseStructure()
    {
        return [
            'error_code',
            'data' => [
                'data' => [
                    [
                        'id',
                        'custom_id',
                        'category',
                        'genus',
                        'species',
                        'submitter',
                        'thumbnail',
                        'images',
                        'longitude',
                        'latitude',
                        'location_accuracy',
                        'collection_date',
                        'meta_data',
                        'url',
                    ],
                ],
                'current_page',
                'first_page_url',
                'from',
                'last_page',
                'last_page_url',
                'next_page_url',
                'path',
                'per_page',
                'prev_page_url',
                'to',
                'total',
            ],
        ];
    }
}
