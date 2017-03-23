import React, {Component, PropTypes} from 'react'
import {GoogleApiWrapper} from 'GoogleMapsReactComponent'

export class Container extends React.Component {
  render(){
if (!this.props.loaded){
  return <div> Loading....</div>
}
return (
  <div> Map goes here</div>
)
}

export default GoogleApiWrapper({
  apiKey: __GAPI_KEY__
})(Container)
