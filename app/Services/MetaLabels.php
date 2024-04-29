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
     * Lists labels by species.
     *
     * @var array
     */
    protected $species_labels;

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

            'age' => 'Age',
            'beechBarkDiseaseSymptoms' => 'Bark Disease',
            'beechHealthProblems' => 'Health Problems',
            'beechLeafDiseaseAdvancedSymptoms' => 'Leaf Disease (Advanced Symptoms)',
            'beechLeafDiseaseNoSymptoms' => 'Leaf Disease (No Symptoms)',
            'beechLeafDiseaseSomeSymptoms' => 'Leaf Disease (Mild Symptoms)',
            'budsDevelopment' => 'Buds Development',
            'canopyDieback' => 'Canopy Dieback',
            'canopyHealth' => 'Canopy Health Assessment',
            'cocoaHabitat' => 'Habitat',
            'collectedMaterials' => 'Materials Collected',
            'isReproducing' => 'Reproducing',
            'laurelWilt' => 'Laurel Wilt',
            'locationComment' => '',
            'needleAmount' => 'Amount of Needles',
            'needleColor' => 'Needles Color',
            'numPods' => 'Number of Pods',
            'percentShade' => 'Percent Shade',
            'phenotype' => 'New Phenotype',
            'podPhenotype' => 'Pod Phenotype',
            'seedCollected' => 'Seed collected',
            'shadeSpecies' => 'Shade Species',
            'treeHealth' => 'Tree Health',
            'lingeringHemlock' => 'Observation Subject',
            'collectionPurpose' => 'Collection Purpose',
            'reasonForNoHemlocks' => 'No Hemlocks Because',
            'timeSpentSearching' => 'Time Spent',
            'hemlockAreaComments' => 'Describe Area',
            'hemlockStandQuantity' => 'Number of Lingering Trees',
            'moreThanTenHemlocks' => 'Comment on Quantity',
            'hemlockSpecies' => 'Species',
            'hemlockDiameter' => 'Tree Diameter',
            'lingeringWoollyAdesCoverage' => 'Hemlock Woolly Adelgid (HWA)',
            'elongateHemlockScaleCoverage' => 'Elongate Hemlock Scale (EHS)',
            'otherStressors' => 'Other Stressors',
            'otherStressorsComment' => 'Description of Stressors',
            'hemlockCones' => 'Cones',
            'hemlockCrownHealth' => 'Hemlock Crown Health',
            'hemlockCrownHealthComment' => 'Hemlock Crown Healthy Comment',
            'hemlockCanopyHealth' => 'Canopy Health',
            'hemlockCanopyHealthComment' => 'Canopy Health Description',
            'hemlockTreated' => 'Treated',
            'treatedComment' => 'Treatment Description',
            'crownPosition' => 'Crown Position',
            'crownPositionComment' => 'Crown Position Comment',
            'canopyPosition' => 'Canopy Position',
            'canopyPositionComment' => 'Canopy Position Description',
            'canopyClosure' => 'Canopy Closure',
            'canopyClosureComment' => 'Canopy Closure Description',
            'hemlockCrownClassification' => 'Hemlock Crown Classification',
            'recentGrowth' => 'Recent Growth',
            'treeMarked' => 'Tree Markings',
            'hemlockLocationCharacteristics' => 'Habitat',
            'locationDescription' => 'Habitat Description',
            'hemlockTraining' => 'Hemlock Training',
            'furtherAssessment' => 'Training',
            'furtherAssessmentCategory' => 'Nearby Tree Health',
            'furtherAssessmentCanopyHealth' => 'Nearby Canopy Health',
            'furtherAssessmentCanopyHealthComment' => 'Describe Nearby Canopy Health',
            'furtherAssessmentManagement' => 'Area Actively Managed',
            'furtherAssessmentManagementComment' => 'Describe Active Management',
            'furtherAssessmentHWA' => 'Nearby HWA',
            'furtherAssessmentEHS' => 'Nearby EHS',
            'furtherAssessmentStressors' => 'Further Stressors',
            'lowestLivingBranch' => 'Lowest Living Branch',
            'propertyOwner' => 'Property Owner',
            'propertyOwnerName' => 'Property Owner Name',
            'propertyOwnerEmail' => 'Property Owner Email',
            'propertyOwnerPhone' => 'Propety Owner Phone',
            'ownerNotified' => 'Owner Notified',
            'naturallyOccuring' => 'Naturally Occuring',
            'signsOfEAB' => 'Signs of EAB',
            'decomposing' => 'Decomposing',
            'flaking' => 'Flaking',
            'colorOfFlaking' => 'Color of Flaking',
            'nearbyTrees' => 'Nearby Trees',
            'treated' => 'Treated'
        ];

        $this->species_labels = [
            "American Chestnut" => [
                "burrs",
                "catkins",
                "chestnutBlightSigns",
                "plantedWild",
                // surroundings      ,
                // accessibility     ,
                "crownHealth",
                "diameterNumeric",
                "heightNumeric",
            ],


            "Ash" => [
                'ashSpecies',
                'locationCharacteristics',
                'seedsBinary',
                'flowersBinary',
                'emeraldAshBorer',
                'nearbyTrees',
                'crownHealth',
                'diameterNumeric',
                'treated',
            ],


            "Hemlock" => [
                // hemlockSpecies        ,
                // woollyAdesCoverage    ,
                // cones                 ,
                // crownClassification   ,
                // locationCharacteristics=> true,
                // nearbyTrees           ,
                // crownHealth           ,
                // diameterNumeric       ,
                // treated               ,
                'collectionPurpose',
                'lingeringHemlock',
                'reasonForNoHemlocks',
                'timeSpentSearching',
                'hemlockAreaComments',
                'hemlockStandQuantity',
                'moreThanTenHemlocks',
                'hemlockSpecies',
                'hemlockDiameter',
                'lingeringWoollyAdesCoverage',
                'elongateHemlockScaleCoverage',
                'otherStressors',
                'otherStressorsComment',
                'hemlockCones',
                'hemlockCrownHealth',
                'hemlockCrownHealthComment',
                'hemlockTreated',
                'treatedComment',
                'crownPosition',
                'crownPositionComment',
                'canopyClosure',
                // canopyClosureComment=> true,
                // hemlockCrownClassification=> true,
                'recentGrowth',
                'treeMarked',
                'hemlockLocationCharacteristics',
                'locationDescription',
                'hemlockTraining',
                'furtherAssessment',
                'furtherAssessmentCategory',
                'furtherAssessmentCanopyHealth',
                'furtherAssessmentCanopyHealthComment',
                'furtherAssessmentManagement',
                'furtherAssessmentManagementComment',
                'furtherAssessmentHWA',
                'furtherAssessmentEHS',
                'furtherAssessmentStressors',
                // furtherAssessmentSlope=> true,
                // furtherAssessmentSlopeComment=> true,

            ],


            "Other" => [
                'otherLabel',
                'diameterNumeric',
                'locationCharacteristics',
            ],


            "White Oak" => [
                'acorns',
                'heightFirstBranch',
                'crownHealth',
                'nearbyTrees',
                'diameterNumeric',
                'oakHealthProblems',
                'standTagging',
            ],


            "American Elm" => [
                'seedsBinary',
                'flowersBinary',
                'nearbyTrees',
                // treated               ,
                'locationCharacteristics',
                'crownHealth',
                'diameterNumeric',
            ],

            "Florida Torreya" => [
                'heightNumeric',
                'diameterNumeric',
                'numberRootSprouts',
                'seedsBinary',
                'conesMaleFemale',
                'deerRub',
                'torreyaFungalBlight',
            ],


            "Pacific Madrone" => [
                'heightNumeric',
                'diameterNumeric',
                'standDiversity',
                'crownAssessment',
                'madroneDisease',
            ],


            "Eastern Larch" => [
                // heightNumeric     ,
                'diameterNumeric',
                'needleColor',
                'needleAmount',
            ],


            "Tanoak" => [
                // heightNumeric ,
                'diameterNumeric',
                'crownClassification',
                'canopyHealth',
                'acorns',
                'treated',
            ],


            "Oregon Ash" => [
                'heightNumeric',
                'diameterNumeric',
                'crownPortion',
                'seedCollected',
                'ashFrequency',
                'oregonAshHealth',
            ],


            "Butternut" => [
                'heightNumeric',
                'breastNumeric',
                'locationCharacteristics',
                'bearingFruit',
                'crownDieback',
                'hybridAttributes',
                'hybridTraits',
            ],


            "Sassafras" => [
                'breastNumeric',
                'canopyHealth',
                'locationCharacteristics',
                'laurelWilt',
            ],


            "Pinyon Pine" => [
                'heightNumeric',
                'breastNumeric',
                'canopyCones',
                'conesOpenClosed',
                'neighborCones',
                'neighborHealth',
            ],

            "Cacao" => [
                'treeHealth',
                'heightNumeric',
                'breastNumeric',
                'flowersBinary',
                'numPods',
                'collectedMaterials',
                'percentShade',
                'shadeSpecies',
                'age',
                'podPhenotype',
                'phenotype',
                'cocoaHabitat',
            ],


            "American Beech" => [
                'breastNumeric',
                'locationCharacteristics',
                'nearbyTrees',
                'flowersBinary',
                'canopyDieback',
                'isReproducing',
                'beechBarkDiseaseSymptoms',
                'beechLeafDiseaseNoSymptoms',
                'beechLeafDiseaseSomeSymptoms',
                'beechLeafDiseaseAdvancedSymptoms',
                'beechHealthProblems',
            ],

            "Ozark Chinquapin" => [
                'diameterNumeric',
                'heightNumeric',
                'catkins',
                'canopyHealth',
                'ozarkBlightSigns',
            ]
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

    /**
     * Returns labels sorted by species
     * @return array|array[]
     */
    public function speciesLabelstoArray(): array
    {
        return $this->species_labels;
    }
}
