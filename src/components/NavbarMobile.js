import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

class NavbarMobile extends Component {

  render() {
    const displayAvatar = user => {
      if(user.profilePictureUrl){
          return <Link to="/profile"><span className="profile-picture-mobile"><img src={user.profilePictureUrl} alt="profile"/></span></Link>
      } else {
          return <span className="profile-picture-mobile avatar-color"></span>
      }
    }

    const { user } = this.props;
    return (

      <nav className='navbar-mobile'>
         {/* <ion-icon className='logout-icon' name="log-out-outline" onClick={logout}></ion-icon>    */}
                <div className="navbar-icons-mobile">
                    {/* <img src="/img/recipe-icon.png" alt="recipe-icon"/> */}
                    <ion-icon name="nutrition-outline"></ion-icon>
                    <p className='icons-text'>Recipes</p>
                </div>


                <div className="navbar-icons-mobile">
                    <ion-icon name="reader-outline"></ion-icon>
                    <p className='icons-text'>Plans</p>
                </div>


                <div className="navbar-icons-mobile">
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <p className='icons-text'>Add</p>  
                </div>


                <div className="navbar-icons-mobile">
                    <ion-icon name="notifications-outline"></ion-icon>
                    <p className='icons-text'>Alerts</p>  
                </div>


                <div className="user-mobile">
                        {/* {isLoggedin ? ( */}
                        <div className='navbar-icons-mobile'>
                            {/* <Link to={`/profile/${user._id}`}>{displayAvatar(user)} */}
                            {displayAvatar(user)}
                            <Link to="/profile"><p className='icons-text'>Me</p></Link>
                        </div>
                         {/* ) : ( */}
                            {/* <div className='navbar-icons-mobile'>
                            <span className="profile-picture-mobile avatar-color"></span>
                            <p className='icons-text'>Me</p>
                         </div> */}
                        {/* )} */}
                </div>
      </nav>
    );
  }
}

export default withAuth(NavbarMobile);
