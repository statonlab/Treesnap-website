<?php

namespace Tests\Browser;

use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\Browser\Pages\HomePage;
use Tests\DuskTestCase;
use Laravel\Dusk\Browser;

class HomePageTest extends DuskTestCase
{
    use DatabaseTransactions;

    /**
     * Tests that the homepage has login and register links
     * for unauthenticated users.
     *
     * @return void
     * @throws
     */
    public function testHomePageHasUnauthenticatedUserLinks()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit(new HomePage())->assertSee('Login')->assertSee('Register')->assertDontSee('Account');
        });
    }

    /**
     * Tests that the homepage has login and register links
     * for unauthenticated users.
     *
     * @return void
     * @throws
     */
    public function testHomePageHasAuthenticatedUserLinks()
    {
        $this->browse(function (Browser $browser) {
            $browser->loginAs(User::first())
                ->visit(new HomePage())
                ->assertDontSee('Login')
                ->assertDontSee('Register')
                ->assertSee('Account');
        });
    }
}
