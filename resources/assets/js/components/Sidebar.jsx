import React, {Component, PropTypes} from 'react'
import SidebarItem from './SidebarItem'

export default class Sidebar extends Component {
    constructor(props) {
        super(props)

        this.plantNames = [
            {
                name: 'American Chestnut'
            },
            {
                name: 'Green Ash'
            },
            {
                name: 'Hemlock'
            },
            {
                name: 'White Oak'
            }
        ]

        this.plants = [
            {
                image: '/images/am.jpg',
                name: 'American Chestnut',
                description: 'Descriptive information about this submission'
            },
            {
                image: '/images/ash.jpg',
                name: 'Hemlock',
                description: 'Descriptive information about this submission'
            },
            {
                image: '/images/hem.jpg',
                name: 'Green Ash',
                description: 'Descriptive information about this submission'
            },
            {
                image: '/images/oak.jpg',
                name: 'White Oak',
                description: 'Descriptive information about this submission'
            },
            {
                image: '/images/am.jpg',
                name: 'American Chestnut',
                description: 'Descriptive information about this submission'
            },
            {
                image: '/images/hem.jpg',
                name: 'Green Ash',
                description: 'Descriptive information about this submission'
            },
            {
                image: '/images/ash.jpg',
                name: 'Hemlock',
                description: 'Descriptive information about this submission'
            },
            {
                image: '/images/oak.jpg',
                name: 'White Oak',
                description: 'Descriptive information about this submission'
            }
        ]
    }

    render() {
        return (
            <div className="sidebar" style={{maxHeight: '100%', overflow: 'auto'}}>
                <p className="mb-0 text-underline">
                    <strong>Filter by Plant</strong>
                </p>
                {this.plantNames.map((plant, index) => {
                    return <SidebarItem name={plant.name} key={index}/>
                })}

                <p className="mb-0 text-underline" style={{marginTop: '1em'}}>
                    <strong>Submissions</strong>
                </p>
                {this.plants.map((plant, index) => {
                    return (
                        <a className="box"
                           style={{padding: 10, marginBottom: '.5em'}}
                           onClick={() => {panToMap()}}
                           key={index}>
                            <div className="media">
                                <div className="media-left">
                                    <img src={plant.image} alt={plant.name} style={{width: 50}}/>
                                </div>
                                <div className="media-content">
                                    <strong>{plant.name}</strong>
                                    <p style={{color: '#666', fontWeight: '500', fontSize: '14px'}}>
                                        {plant.description}
                                    </p>
                                </div>
                            </div>
                        </a>
                    )
                })}
            </div>
        )
    }
}

Sidebar.PropTypes = {
    name: PropTypes.string.isRequired
}