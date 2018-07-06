<?php

namespace App\Services;

use App\Exceptions\UnitConversionException;
use App\Observation;

class AttachUnits
{
    /**
     * Attach units to observations.
     *
     * @param \App\Observation $observation
     *
     * @return Observation
     *
     * @throws \App\Exceptions\UnitConversionException
     */
    public function attach(Observation $observation)
    {
        // Extract meta data
        $data = $observation->data;
        if (isset($data['heightFirstBranch'])) {
            if (! isset($data['heightFirstBranch_units'])) {
                $data['heightFirstBranch_units'] = 'Feet';
            }

            $data['heightFirstBranch_values'] = $this->createValues($data['heightFirstBranch'],
                $data['heightFirstBranch_units']);
        }

        if (isset($data['diameterNumeric'])) {
            if (! isset($data['diameterNumeric_units'])) {
                $data['diameterNumeric_units'] = 'Inches';
            }

            $data['diameterNumeric_values'] = $this->createValues($data['diameterNumeric'],
                $data['diameterNumeric_units']);
        }

        if (isset($data['heightNumeric'])) {
            if (! isset($data['heightNumeric_units'])) {
                $data['heightNumeric_units'] = 'Feet';
            }

            $data['heightNumeric_values'] = $this->createValues($data['heightNumeric'], $data['heightNumeric_units']);
        }

        $observation->data = $data;

        return $observation;
    }

    /**
     * Convert and structure the data.
     *
     * @param $value
     * @param $unit
     *
     * @return array
     *
     * @throws \App\Exceptions\UnitConversionException
     */
    public function createValues($value, $unit)
    {
        $value = floatval($value);
        $converter = new UnitsConverter();

        $data = [
            'US_unit' => '',
            'US_value' => '',
            'metric_unit' => '',
            'metric_value' => '',
        ];

        $unit = ucwords($unit);

        if ($unit === 'Feet') {
            $data['US_unit'] = $unit;
            $data['US_value'] = $value;
            $data['metric_unit'] = 'Meters';
            $data['metric_value'] = $converter->feetToMeters($value);
        } elseif ($unit === 'Meters') {
            $data['US_unit'] = 'Feet';
            $data['US_value'] = $converter->metersToFeet($value);
            $data['metric_unit'] = $unit;
            $data['metric_value'] = $value;
        } elseif ($unit === 'Inches') {
            $data['US_unit'] = $unit;
            $data['US_value'] = $value;
            $data['metric_unit'] = 'cm';
            $data['metric_value'] = $converter->inchesToCentimeters($value);
        } elseif (strtolower($unit) === 'cm') {
            $data['US_unit'] = 'Inches';
            $data['US_value'] = $converter->centimetersToInches($value);
            $data['metric_unit'] = $unit;
            $data['metric_value'] = $value;
        } else {
            throw new UnitConversionException("Unknown unit $unit");
        }

        return $data;
    }
}
