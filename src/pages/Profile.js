import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import ProfileEditCard from "../components/ProfileEditCard"
import service from "../api/service";

import NavbarMobile from "../components/NavbarMobile";

class Profile extends Component {
    state={

    }
    getMyRecipes = async () => {
        const res = await service.getMyRecipes(this.props.user._id);
        // console.log(res);
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
                return <span className="profile-img"><img src={profilePictureUrl} alt="profileImg"/></span>
            } else {
                return <div className="profile-picture-mobile2 avatar-color"></div>
            }
        }

        const displayBackgroundPicture = backgroundPictureUrl => {
            if(backgroundPictureUrl){
                return (
                    <span className="bg bg-img">
                        <img src={backgroundPictureUrl} width="25px" alt="backgroundImg"/>
                    </span>
                )
            } else {
                return (
                    <div className="bg bg-color">
                        <span>
                            <Link to="/">
                                <ion-icon name="arrow-back-outline"></ion-icon>
                            </Link>
                        </span>
                    </div>
                )
            }
        }

        const displayMyRecipes = () =>{
            const recipes = this.state.recipes
            
            // console.log("Inside Display My Recipes:", recipes)
            if(recipes!==undefined){
                // console.log(recipes)
                // console.log("WE HAVE STATE")
                return (<>
                    {recipes.map((recipe,index)=>{
                        return <ProfileEditCard key={index} imageUrl={recipe.imageUrl} title={recipe.title} id={recipe._id} />
                    })}
                </>)
            }
        }

        const displaySavedRecipes = () =>{
            // console.log(userId)
            // const recipes = await service.getSavedRecipes(this.props.user._id)
            const recipes = this.state.savedRecipes

            // console.log(recipes)
            if(recipes!==undefined){
                // console.log("WE HAVE STATE")
                return (<>
                    {recipes.map((recipe,index)=>{
                        {/* console.log(recipe) */}
                        return <ProfileEditCard key={index} imageUrl={recipe.imageUrl} title={recipe.title} id={recipe._id} />
                    })}
                </>)
            }
        }

        const display = () =>{
            let currentUrl = this.props.location.pathname
            console.log(currentUrl)
            if (currentUrl === "/profile"){
                return displayMyRecipes()
            } else if (currentUrl === "/profile/savedRecipes"){
                return displaySavedRecipes()
            }
        }

        const { profilePictureUrl, backgroundPictureUrl, username, _id } = this.props.user 
        
        // console.log(username)
    return(
        <>
        <div className="bg-profile2">{displayBackgroundPicture(backgroundPictureUrl)}</div>
        <div className="user-info">
            {displayProfilePicture(profilePictureUrl)}
            <div className="user-info-container">
                <h4>{username}</h4>
                <p>@{username}</p>
            </div>
            <Link to="/profile/edit" ><button>edit profile</button></Link>
        </div>
        <div className="nav-profile">
                <Link to="/profile" className="active">My recipes</Link>
                <Link to="#">My plans</Link>
                <Link to="/profile/savedRecipes">Save</Link>
        </div>
        <div className="recipes-container">
            {display()}
        </div>
        <NavbarMobile />
        </>
    )
}}

export default withAuth(Profile)