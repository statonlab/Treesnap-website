import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ButtonList from '../ButtonList'

export default class AmericanChestnutFilters extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nutsBurs       : [],
            catkins        : [],
            chestnutBlight : [],
            crownHealthMin : '',
            crownHealthMax : '',
            treeDiameterMin: '',
            treeDiameterMax: '',
            treeHeightMin  : '',
            treeHeightMax  : ''
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
                        <label className="label">Nuts/Burrs</label>
                        <ButtonList list={['None', 'Few', 'Many', 'Unknown']}
                                    onChange={nutsBurs => this._update('nutsBurs', nutsBurs)}/>
                    </div>
                </div>

                <div className="column is-6">
                    <div className="field">
                        <label className="label">Catkins</label>
                        <ButtonList list={['Present', 'Absent', 'Unknown']}
                                    onChange={catkins => this._update('catkins', catkins)}/>
                    </div>
                </div>

                <div className="column is-6">
                    <div className="field">
                        <label className="label">Chestnut Blight</label>
                        <ButtonList
                            list={[
                                'Cankers and cracked bark',
                                'Tan to orange-colored patches or pustules on bark',
                                'Evidence of old dead trunk',
                                'Stump sprouting'
                            ]}
                            onChange={chestnutBlight => this._update('chestnutBlight', chestnutBlight)}/>
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

                <div className="column is-6">
                    <div className="field">
                        <label className="label">Tree Height (feet)</label>
                        <div className="field is-horizontal">
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <input type="number"
                                               className="input"
                                               placeholder="Min."
                                               value={this.state.treeHeightMin}
                                               onChange={({target}) => this._update('treeHeightMin', target.value)}/>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <input type="number"
                                               className="input"
                                               placeholder="Max."
                                               value={this.state.treeHeightMax}
                                               onChange={({target}) => this._update('treeHeightMax', target.value)}/>
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

AmericanChestnutFilters.PropTypes = {
    onChange: PropTypes.func.isRequired
}