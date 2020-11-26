import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import ProfileIdCard from "../components/ProfileIdCard"
// import ProfileSavedCard from "../components/ProfileSavedCard"
import service from "../api/service";
// import CardRecipe from "../components/CardRecipe";

import NavbarMobile from "../components/NavbarMobile";

class ProfileId extends Component {
    state={

    }
    // getMyRecipes = async () => {
    //     const res = await service.getMyRecipes(this.props.user._id);
    //     this.setState({recipes: res})
    // }
    // getMySavedrecipes = async () => {
    //     const recipes = await service.getSavedRecipes(this.props.user._id)
    //     this.setState({savedRecipes:recipes})
    // }
    componentDidMount = async () => {
        const userId = this.props.match.params.id
        // console.log(userId)
        const searchedUser = await service.getUserInfo(userId)
        // console.log(searchedUser)
        const res = await service.getMyRecipes(userId);
        // console.log("COMPOENNT DID MOUNT RESPONSE:",res)
        this.setState({recipes: res,searchedUser:searchedUser})
    }
    
    render() {
        const displayProfilePicture = () => {
            if (this.state.searchedUser!==undefined){
                const profilePictureUrl = this.state.searchedUser.profilePictureUrl
                if(profilePictureUrl){
                    return <img className="profile-picture2 profile-stroke" src={profilePictureUrl} alt="profileImg"/>
                } else {
                    return <div className="profile-picture2 profile-stroke avatar-green"></div>
                }
            }

            
        }
        const displayBackgroundPicture = () => {
            if (this.state.searchedUser!==undefined){
                const backgroundPictureUrl = this.state.searchedUser.backgroundPictureUrl
                if(backgroundPictureUrl){
                    // console.log("DISPLAYBGIMAGE:",this.state.searchedUser.backgroundPictureUrl)
                    return (
                        <>
                            <span className="bg">
                                <img src={backgroundPictureUrl} alt="backgroundImg"/>
                            </span>
                        </>
                    )
                } else {
                    return (
                        <>
                            <div className="bg bg-color"></div>
                        </>
                    )
                }
            }
           
        }
        const ddisplaySearchedUserName = () =>{
            if (this.state.searchedUser!==undefined){
                return this.state.searchedUser.username
            }
        }
        const displayMyRecipes = () =>{
            const recipes = this.state.recipes
            if(recipes!==undefined){
                // console.log(this.state.searchedUser)
                return (
                    <>
                        {recipes.map((recipe,index)=>{
                            return <ProfileIdCard key={index} imageUrl={recipe.imageUrl} title={recipe.title} id={recipe._id}/>
                        })}
                    </>
                )
            }
        }
        
    return(
        <>
            <NavbarMobile />
            {displayBackgroundPicture()}
            <div className="container-profile">
                <div className="user-info">
                    {displayProfilePicture()}
                    <div className="user-info-container">
                        <h4>@{ddisplaySearchedUserName()}</h4>
                    </div>
                    <div></div>
                </div>
                <h2>Recipes</h2>
                <div className="cards-recipes">
                    {displayMyRecipes()}
                </div>
            </div>
        </>
    )
}}

export default withAuth(ProfileId)