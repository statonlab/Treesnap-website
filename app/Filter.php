<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Filter extends Model
{
    /**
     * Fillable columns.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'name',
        'rules',
        'notify_user',
        'notifications_sent_at',
    ];

    /**
     * Auto casting of columns.
     *
     * @var array
     */
    protected $casts = [
        'rules' => 'array',
        'notify_user' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'notifications_sent_at' => 'datetime',
    ];


    /**
     * Fields that support units.
     *
     * @var array
     */
    protected static $supportsUnits = [
        'heightFirstBranch',
        'diameterNumeric',
        'heightNumeric',
        'breastNumeric',
        'willowHeightNumeric',
        'hemlockDiameter',
    ];

    /**
     * Maps tree name to its filter
     *
     * @var array
     */
    protected static $filterMapper = [
        'Ash' => 'ash',
        'American Chestnut' => 'americanChestnut',
        'Hemlock' => 'hemlock',
        'White Oak' => 'whiteOak',
        'American Elm' => 'americanElm',
        'Florida Torreya' => 'floridaTorreya',
        'Eastern Larch' => 'easternLarch',
        'Tanoak' => 'tanOak',
        'Pacific Madrone' => 'pacificMadrone',
        'Oregon Ash' => 'oregonAsh',
        'Butternut' => 'butternut',
        'Pinyon Pine' => 'pinyonPine',
        'Ozark Chinquapin' => 'ozarkChinquapin',
        'Alaskan Willow' => 'alaskanWillow',
        'Other' => 'other',
    ];

    /**
     * Filters that can have multiple values.
     *
     * @var string[]
     */
    protected static $multiCheckFilters = [
        'emeraldAshBorer',
        'chestnutBlightSigns',
        'oakHealthyProblems',
        'crownPortion',
        'locationCharacteristics',
        'nearbyTrees',
        'torreyaFungalBlight',
        'madroneDisease',
        'beechBarkDiseaseSymptoms',
        'hybridTraits',
        'laurelWilt',
        'hemlockLocationCharacteristics',
        'ashLocationCharacteristics',
        'nearbyWillowSpecies'
    ];

    /**
     * Get the owner of the filter.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    /**
     * Get filters that users requested to be notified of new observations.
     *
     * @param \Doctrine\DBAL\Query\QueryBuilder $query
     *
     * @return mixed
     */
    public function scopeNotifiable($query)
    {
        return $query->where('notify_user', true);
    }

    /**
     * Apply a certain filter.
     *
     * @param Filter::rules
     * @param \Doctrine\DBAL\Query\QueryBuilder $observations
     * @return \App\Observation collection of observations.
     */
    public static function apply($filters, $observations = null)
    {
        $filters = json_decode($filters, true);

        if ($observations === null) {
            $observations = Observation::with('user');
        }

        // Apply address
        if (isset($filters['address'])) {
            $nulls = 0;
            foreach ($filters['address'] as $value) {
                if (empty($value)) {
                    $nulls++;
                    continue;
                }

                $observations->where('address->components', 'like', "%$value%");
            }
            if ($nulls < 3) {
                $observations->whereNotNull('address');
            }
        }

        if (isset($filters['group']) && !empty($filters['group'])) {
            $group = Group::with([
                'users' => function ($query) {
                    $query->select('users.id');
                },
            ])->find($filters['group']);

            if ($group && auth()->check()) {
                /** @var \App\User $user */
                $user = auth()->user();
                if ($user->can('view', $group)) {
                    $observations->whereHas('user', function ($query) use ($group) {
                        $ids = $group->users->map(function ($user) {
                            return $user->id;
                        });
                        $query->whereIn('users.id', $ids);
                    });
                }
            }
        }

        if (isset($filters['date_range'])) {
            $filters['date_range'] = (array)$filters['date_range'];
            if (!empty($filters['date_range']['start']) || !empty($filters['date_range']['end'])) {
                $observations->where(function ($query) use ($filters) {
                    /** @var \Illuminate\Database\Query\Builder $query */
                    if (!empty($filters['date_range']['start'])) {
                        $query->whereDate('observations.created_at', '>=',
                            $filters['date_range']['start']);
                    }

                    if (!empty($filters['date_range']['end'])) {
                        $query->whereDate('observations.created_at', '<=',
                            $filters['date_range']['end']);
                    }
                });
            }
        }

        if (!isset($filters['categories'])) {
            return $observations;
        }

        $observations->where(function ($DB) use ($filters) {
            // Apply per category filters.
            foreach ($filters['categories'] as $key => $category) {
                $where = function ($query) use ($category, $filters) {
                    $query->where('observation_category', $category);
                    if (!isset(static::$filterMapper[$category]) || !isset($filters[static::$filterMapper[$category]])) {
                        return;
                    }

                    foreach ($filters[static::$filterMapper[$category]] as $filter => $value) {
                        if (empty($value)) {
                            continue;
                        }
                        if (is_array($value)) {

                            // if the filter allows multiple options to be checked, we must check in a somewhat less efficient manner
                            if (in_array($filter, static::$multiCheckFilters)) {
                                foreach ($value as $index => $one) {
                                    if (empty($one)) {
                                        continue;
                                    }

                                    if ($index === 0) {
                                        $query->where("data->$filter", 'LIKE', '%' . $one . '%');
                                    } else {
                                        $query->orWhere("data->$filter", 'LIKE', '%' . $one . '%');
                                    }
                                }
                            } else { // single-option filters are searched here
                                $query->where(function ($q) use ($filter, $value) {
                                    foreach ($value as $index => $one) {

                                        if (empty($one)) {
                                            continue;
                                        }

                                        // For the first filter, apply only a WHERE statement instead of an OR WHERE
                                        if ($index === 0) {
                                            $q->where("data->$filter", $one);
                                        } else {
                                            $q->orWhere("data->$filter", $one);
                                        }
                                    }
                                });
                            }
                        } else {
                            // Check if this is a max/min situation
                            $sub = substr($filter, -3);
                            if ($sub === 'Min' || $sub === 'Max') {
                                $column = "data->$filter";
                                $operator = $sub === 'Min' ? '>=' : '<=';
                                $filterName = substr($filter, 0, strlen($filter) - 3);
                                if (in_array($filterName, static::$supportsUnits)) {
                                    $units = 'US';
                                    $user = auth()->user();
                                    if ($user) {
                                        $units = $user->units;
                                    }
                                    $column = "data->{$filterName}_values->{$units}_value";
                                }
                                $query->where($column, $operator, intval($value));
                            } else {
                                // It's not max/min filter, so let's check for exact value
                                $query->where("data->$filter", $value);
                            }
                        }
                    }
                };

                // For the first filter, apply only a WHERE statement instead of an OR WHERE
                if ($key === 0) {
                    $DB->where($where);
                } else {
                    $DB->orWhere($where);
                }
            }
        });

        return $observations;
    }
}
