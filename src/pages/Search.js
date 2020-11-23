import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import SearchRecipes from "../components/SearchRecipes";
import SearchBar from "../components/SearchBar";
// import Slider from "../components/Slider"

//category filter search
class Search extends Component {
    state={
    }

    componentDidMount = () => {
        const query = this.props.match.params.query
        const category = this.props.match.params.category
        console.log("esto es query",query)
        console.log("esto es category",category)
        if (query !== undefined) {
            this.setState({searchField:query})
        } else if (category !== undefined){
            this.setState({searchField:category})
        }
    }

    render() {
        console.log("esto es el estado linia 26",this.state.searchField)
        return (
            <div className="container">
                {/* <NavbarMobile /> */}
                <div className="box">
                    <div>
                        <span></span>
                        <h4>search.</h4>
                        <button><Link to="/">Close</Link></button>
                    </div>
                </div>
                <SearchBar/>
                <h1>{this.state.searchField}</h1>
    
                <SearchRecipes searchField={this.state.searchField}/>
                
            </div>
        );
    }
}

export default withAuth(Search);
