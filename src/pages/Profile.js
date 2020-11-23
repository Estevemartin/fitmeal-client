import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import ProfileEditCard from "../components/ProfileEditCard"

class Profile extends Component {
    
    render() {
        const displayProfilePicture = profilePictureUrl => {
            if(profilePictureUrl){
                return <span className="profile-img"><img src={profilePictureUrl} alt="profileImg"/></span>
            } else {
                return <span className="profile-picture-mobile avatar-color"></span>
            }
          }

          const displayBackgroundPicture = backgroundPictureUrl => {
            if(backgroundPictureUrl){
                return <span className="bg bg-img"><img src={backgroundPictureUrl} alt="backgroundImg"/></span>
            } else {
                return <span className="bg bg-color"></span>
            }
          }




        const { profilePictureUrl, backgroundPictureUrl, username } = this.props.user 
        
        console.log(username)
    return(
        <>
        <div className="bg-profile">{displayBackgroundPicture(backgroundPictureUrl)}</div>
        <div className="user-info">
                {displayProfilePicture(profilePictureUrl)}
                <p>{username}</p>
                <button>Edit profile</button>
        </div>
        <div className="nav-profile">
                <Link>My recipes</Link>
                <Link>My plans</Link>
                <Link>Save</Link>
        </div>
        <div className="recipes-container">
            <ProfileEditCard imageUrl="/img/guacamole.jpeg" />
        </div>
        </>
    )
}}

export default withAuth(Profile)