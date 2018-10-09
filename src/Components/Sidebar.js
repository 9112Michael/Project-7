import React, { Component } from 'react'
import VenuesList from './VenuesList';

export default class Sidebar extends Component {
    constructor() {
        super();
        this.state = {
            query: "",
            venues: []
        };
    }
    handleFilterVenues = () => {
        if(this.state.query.trim() !== "") {
            const venues = this.props.venues.filter(venue =>
                venue.name
                .toLowerCase()
                .includes(this.state.query.toLowerCase())
                );
                console.log(venues);
                return venues;
        }
        return this.props.venues;
    };

    handleInputChange = e => {
        this.setState({ query:e.target.value });
        const markers = this.props.venues.map(venue => {
            const isMatch = venue.name.toLowerCase().includes(e.target.value.toLowerCase());
            const marker = this.props.markers.find(marker => marker.id ===venue.id);
            if(isMatch) {
                marker.isVis = true;
            }else {
                marker.isVis = false;
            }
            return marker;
        });
        this.props.updateSuperState({ markers }) 
    };

  render() {
    return (
      <div className="sideBar">
        <header className="header">
            <h1>MyNeighborhood Trail Finder</h1>
        </header>
        <input aria-label="Search Input" tabIndex={0} type={"search"} id={"search"} placeholder={"Filter Trails"} onChange={this.handleInputChange} />
        <VenuesList { ...this.props } venues={this.handleFilterVenues()} handleListItemClick={this.props.handleListItemClick} />
      </div>
    )
  }
}
