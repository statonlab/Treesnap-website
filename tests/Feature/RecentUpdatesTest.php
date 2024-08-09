<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Treet;
use App\User;
use App\Role;

class RecentUpdatesTest extends TestCase
{
    use DatabaseTransactions;
    public function test_index(): void
    {
        factory(Treet::class)->create([
            'id'=>999,
            'app_name'=>'test',
            'description'=>'testing'
        ]);
        $response = $this->get('/web/treets/feed');
        $response->assertSuccessful();
    }
    public function test_edit(): void
    {
        //create admin user
        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'Admin')->first()->id,
        ]);
        $this->actingAs($user);

        //create entry
        factory(Treet::class)->create([
            'id'=>999,
            'app_name'=>'test',
            'description'=>'unchanged'
        ]);
        //get description
        $response = $this->get('/web/treets/feed');
        $description1 = $response->json()['data'][0]['description'];
        //edit description
        $response = $this->put('/web/treets/update/999',[
            'description'=>'changed'
        ]);
        $description2 = $response->json()['data']['description'];


        //compare descriptions
        $this->assertNotEquals($description1, $description2);


    }
    public function test_create(): void
    {
        //create admin user
        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'Admin')->first()->id,
        ]);
        $this->actingAs($user);

        //create entry
        $response = $this->post('/web/treets/create',[
            'app_name' => 'Test Name',
            'image_path' => 'ImagePath',
            'description' => 'Description'
        ]);

        $response->assertSuccessful();

    }
    public function test_destroy(): void
    {
        //create admin user
        $user = factory(User::class)->create([
            'role_id' => Role::where('name', 'Admin')->first()->id,
        ]);
        $this->actingAs($user);

        //create entry
        factory(Treet::class)->create([
            'id'=>999,
            'app_name'=>'test',
            'description'=>'testing'
        ]);
        //delete entry
        $response = $this->delete('/web/treet/999');
        
        //assert that entry has been removed
        $this->assertFalse(Treet::where('id','999')->exists());

    }
}
