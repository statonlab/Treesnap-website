<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;

use App\Observation;
use App\User;
use DB;
use Tests\TestCase;

class CollectionsTest extends TestCase
{
    use WithoutMiddleware, DatabaseTransactions;

    /**
     * Test adding observations to a collection
     */

    public function testGettingCollectionIndex()
    {
        $this->actingAs(User::first());

        $response = $this->get('/api/collections');

        $response->assertJsonStructure([
            'data' => [
                [
                    'collection_id',
                    'collection_label',
                    'collection_description',
                    'owner',
                    'shared_users',
                ],
            ],
        ])->assertStatus(200);
    }

    /*
     * Test getting specific collection
     */

    public function testGettingSpecificCollection()
    {
        $this->actingAs(User::first());
        $response = $this->get('/api/collection/{id}');
    }

    /*
     * Test deleting collection
     */
    public function testDeleteCollection()
    {
        $this->actingAs(User::first());

        $response = $this->delete("/api/collection/detach", [
            'label' => 'Test collection',
            'description' => 'this is a test collection',
        ]);

        $response->assertJonStructure([
            'data' => [
        [
            'collection_id',
            'collection_label',
            'collection_description',
            'owner',
            'shared_users',
        ],
    ],
        ])->asserStatus(201);
    }

    /**
     * Test creating a new collection
     */

    public function testCreateCollection()
    {
        $this->actingAs(User::first());

        $response = $this->post("/api/collections", [
            'label' => 'Test collection',
            'description' => 'this is a test collection',
        ]);

        $response->assertJonStructure(['data' => ['collection_id']])->asserStatus(201);
    }
}