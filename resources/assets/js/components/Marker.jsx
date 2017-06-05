import React, { PropTypes as T } from 'react'

export class Marker extends React.Component {

  constructor (props) {
    super(props);
  }

  render() {
    let {
          map, google, position, mapCenter, icon, label, draggable, onClick
        } = this.props;
    if (!google) {
      return null
    }

    let pos = position || mapCenter;
    if (!(pos instanceof google.maps.LatLng)) {
      position = new google.maps.LatLng(pos.lat, pos.lng);
    }

    const pref = {
      map: map,
      position: position,
      icon: icon,
      label: label,
      draggable: draggable,
      animation: google.maps.Animation.DROP,
    };

    this.marker = new google.maps.Marker(pref);
    google.maps.event.addListener(this.marker, 'click', onClick);

    return(
      null
    )
  }
}

Marker.propTypes = {
  position: T.object,
  map: T.object,
  onClick: T.func,
  google: T.object
}

Marker.defaultProps = {
  name: 'Marker'
}

export default Marker