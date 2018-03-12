<?php

namespace Tests\Browser;

use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\Browser\Pages\LoginPage;
use Tests\DuskTestCase;
use Laravel\Dusk\Browser;

class LoginPageTest extends DuskTestCase
{
    use DatabaseTransactions;

    /**
     * Testing ability to login
     *
     * @return void
     * @throws
     */
    public function testLoginFunctionality()
    {
        factory(User::class)->create([
            'email' => 'testemail@example.com',
        ]);

        $this->assertDatabaseHas('users', ['email' => ['testemail@example.com']]);

        $this->browse(function (Browser $browser) {
            $browser->visit(new LoginPage())
                ->type('@email', 'testemail@example.com')
                ->type('@password', 'secret')
                ->press('Login')
                ->assertPathIs('/account');
        });
    }
}
