import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

class Navbar extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;
    return (
      <nav className='navbar'>
        <Link to={"/"} id='home-btn'>
          <span><img src="./favicon.ico" alt="Logo"/></span>
          <h4>fitmeal.</h4>
        </Link>
        {isLoggedin ? (
          <>
            <span><img src={user.profilePictureUrl} alt="Profile"/></span>
            <p className='navbar-user'>{user.username}</p>

            <button className='navbar-button' onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <div className='auth-section'>
            <Link to='/login'>
              <button className='navbar-button login-btn'>Login</button>
            </Link>
            <br />
            <Link to='/signup'>
              <button className='navbar-button signup-btn'>Sign Up</button>
            </Link>
          </div>
        )}
      </nav>
    );
  }
}

export default withAuth(Navbar);
