import React, { Component } from 'react'
import ListItems from './ListItems';

export default class VenuesList extends Component {
  render() {
    return (
      <ol className="venuesList">
        {this.props.venues &&
         this.props.venues.map((venue, index) => (
             <ListItems key={index} {...venue} handleListItemClick={this.props.handleListItemClick} />
         ))}
      </ol>
    )
  }
}
