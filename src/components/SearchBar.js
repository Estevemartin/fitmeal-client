// src/components/Search.js
import React, { Component } from 'react';

class Search extends Component {
  state = {
    search: ""
  }

  handleSearchBar = e => {
    const { name, value } = e.target;
    this.setState({[name]: value})
  }

  render() {
    return (
      <section className="search-bar">
        <form action={"/search/"+this.state.search} method="get">
          <div className="searchbar">
            <input type="text" className="input-search-bar" name="search" placeholder="try something new"  value={this.state.search} onChange={this.handleSearchBar} />
            <ion-icon name="search-outline"></ion-icon>
          </div>
        </form>
      </section>
    )
  }
}

export default Search;