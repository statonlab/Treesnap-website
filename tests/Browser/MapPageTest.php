<?php

namespace Tests\Browser;

use App\Collection;
use App\Observation;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\Browser\Pages\MapPage;
use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class MapPageTest extends DuskTestCase
{
    use DatabaseTransactions;

    /**
     * A Dusk test example.
     *
     * @return void
     * @throws
     */
    public function testExample()
    {
        $this->browse(function (Browser $browser) {
            $user = factory(User::class)->create();

            $observations = factory(Observation::class, 10)->create([
                'observation_category' => 'Hemlock',
                'user_id' => $user->id,
            ]);

            $collection = factory(Collection::class)->create([
                'label' => 'My Collection',
                'user_id' => $user->id,
            ]);

            $collection->observations()->attach($observations);

            $browser->loginAs($user->id, 'web')
                ->visit(new MapPage())
                ->type('@searchInput', 'Hemlock')
                ->assertSee('American Chestnut')
                ->clickLink('American Chestnut')
                ->assertSee('American Chestnut (removed)')
                ->clickLink('Ash')
                ->assertSee('Ash (removed)')
                ->clickLink('American Elm')
                ->assertSee('American Elm (removed)')
                ->clickLink('Other')
                ->assertSee('Other (removed)')
                ->select('collections', 'My Collection')
                ->assertSelected('collections', $collection->id)
                ->assertSelectHasOptions('collections', $collection->label);
        });
    }
}
