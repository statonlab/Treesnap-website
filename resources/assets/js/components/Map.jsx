import React, {Component, PropTypes} from 'react'
import GoogleMap, {GoogleApiWrapper} from 'google-maps-react'
import Marker from './Marker'


const AnyReactComponent = ({ icon }) => <i className="fa fa-leaf"></i>

// need to set anchor location somehow
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



export  class Map extends Component {

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
          google={this.props.google}
          zoom={defaultProps.zoom}
          center={defaultProps.center}
        >

          {this.state.markersLoad.map((point) =>
            <Marker
              name={point.id}
              position={{lat: point.latitude, lng: point.longitude}}
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



export default GoogleApiWrapper({
  apiKey: "AIzaSyA2mdlJN43gdiwARBpxMWeIZFaaHmW-mew"
})(Map)