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
            'seedsBinary' => 'Seeds',
            'flowersBinary' => 'Flowers',
            'emeraldAshBorer' => 'Ash borer',
            'woollyAdesCoverage' => 'Woolly adelgids',
            'chestnutBlightSigns' => 'Chestnut blight',
            'acorns' => 'Acorns',
            'cones' => 'Cones',
            'heightFirstBranch' => 'Height of first branch',
            'oakHealthProblems' => 'Health problems',
            'diameterNumeric' => 'Tree diameter',
            'crownHealth' => 'Crown health',
            'crownClassification' => 'Crown classification',
            'otherLabel' => 'Tree type',
            'locationCharacteristics' => 'Habitat',
            'nearbyTrees' => 'Trees nearby',
            'nearByHemlock' => 'Nearby hemlocks',
            'treated' => 'Treated',
            'partOfStudy' => 'Study',
            'heightNumeric' => 'Tree height',
            'burrs' => 'Nuts/burrs',
            'catkins' => 'Catkins',
            'comment' => 'Comment',
            'diameterNumeric_confidence' => 'Diameter Confidence',
            'heightFirstBranch_confidence' => 'Height of First Branch Confidence',
            'numberRootSprouts' => 'Number of Root Sprouts',
            'numberRootSprouts_confidence' => 'Number of Root Sprouts Confidence',
            'heightNumeric_confidence' => 'Tree Height Confidence',
            'torreyaFungalBlight' => 'Fungal Blight',
            'conesMaleFemale' => 'Cones'
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
     * Get json format.
     *
     * @return string
     */
    public function toJson() {
        return json_encode($this->toObject());
    }

    /**
     * Get labels in object format.
     * Useful for encoding to json.
     *
     * @return object
     */
    public function toObject() {
        return (object) $this->labels;
    }

    /**
     * Return the labels in array format.
     */
    public function toArray() {
        return $this->labels;
    }
}
