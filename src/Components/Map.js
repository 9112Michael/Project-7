/*global google*/
import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"


const MyMapComponent = withScriptjs(withGoogleMap(props => (
  <GoogleMap
    defaultZoom={12} zoom={props.zoom}
    defaultCenter={{ lat:parseFloat(47.530101) , lng: parseFloat(-122.032619) }} 
    center={props.center}
  >
    {props.markers && props.markers
    .filter(marker => marker.isVis)
    .map((marker, index) => {  
        const venueInfo = props.venues.find(venue => venue.id === marker.id); 
     return ( <Marker 
        key={index} 
        position={{ lat: marker.lat, lng: marker.lng }} 
        onClick= {()=> props.handleMarkerClick(marker)}
        animation={Array.length === 1 ? google.maps.Animation.DROP:google.maps.Animation.BOUNCE} 
        >
        {marker.isOpen && venueInfo.bestPhoto && (
        <InfoWindow>
          <React.Fragment>
            <img src={`${venueInfo.bestPhoto.prefix}200x200${venueInfo.bestPhoto.suffix}`} alt="" />
          <p>{venueInfo.name}</p>
          </React.Fragment>
        </InfoWindow>
        )}
     </Marker>
     );
        })}
  </GoogleMap>
))
);

export default class Map extends Component {
  render() {
    return (
      <div>
        <MyMapComponent
          { ...this.props }
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAwPmbzOZACHbtlhBN7URs_7Sj4FdHBEak&libraries=geometry,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh`, width: `75vw` }} />}
          mapElement={<div style={{ height: `100%` }} />}
            />
      </div>
    )
  }
}



