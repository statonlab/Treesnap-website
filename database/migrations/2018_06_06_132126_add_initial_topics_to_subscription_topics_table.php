<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddInitialTopicsToSubscriptionTopicsTable extends Migration
{
    protected $topics = [
        'Receive notifications when an observation is flagged',
        'Receive emails from Contact Us page',
    ];

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        foreach ($this->topics as $topic) {
            \App\SubscriptionTopic::create(['description' => $topic]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        foreach (\App\SubscriptionTopic::whereIn('description', $this->topics)->get() as $topic) {
            $topic->delete();
        }
    }
}
