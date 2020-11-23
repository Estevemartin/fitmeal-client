// src/components/Search.js
import React, { Component } from 'react';

class Search extends Component {
  state = {
    search: ""
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({[name]: value})
  }

  render() {
    return (
      <div className="searchbar">
        <input type="text" className="input-search-bar" name="search" placeholder="Search a recipe"  value={this.state.search} onChange={this.handleChange} />
        <ion-icon name="search-outline"></ion-icon>
      </div>
    )
  }
}

export default Search;