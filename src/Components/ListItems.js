import React, { Component } from 'react'

export default class ListItems extends Component {
  render() {
    return (
     <li role="list" tabIndex="0" className="listItems" onClick={() => this.props.handleListItemClick(this.props)}>
        <img 
            src=
            {this.props.categories[0].icon.prefix+"32"+this.props.categories[0].icon.suffix} 
            alt=
            {this.props.categories[0].name} />
        {this.props.name}
     </li>
    )
  }
}
