
import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import GoogleMap from 'google-map-react'

axios.defaults.headers.common['X-CSRF-TOKEN'] = window.Laravel.csrfToken



const AnyReactComponent = ({ text }) => <div style = {greatPlaceStyle}>{text}</div>

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
  width: 10,
  height: 10,
  border: '2px solid #f44336',
  borderRadius: 10,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4
};

