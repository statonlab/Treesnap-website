<?php

namespace Tests\Browser;

use Carbon\Carbon;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\Browser\Pages\RegisterPage;
use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class RegisterPageTest extends DuskTestCase
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
            $browser->visit(new RegisterPage())
                ->assertSee('Register')
                ->type('name', 'Test User')
                ->type('email', 'myemail2@example.com')
                ->type('zipcode', '12345')
                ->type('password', 'secretpass')
                ->type('password_confirmation', 'secretpass')
                ->select('birth_year', Carbon::now()->year - 2)
                ->waitForText('guardian consent')
                ->check('minorConsent')
                ->check('agreement')
                ->press('Register')
                ->assertPathIs('/');
        });
    }
}
