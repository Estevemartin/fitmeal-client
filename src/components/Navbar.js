import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

class Navbar extends Component {

  render() {
    const displayAvatar = user => {
      if(user.profilePictureUrl){
          return <span className="profile-picture"><img src={user.profilePictureUrl} alt="profile"/></span>
      } else {
          return <span className="profile-picture avatar-color"></span>
      }
    }

    const { user, logout, isLoggedin } = this.props;
    return (
      <nav className='navbar'>
        <Link to={"/"} id='home-btn'>
          <span><img src="./favicon.ico" alt="Logo"/></span>
          <h4>fitmeal.</h4>
        </Link>
        {isLoggedin ? (
          <div className='profile-navbar'>
            {displayAvatar(user)}
            <p className='navbar-user'>hey, {user.username}</p>
            <ion-icon className='logout-icon' name="log-out-outline" onClick={logout}></ion-icon>   
          </div>
        ) : (
          <div className='auth-section'>
            <Link to='/login'>
              <button className='navbar-button login-btn'>Login</button>
            </Link>
            {/* <Link to='/signup'>
              <button className='navbar-button signup-btn'>Sign Up</button>
            </Link> */}
          </div>
        )}
      </nav>
    );
  }
}

export default withAuth(Navbar);
