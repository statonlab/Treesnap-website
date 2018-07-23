<?php

namespace Tests\Unit;

use App\Http\Controllers\Traits\Observes;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class FuzzifierTest extends TestCase
{
    use WithFaker, Observes;

    public function testFuzzifierCreatesUnequalCoorinates() {
        $latitude = $this->faker->latitude;
        $longitude = $this->faker->longitude;

        $fuzzified = $this->fuzifyCoorinates($latitude, $longitude);

        $this->assertNotEquals($latitude, $fuzzified['latitude']);
        $this->assertNotEquals($longitude, $fuzzified['longitude']);
    }
}
