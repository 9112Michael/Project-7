import React, { Component } from 'react';
import FourSquareAPI from "./API/"
import './App.css';
import Map from './Components/Map';
import Sidebar from './Components/Sidebar';

class App extends Component {
  constructor(){
    super();
    this.state = {
      venues: [],
      markers: [],
      center: {
        lat: 47.530101,
        lng: -122.032619
      },
      zoom: 12,
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }
  closeMarkersAll =() => {
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
  handleListItemClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handleMarkerClick(marker);
    console.log(venue);
  };
  componentWillMount() {
    document.title = "MyNeighborhood Map: Udacity FEND Project #7"
  };
  componentDidMount(){
    FourSquareAPI.search({
      near: "Issaquah, WA",
      intent: "browse",
      query: "trail",
      limit: 10
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
        <Sidebar { ...this.state } handleListItemClick={this.handleListItemClick} />
       <Map { ...this.state } handleMarkerClick={ this.handleMarkerClick } />
      
      </div>
    );
  }
}

export default App;
