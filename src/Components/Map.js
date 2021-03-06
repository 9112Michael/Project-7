/*global google*/
import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import  ErrorBoundary from "./ErrorBoundary";

const MyMapComponent = withScriptjs(withGoogleMap(props => (
  <GoogleMap
    defaultZoom={12} zoom={props.zoom}
    defaultCenter={{ lat:parseFloat(47.530101) , lng: parseFloat(-122.032619) }} 
    center={props.center}
  >
    {props.markers && props.markers
    .filter(marker => marker.isVis === true)
    .map((marker, index) => {  
        const venueInfo = props.venues.find(venue => venue.id === marker.id); 
     return ( <Marker 
        key={index} 
        position={{ lat: marker.lat, lng: marker.lng }} 
        onClick= {()=> props.handleMarkerClick(marker)}
        animation={(marker.isOpen ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP)}
        >
        {marker.isOpen && venueInfo.bestPhoto && (
        <InfoWindow
          onCloseClick={()=> props.handleMarkerClick}
        >
          <React.Fragment>
            <img src={`${venueInfo.bestPhoto.prefix}200x200${venueInfo.bestPhoto.suffix}`} alt={`${venueInfo.name}`} />
          <p>{venueInfo.name}</p>
          <p>Photo by <strong>FourSquare</strong></p>
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
        <ErrorBoundary {...this.props}>
        <MyMapComponent
          { ...this.props }
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAwPmbzOZACHbtlhBN7URs_7Sj4FdHBEak&libraries=geometry,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh`, width: `75vw` }} />}
          mapElement={<div style={{ height: `100%` }} />}
            />
            </ErrorBoundary>
      </div>
    )
  }
}



