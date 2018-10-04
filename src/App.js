import React, { Component } from 'react';
import FourSquareAPI from "./API/"
import './App.css';
import Map from './Components/Map';

class App extends Component {
  constructor(){
    super();
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 11
    };
  }
  closeMarkersAll = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({ markers: Object.assign(this.state.markers, markers) });

  };
  handleMarkerClick = (marker) => {
    this.closeMarkersAll();
    marker.isOpen=true;
    this.setState({ markers: Object.assign(this.state.markers, marker) });
    const  venue = this.state.venues.find(venue => venue.id === marker.id);

    FourSquareAPI.getDetailVenues(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({ venues: Object.assign(this.state.venues, newVenue) });
      console.log(newVenue)});
  }; 
  componentDidMount(){
    FourSquareAPI.search({
      near: "Seattle, WA",
      query: "park",
      limit: 12
    }).then(results => {
      const { venues } = results.response;
      const { center } = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVis: true,
            id: venue.id
        };
      });
      this.setState({ venues, markers, center });
      console.log(results);
  });
}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to My Neighborhood Map (React):UDACITY FEND Project #7</h1>
        </header>
       <Map { ...this.state } handleMarkerClick={ this.handleMarkerClick }/>
      
      </div>
    );
  }
}

export default App;
