import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import SearchRecipes from "../components/SearchRecipes";
import SearchBar from "../components/SearchBar";

class Search extends Component {
    state={
    }

    componentDidMount = () => {
        const query = this.props.match.params.query
        const category = this.props.match.params.category
        if (query !== undefined) {
            this.setState({searchField:query})
        } else if (category !== undefined){
            this.setState({searchField:category})
        }
    }

    render() {
        return (
            <div className="container">
                <div className="box">
                    <div>
                        <span></span>
                        <h4>search.</h4>
                        <button><Link to="/">Close</Link></button>
                    </div>
                </div>
                <h2>Search</h2>
                <SearchBar/>
                <p style={{marginLeft:"20px", color: "var(--grey3)", fontSize: "14px",marginTop:"10px", marginBottom:"20px"}}>Results for: <i>"{this.state.searchField}"</i></p>
                <SearchRecipes searchField={this.state.searchField}/>
            </div>
        );
    }
}

export default withAuth(Search);
