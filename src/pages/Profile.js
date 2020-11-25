import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import ProfileEditCard from "../components/ProfileEditCard"
import ProfileSavedCard from "../components/ProfileSavedCard"
import service from "../api/service";

import NavbarMobile from "../components/NavbarMobile";

class Profile extends Component {
    state={
    }
    getMyRecipes = async () => {
        const res = await service.getMyRecipes(this.props.user._id);
        this.setState({recipes: res})
    }
    getMySavedrecipes = async () => {
        const recipes = await service.getSavedRecipes(this.props.user._id)
        this.setState({savedRecipes:recipes})
    }
    componentDidMount = () => {
        this.getMyRecipes() 
        this.getMySavedrecipes()
    }
    
    render() {
        const displayProfilePicture = profilePictureUrl => {
            if(profilePictureUrl){
                return <img className="profile-picture2 profile-stroke" src={profilePictureUrl} alt="profileImg"/>
            } else {
                return <div className="profile-picture2 profile-stroke avatar-green"></div>
            }
        }
        const displayBackgroundPicture = backgroundPictureUrl => {
            if(backgroundPictureUrl){
                return (
                    <>
                        <div className="logout">
                            <ion-icon className='logout-icon' name="log-out-outline" onClick={logout}></ion-icon>
                        </div>
                        <span className="bg">
                            <img src={backgroundPictureUrl} alt="backgroundImg"/>
                        </span>
                    </>
                )
            } else {
                return (
                    <>
                        <div className="logout"><ion-icon className='logout-icon' name="log-out-outline" onClick={logout}></ion-icon></div>
                        <div className="bg bg-color"></div>
                    </>
                )
            }
        }
        const displayMyRecipes = () =>{
            const recipes = this.state.recipes
            if(recipes!==undefined){
                return (
                    <>
                        {recipes.map((recipe,index)=>{
                            return <ProfileEditCard key={index} imageUrl={recipe.imageUrl} title={recipe.title} id={recipe._id} showButtons={this.state.showButtons}/>
                        })}
                    </>
                )
            }
        }
        const { profilePictureUrl, backgroundPictureUrl, username } = this.props.user
        const { logout } = this.props;
        const displaySavedRecipes = () =>{
            const recipes = this.state.savedRecipes
            if(recipes!==undefined){
                return (
                    <>
                        {recipes.map((recipe,index)=>{
                            return <ProfileSavedCard key={index} imageUrl={recipe.imageUrl} title={recipe.title} id={recipe._id} showButtons={this.state.showButtons} />
                        })}
                    </>
                )
            }
        }
        const displaySecondaryNavBar = () => {
            let currentUrl = this.props.location.pathname
            if (currentUrl === "/profile"){
                // this.setState({showButtons:true})
                return (
                    <>
                        <Link to="/profile">
                            <span>My recipes</span>
                            <hr  className="active"/>
                        </Link>
                        <Link to="#">
                            <span>My plans</span>
                            <hr/>
                        </Link>
                        <Link to="/profile/savedRecipes">
                            <span>Save</span>
                            <hr/>
                        </Link>
                    </>
                )
            } else if (currentUrl === "/profile/savedRecipes"){
                // this.setState({showButtons:false})
                return (
                    <>
                        <Link to="/profile">
                            <span>My recipes</span>
                            <hr/>
                        </Link>
                        <Link to="#">
                            <span>My plans</span>
                            <hr/>
                        </Link>
                        <Link to="/profile/savedRecipes">
                            <span>Save</span>
                            <hr className="active"/>
                        </Link>
                    </>
                )
            }
        }
        const display = () =>{
            let currentUrl = this.props.location.pathname
            if (currentUrl === "/profile"){
                return displayMyRecipes()
            } else if (currentUrl === "/profile/savedRecipes"){
                return displaySavedRecipes()
            }
        }
        

    return(
        <>
            <NavbarMobile />
            {displayBackgroundPicture(backgroundPictureUrl)}
            <div className="container-profile">
                <div className="user-info">
                    {displayProfilePicture(profilePictureUrl)}
                    <div className="user-info-container">
                        <h4>@{username}</h4>
                    </div>
                    <Link className="a-btn" to="/profile/edit">edit</Link>
                </div>
                
                <div className="nav-profile">
                    <hr/>
                    <div className="nav-profile-actions">
                        {displaySecondaryNavBar()}
                    </div>
                    
                </div>
                
                <div className="recipes-container">
                    {display()}
                </div>
            </div>
        </>
    )
}}

export default withAuth(Profile)