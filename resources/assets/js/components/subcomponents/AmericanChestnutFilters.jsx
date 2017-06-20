import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ButtonList from '../ButtonList'

export default class AmericanChestnutFilters extends Component {
    constructor(props) {
        super(props)

        this.state = {
            burrs       : [],
            catkins        : [],
            chestnutBlight : [],
            crownHealth : [],
            diameterNumericMin: '',
            diameterNumericMax: '',
            heightNumericMin  : '',
            heightNumericMax  : ''
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
                                    onChange={burrs => this._update('burrs', burrs)}/>
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
                        <label className="label">Crown Health</label>
                        <ButtonList
                            list={[
                                '1 - Healthy',
                                '2 - Thinning',
                                '3 - Some dead branches (less than 50%)',
                                '4 - Many dead branches (more than 50%)',
                                '5 - Completely dead',
                                'I\'m not sure'
                            ]}
                            onChange={crownHealth => this._update('crownHealth', crownHealth)}/>
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
                                               value={this.state.diameterNumericMin}
                                               onChange={({target}) => this._update('diameterNumericMin', target.value)}/>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <input type="number"
                                               className="input"
                                               placeholder="Max."
                                               value={this.state.diameterNumericMax}
                                               onChange={({target}) => this._update('diameterNumericMax', target.value)}/>
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
                                               value={this.state.heightNumericMin}
                                               onChange={({target}) => this._update('heightNumericMin', target.value)}/>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control">
                                        <input type="number"
                                               className="input"
                                               placeholder="Max."
                                               value={this.state.heightNumericMax}
                                               onChange={({target}) => this._update('heightNumericMax', target.value)}/>
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