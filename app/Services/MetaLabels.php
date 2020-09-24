<?php

namespace App\Services;

class MetaLabels
{
    /**
     * Available labels.
     *
     * @var array
     */
    protected $labels;

    /**
     * MetaLabels constructor.
     */
    public function __construct()
    {
        $this->labels = [
            'ashSpecies' => 'Species',
            'ashFrequency' => 'Ash Frequency',
            'seedsBinary' => 'Seeds',
            'seedsCollected' => 'Seeds Collected',
            'flowersBinary' => 'Flowers',
            'emeraldAshBorer' => 'Ash Borer',
            'woollyAdesCoverage' => 'Woolly Adelgids',
            'chestnutBlightSigns' => 'Chestnut Blight',
            'acorns' => 'Acorns',
            'cones' => 'Cones',
            'heightFirstBranch' => 'Height of First Branch',
            'oakHealthProblems' => 'Health Problems',
            'oregonAshHealth' => 'Oregon Ash Health',
            'diameterNumeric' => 'Tree Diameter',
            'crownHealth' => 'Crown Health',
            'crownPortion' => 'Collected Seed Location',
            'crownClassification' => 'Crown Classification',
            'otherLabel' => 'Tree Type',
            'locationCharacteristics' => 'Habitat',
            'nearbyTrees' => 'Trees Nearby',
            'nearByHemlock' => 'Nearby Hemlocks',
            'treated' => 'Treated',
            'partOfStudy' => 'Study',
            'heightNumeric' => 'Tree Height',
            'burrs' => 'Nuts/burrs',
            'catkins' => 'Catkins',
            'comment' => 'Comment',
            'diameterNumeric_confidence' => 'Diameter Confidence',
            'heightFirstBranch_confidence' => 'Height of First Branch Confidence',
            'numberRootSprouts' => 'Number of Root Sprouts',
            'numberRootSprouts_confidence' => 'Number of Root Sprouts Confidence',
            'heightNumeric_confidence' => 'Tree Height Confidence',
            'torreyaFungalBlight' => 'Fungal Blight',
            'conesMaleFemale' => 'Cones',
            'deerRub' => 'Deer Rub',
            'madroneDisease' => 'Disease',
            'crownAssessment' => 'Tree Crown Assessment',
            'standDiversity' => 'Stand Diversity',
            'standTagging' => 'Stand Tagging',
            'plantedWild' => 'Planted vs. Wild',
            'bearingFruit' => 'Bearing Fruit',
            'crownDieback' => 'Crown Dieback',
            'hybridAttributes' => 'Hybrid Attributes',
            'hybridTraits' => 'Hybrid Traits',
            'canopyCones' => 'Canopy Cones',
            'conesOpenClosed' => 'Tree Cones',
            'neighborCones' => 'Neighbor Cones',
            'neighborHealth' => 'Neighbor Health',
            'breastNumeric' => 'Tree Diameter',
        ];
    }

    /**
     * Get attributes.
     *
     * return string|null
     */
    public function __get($name)
    {
        if (isset($this->labels[$name])) {
            return $this->label[$name];
        }

        return null;
    }

    /**
     * Whether the key for the exists.
     *
     * @param $key
     * @return bool
     */
    public function has($key)
    {
        return isset($this->labels[$key]);
    }

    /**
     * Get json format.
     *
     * @return string
     */
    public function toJson()
    {
        return json_encode($this->toObject());
    }

    /**
     * Get labels in object format.
     * Useful for encoding to json.
     *
     * @return \stdClass
     */
    public function toObject()
    {
        return (object)$this->labels;
    }

    /**
     * Return the labels in array format.
     */
    public function toArray()
    {
        return $this->labels;
    }
}
