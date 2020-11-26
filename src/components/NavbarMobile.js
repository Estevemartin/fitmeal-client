import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

class NavbarMobile extends Component {

  render() {
    const displayAvatar = user => {
      if(user.profilePictureUrl){
          return <span className="profile-picture"><img src={user.profilePictureUrl} alt="profile"/></span>
      } else {
          return <span className="profile-picture avatar-green1"></span>
      }
    }

    const { user } = this.props;
    return (
      <nav className='navbar-mobile'>
        <Link to="/" className="navbar-icons-mobile">
        <ion-icon name="restaurant-outline"></ion-icon>
            <p className='icons-text'>Meals</p>
        </Link>
        <div className="navbar-icons-mobile">
            <ion-icon name="reader-outline"></ion-icon>
            <p className='icons-text'>Plans</p>
        </div>
        <Link to="/AddNewRecipe" className="navbar-icons-mobile">
            <ion-icon name="add-circle-outline"></ion-icon>
            <p className='icons-text'>Add</p>
        </Link>
        <Link to="/profile" className="user-mobile">
            <div className='navbar-icons-mobile'>
              {displayAvatar(user)}
              <p className='icons-text'>Me</p>
            </div>
        </Link>
      </nav>
    );
  }
}

export default withAuth(NavbarMobile);
