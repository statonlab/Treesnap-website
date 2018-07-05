<?php
/**
 * Created by PhpStorm.
 * User: Almsaeed
 * Date: 7/5/18
 * Time: 11:35 AM
 */

namespace App\Services;

class UnitsConverter
{
    /**
     * Convert from inches to cm
     *
     * @param float $inches
     * @return float
     */
    public function inchesToCentimeters($inches)
    {
        return $inches * 2.54;
    }

    /**
     * Convert from cm to in
     *
     * @param float $cm
     * @return float
     */
    public function centimetersToInches($cm)
    {
        return $cm * 0.393701;
    }

    /**
     * Convert from yards to meters
     *
     * @param float $yards
     * @return float
     */
    public function yardsToMeters($yards)
    {
        return $yards * 0.9144;
    }

    /**
     * Convert from meters to yards.
     *
     * @param float $meters
     * @return float
     */
    public function metersToYards($meters)
    {
        return $meters * 1.09361;
    }

    /**
     * Convert from feet to meters.
     *
     * @param float $feet
     * @return float
     */
    public function feetToMeters($feet)
    {
        return $feet * 0.3048;
    }

    /**
     * Convert from meters to feet.
     *
     * @param float $meters
     * @return float
     */
    public function metersToFeet($meters)
    {
        return $meters * 3.28084;
    }
}
