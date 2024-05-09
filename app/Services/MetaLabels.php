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

            'acorns' => 'Acorns',
            'age' => 'Age',
            'ashFrequency' => 'Ash Frequency',
            'ashSpecies' => 'Species',
            'ashSpeciesV2' => 'Species',
            'bearingFruit' => 'Bearing Fruit',
            'beechBarkDiseaseSymptoms' => 'Bark Disease',
            'beechHealthProblems' => 'Health Problems',
            'beechLeafDiseaseAdvancedSymptoms' => 'Leaf Disease (Advanced Symptoms)',
            'beechLeafDiseaseNoSymptoms' => 'Leaf Disease (No Symptoms)',
            'beechLeafDiseaseSomeSymptoms' => 'Leaf Disease (Mild Symptoms)',
            'breastNumeric' => 'Tree Diameter',
            'budsDevelopment' => 'Buds Development',
            'burrs' => 'Nuts/burrs',
            'canopyClosure' => 'Canopy Closure',
            'canopyClosureComment' => 'Canopy Closure Description',
            'canopyCones' => 'Canopy Cones',
            'canopyDieback' => 'Canopy Dieback',
            'canopyHealth' => 'Canopy Health Assessment',
            'canopyPosition' => 'Canopy Position',
            'canopyPositionComment' => 'Canopy Position Description',
            'catkins' => 'Catkins',
            'chestnutBlightSigns' => 'Chestnut Blight',
            'cocoaHabitat' => 'Habitat',
            'collectedMaterials' => 'Materials Collected',
            'ashCollectionPurpose' => 'Collection Purpose',
            'collectionPurpose' => 'Collection Purpose',
            'colorOfFlaking' => 'Color of Flaking',
            'comment' => 'Comment',
            'cones' => 'Cones',
            'conesMaleFemale' => 'Cones',
            'conesOpenClosed' => 'Tree Cones',
            'crownAssessment' => 'Tree Crown Assessment',
            'crownClassification' => 'Crown Classification',
            'crownDieback' => 'Crown Dieback',
            'crownHealth' => 'Crown Health',
            'crownHealthV2' => 'Crown Health',
            'ashCrownHealth' => 'Crown Health',
            'crownPortion' => 'Collected Seed Location',
            'crownPosition' => 'Crown Position',
            'crownPositionComment' => 'Crown Position Comment',
            'decomposing' => 'Decomposing',
            'deerRub' => 'Deer Rub',
            'diameterNumeric_confidence' => 'Diameter Confidence',
            'diameterNumeric' => 'Tree Diameter',
            'ashDiameterNumeric' => 'Tree Diameter',
            'elongateHemlockScaleCoverage' => 'Elongate Hemlock Scale (EHS)',
            'emeraldAshBorer' => 'Ash Borer',
            'estimatedDBH' => 'Estimated DBH',
            'flaking' => 'Flaking',
            'flowersBinary' => 'Flowers',
            'ashFlowersBinary' => 'Flowers',
            'furtherAssessment' => 'Training',
            'furtherAssessmentCanopyHealth' => 'Nearby Canopy Health',
            'furtherAssessmentCanopyHealthComment' => 'Describe Nearby Canopy Health',
            'furtherAssessmentCategory' => 'Nearby Tree Health',
            'furtherAssessmentEHS' => 'Nearby EHS',
            'furtherAssessmentHWA' => 'Nearby HWA',
            'furtherAssessmentManagement' => 'Area Actively Managed',
            'furtherAssessmentManagementComment' => 'Describe Active Management',
            'furtherAssessmentStressors' => 'Further Stressors',
            'heightFirstBranch_confidence' => 'Height of First Branch Confidence',
            'heightFirstBranch' => 'Height of First Branch',
            'heightNumeric_confidence' => 'Tree Height Confidence',
            'heightNumeric' => 'Tree Height',
            'hemlockAreaComments' => 'Describe Area',
            'hemlockCanopyHealth' => 'Canopy Health',
            'hemlockCanopyHealthComment' => 'Canopy Health Description',
            'hemlockCones' => 'Cones',
            'hemlockCrownClassification' => 'Hemlock Crown Classification',
            'hemlockCrownHealth' => 'Hemlock Crown Health',
            'hemlockCrownHealthComment' => 'Hemlock Crown Healthy Comment',
            'hemlockDiameter' => 'Tree Diameter',
            'hemlockLocationCharacteristics' => 'Habitat',
            'hemlockSpecies' => 'Species',
            'hemlockStandQuantity' => 'Number of Lingering Trees',
            'hemlockTraining' => 'Hemlock Training',
            'hemlockTreated' => 'Treated',
            'hybridAttributes' => 'Hybrid Attributes',
            'hybridTraits' => 'Hybrid Traits',
            'isReproducing' => 'Reproducing',
            'laurelWilt' => 'Laurel Wilt',
            'lingeringHemlock' => 'Observation Subject',
            'lingeringTreeNum' => 'Lingering Tree #',
            'lingeringWoollyAdesCoverage' => 'Hemlock Woolly Adelgid (HWA)',
            'location'=>'Location',
            'locationCharacteristics' => 'Habitat',
            'ashLocationCharacteristics' => 'Habitat',
            'locationComment' => '',
            'locationDescription' => 'Habitat Description',
            'lowestLivingBranch' => 'Lowest Living Branch',
            'madroneDisease' => 'Disease',
            'mamaLocationCharacteristics' => 'Habitat',
            'moreThanTenHemlocks' => 'Comment on Quantity',
            'naturallyOccuring' => 'Naturally Occuring',
            'naturallyOccuringV2' => 'Naturally Occuring',
            'nearByHemlock' => 'Nearby Hemlocks',
            'nearbyTrees' => 'Nearby Trees',
            'ashNearbyTrees' => 'Trees Nearby',
            'needleAmount' => 'Amount of Needles',
            'needleColor' => 'Needles Color',
            'neighborCones' => 'Neighbor Cones',
            'neighborHealth' => 'Neighbor Health',
            'numberInspected' => 'Number of Trees Inspected',
            'numberRootSprouts_confidence' => 'Number of Root Sprouts Confidence',
            'numberRootSprouts' => 'Number of Root Sprouts',
            'numPods' => 'Number of Pods',
            'oakHealthProblems' => 'Health Problems',
            'oregonAshHealth' => 'Oregon Ash Health',
            'otherLabel' => 'Tree Type',
            'otherStressors' => 'Other Stressors',
            'otherStressorsComment' => 'Description of Stressors',
            'ownerNotified' => 'Owner Notified',
            'partOfStudy' => 'Study',
            'percentShade' => 'Percent Shade',
            'phenotype' => 'New Phenotype',
            'photoOfBark' => 'Bark Photo',
            'photoOfBranching' => 'Branching Photo',
            'photoOfLeaves' => 'Leaves Photo',
            'plantedWild' => 'Planted vs. Wild',
            'podPhenotype' => 'Pod Phenotype',
            'propertyOwner' => 'Property Owner',
            'propertyOwnerEmail' => 'Property Owner Email',
            'propertyOwnerName' => 'Property Owner Name',
            'propertyOwnerPhone' => 'Propety Owner Phone',
            'reasonForNoHemlocks' => 'No Hemlocks Because',
            'recentGrowth' => 'Recent Growth',
            'seedCollected' => 'Seed collected',
            'ashSeedCollected' => 'Seed collected',
            'seedsBinary' => 'Seeds',
            'ashSeedsBinary' => 'Seeds',            
            'seedsCollected' => 'Seeds Collected',
            'shadeSpecies' => 'Shade Species',
            'signsOfEAB' => 'Definite Signs of EAB',
            'signsOfEABV2' => 'Nearby Trees Signs of EAB',
            'standDiversity' => 'Stand Diversity',
            'standTagging' => 'Stand Tagging',
            'timeSpentSearching' => 'Time Spent',
            'torreyaFungalBlight' => 'Fungal Blight',
            'treated' => 'Treated',
            'ashTreated' => 'Treated',
            'treatedComment' => 'Treatment Description',
            'treatedV2' => 'Treated',
            'treeHealth' => 'Tree Health',
            'treeHealthCategory' => 'Tree Health Category',
            'treeMarked' => 'Tree Markings',
            'treeNum' => 'Tree #',
            'woollyAdesCoverage' => 'Woolly Adelgids'
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
