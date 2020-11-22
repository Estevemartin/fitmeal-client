import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import NavbarMobile from "../components/NavbarMobile";

class Home extends Component {
  render() {
    return (
      <div className="container">
        <NavbarMobile />
        <div className="box-noIcon">
          <div>
            <h4>recipes.</h4>
            {/* <button>Close</button> */}
          </div>
          <h2>Discover</h2>
          <div className="discover-img" style={{backgroundImage: "linear-gradient(0deg, rgba(95, 163, 151, 0.7) 0%, rgba(0, 0, 0, 0) 50%), url('/img/mockup.png')"}}>
                  <div className="discover-title"></div>
                  <div className="info-icons-recipe">
                  </div>
          </div>
          <h2>Categories</h2>
          <h2>Popular recipes</h2>
          <div className="cards-recipes">
            
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Home);
