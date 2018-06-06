<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddKeyColumnToSubscriptionTopicsTable extends Migration
{
    protected $topics = [
        'flags' => 'Receive notifications when an observation is flagged',
        'contact' => 'Receive emails from Contact Us page'
    ];
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('subscription_topics', function (Blueprint $table) {
            $table->string('key')->nullable();
        });

        foreach ($this->topics as $key => $description) {
            $topic = \App\SubscriptionTopic::where('description', $description)->first();
            if($topic) {
                $topic->fill(['key' => $key])->save();
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('subscription_topics', function (Blueprint $table) {
            $table->dropColumn('key');
        });
    }
}
