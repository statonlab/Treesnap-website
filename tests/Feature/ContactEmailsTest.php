<?php

namespace Tests\Feature;

use App\Http\Controllers\ContactController;
use App\Mail\ContactRequest;
use App\Role;
use App\SubscriptionTopic;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;

class ContactEmailsTest extends TestCase
{
    use DatabaseTransactions, WithFaker;

    /**
     * @test
     */
    public function testContactEmailsAreSentToSubscribedAdmins()
    {
        // Make sure emails are not getting sent for real
        Mail::fake();

        $admin_role_id = Role::where('name', 'Admin')->first()->id;
        $subscribedUser = factory(User::class)->create([
            'role_id' => $admin_role_id,
        ]);
        $subscribedUser->subscriptionTopics()->attach(SubscriptionTopic::where('key', 'contact')->first());
        $unsubscribedUser = factory(User::class)->create([
            'role_id' => $admin_role_id,
        ]);

        $contactController = new ContactController();
        $reflection = new \ReflectionClass($contactController);

        $method = $reflection->getMethod('getSubscribedAdmins');
        $method->setAccessible(true);
        $emails = $method->invoke($contactController);
        $this->assertContains($subscribedUser->email, $emails);

        $name = $this->faker->name;
        $email = $this->faker->email;
        $subject = $this->faker->sentence;
        $message = $this->faker->text;

        Mail::to($emails)->queue(new ContactRequest((object)[
            'name' => $name,
            'email' => $email,
            'subject' => $subject,
            'message' => $message,
        ]));

        Mail::assertQueued(ContactRequest::class, function ($mail) use ($subscribedUser, $unsubscribedUser) {
            return $mail->hasTo($subscribedUser->email) && ! $mail->hasTo($unsubscribedUser->email);
        });
    }
}
