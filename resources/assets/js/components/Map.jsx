
import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import GoogleMap from 'google-map-react'

import FaLeaf from 'react-icons/lib/fa/leaf';
import FaTree from 'react-icons/lib/fa/tree';


axios.defaults.headers.common['X-CSRF-TOKEN'] = window.Laravel.csrfToken

const AnyReactComponent = ({ icon }) => <FaTree style = {greatPlaceStyle}/>

//need to set anchor location somehow

const defaultProps = {
  center: {lat: 38.0377, lng: -84.4833},
  zoom: 11
}

const defaultMarkers = [
  {name: "the singing tree",
    latitude: 38.0377,
    longitude: -84.4833,
    id: 1},
  {name: "the golden water",
    latitude: 38.0477,
    longitude: -84.4933,
    id: 2
  }
]


export default class Map extends Component {

  constructor(props) {
    super(props);

    this.state = {
      markersLoad : defaultMarkers
    };
  }


  // componentDidMount(){
  //
  //   axios.get('/observations').then( (response) => {
  //     markersLoad = response.data;
  //     this.setState({markersLoad: markersLoad});
  //   });
  //   console.log(this.state.markersLoad);
  // }



  render() {
    return (
      <div id="map">
        <GoogleMap
          bootstrapURLKeys={{key: "AIzaSyA2mdlJN43gdiwARBpxMWeIZFaaHmW-mew"}}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          {this.state.markersLoad.map((point) =>
            <AnyReactComponent
              lat= {point.latitude}
              lng = {point.longitude}
              key = {point.id}
            />

          )}
        </GoogleMap>
      </div>
    )
  }
}


const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  textAlign: 'center',
  color: '#2A9D8F',
  height: 20,
  width: 20
};


