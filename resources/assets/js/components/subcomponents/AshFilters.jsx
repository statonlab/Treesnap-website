import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ButtonList from '../ButtonList'

export default class AshFilters extends Component {
    constructor(props) {
        super(props)

        this.state = {
            species        : [],
            habitat        : [],
            seedsPresent   : [],
            flowersPresent : [],
            ashBorer       : [],
            treesNearby    : [],
            crownHealthMin : '',
            crownHealthMax : '',
            treeDiameterMin: '',
            treeDiameterMax: ''
        }
    }

    _update(key, value) {
        this.setState({[key]: value})

        this.props.onChange(Object.assign({}, this.state, {[key]: value}))
    }

    render() {
        return (
            <div className="columns is-multiline">
                <div className="column is-6">
                    <div className="field">
                        <label className="label">Ash Species</label>
                        <ButtonList list={['White Ash', 'Green Ash', 'Blue Ash', 'Black Ash', 'Uncertain']}
                                    onChange={species => this._update('species', species)}/>
                    </div>
                </div>

                <div className="column is-6">
                    <div className="field">
                        <label className="label">Habitat</label>
                        <ButtonList list={['Forest', 'Wetland', 'Field', 'Roadside, urban, suburban, or park']}
                                    onChange={habitat => this._update('habitat', habitat)}/>
                    </div>
                </div>

                <div className="column is-6">
                    <div className="field">
                        <label className="label">Seeds Present</label>
                        <ButtonList
                            list={[
                                'Yes',
                                'No'
                            ]}
                            onChange={seedsPresent => this._update('seedsPresent', seedsPresent)}/>
                    </div>
                </div>

                <div className="column is-6">
                    <div className="field">
                        <label className="label">Flowers Present</label>
                        <ButtonList
                            list={[
                                'Yes',
                                'No'
                            ]}
                            onChange={flowersPresent => this._update('flowersPresent', flowersPresent)}/>
                    </div>
                </div>

                <div className="column is-6">
                    <div className="field">
                        <label className="label">Ash Borer</label>
                        <ButtonList
                            list={[
                                'D-shaped adult exit holes',
                                'Bark coming off with tunneling underneath',
                                'Emerald ash borer beetles/larvae',
                                'Stump sprouting'
                            ]}
                            onChange={ashBorer => this._update('ashBorer', ashBorer)}/>
                    </div>
                </div>

                <div className="column is-6">
                    <div className="field">
                        <label className="label">Trees Nearby</label>
                        <ButtonList
                            list={[
                                'Dead and/or dying',
                                'Healthy and large',
                                'Healthy and small',
                                'No trees of this species nearby',
                                'Not sure'
                            ]}
                            onChange={treesNearby => this._update('treesNearby', treesNearby)}/>
                    </div>
                </div>

                <div className="column is-6">
                    <div className="field">
                        <label className="label">Crown Health (percentage)</label>
                        <div className="field is-horizontal">
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <input type="number"
                                               className="input"
                                               placeholder="Min."
                                               value={this.state.crownHealthMin}
                                               onChange={({target}) => this._update('crownHealthMin', target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <input type="number"
                                               className="input"
                                               placeholder="Max."
                                               value={this.state.crownHealthMax}
                                               onChange={({target}) => this._update('crownHealthMax', target.value)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="column is-6">
                    <div className="field">
                        <label className="label">Tree Diameter (inches)</label>
                        <div className="field is-horizontal">
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <input type="number"
                                               className="input"
                                               placeholder="Min."
                                               value={this.state.treeDiameterMin}
                                               onChange={({target}) => this._update('treeDiameterMin', target.value)}/>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <input type="number"
                                               className="input"
                                               placeholder="Max."
                                               value={this.state.treeDiameterMax}
                                               onChange={({target}) => this._update('treeDiameterMax', target.value)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AshFilters.PropTypes = {
    onChange: PropTypes.func.isRequired
}