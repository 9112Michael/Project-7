import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap(props => (
  < GoogleMap
    defaultZoom={8} zoom={props.zoom}
    defaultCenter={{ lat:47.503881 , lng: -121.703362  }} center={props.center}
  >
    {props.markers && props.markers
    .filter(marker => marker.isVis)
    .map((marker, index) => ( 

     <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
    ))}
  </GoogleMap>
))
);

export default class Map extends Component {
  render() {
    return (
      <div>
        <MyMapComponent
          { ...this.props }
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAwPmbzOZACHbtlhBN7URs_7Sj4FdHBEak&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
            />
      </div>
    )
  }
}



