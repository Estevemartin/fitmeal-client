// import React from 'react'
import { Link } from 'react-router-dom'
import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import service from "../api/service";


class CardRecipe extends Component {
    state={
       
    }
    save = async (recipeId) => {
        if(this.props.user !== undefined){
            var userId = this.props.user._id
            const savedUser = await service.save(userId,recipeId);
            // console.log(savedUser.currentUser.saved)
            var recipeSaved
            if (savedUser.currentUser.saved.includes(recipeId)){
                // console.log("Saved")
                recipeSaved=true
            } else {
                // console.log("Unsaved")
                recipeSaved=false
            }
            this.setState({
                user:savedUser,
                saved:recipeSaved,
            })
        }
    }
    like = async (recipeId) => {
        if(this.props.user !== undefined){
            // console.log(this.props)
            var userId = this.props.user._id
            // console.log(recipeId)
            // console.log(userId)
            const currentRecipe = this.state.savedRecipe
            // console.log("Current Recipe: ",currentRecipe)
            // const currentUser = await service.getUserInfo(userId)
            const res = await service.like(userId,recipeId);
            const {savedUser, savedRecipe} = res
            // console.log(currentUser)

            // console.log(res)
            // console.log(this.props.user)
            // console.log("USER ID: ",userId)

            // console.log("RECIPE LIKED BY: ",savedRecipe.liked)
            var recipeLiked
            if (currentRecipe.liked.includes(userId)){
                // console.log("Disliked")
                recipeLiked=false
            } else {
                // console.log("Liked")
                recipeLiked=true
            }
            this.setState({
                user:savedUser,
                like:recipeLiked,
                savedRecipe:savedRecipe
            })
            // this.props.user=res.savedUser
        }
    }
    componentDidMount = async () => {
    // componentDidUpdate = async (prevProps, prevState) => {
        // if (prevState !== this.state) {
            if(this.props.user!==undefined){
                // console.log(this.props.user)
                // console.log(this.props.user._id)
                var userId = this.props.user._id
                var recipeId = this.props._id
                // console.log(this.props)
                const currentUser = await service.getUserInfo(userId)
                const currentRecipe = await service.getRecipeDetails(recipeId)
                // console.log(res)
                // const currentUser = res
                // console.log(currentUser)
                var iLikeThis
                if (currentUser.liked.includes(recipeId)){
                    iLikeThis=true
                } else {
                    iLikeThis=false
                }

                var iSavedThis
                if (currentUser.saved.includes(recipeId)){
                    iSavedThis=true
                } else {
                    iSavedThis=false
                }


                // console.log("I Like This? ", iLikeThis)

                this.setState({
                    user:currentUser,
                    like:iLikeThis,
                    savedRecipe:currentRecipe,
                    saved:iSavedThis
                }) 
            }
        // }
        
    }
    displayLikes = (popularity) =>{
        // console.log("inside display likes")
        // console.log(this.state.savedRecipe)
        if(this.state.savedRecipe!==undefined){
            // console.log("Popularity:",  popularity)
            // console.log("State.SavedRecipe.Popularity",this.state.savedRecipe.popularity)
            if (!this.state.savedRecipe){
                return popularity
            } else {
                return this.state.savedRecipe.popularity
            }
        }
        
    }

    render() {

        const {imageUrl, title, prepTime, popularity, _id} = this.props

        return (
            <div className="card-recipe">
                <Link to={"/recipes/"+_id}><img src={imageUrl}  alt="img"/></Link>
                <div className="info-card-recipe">
                    <h3>{title}</h3>
                    <div className="icons-container">
                        <div><ion-icon name="time-outline"></ion-icon><span>{prepTime.replace(" mins", "''").replace(" -", "'' -")}</span></div>
                        <div><ion-icon name={this.state.like ? "heart" : "heart-outline"}  onClick={()=>this.like(_id)} style={{color:this.state.like ? "#ec5e5e" : ""}}></ion-icon><span>{this.displayLikes(popularity)}</span></div>
                        <ion-icon name={this.state.saved ? "bookmark" : "bookmark-outline"} onClick={()=>this.save(_id)} style={{color:this.state.saved ? "var(--green3)" : ""}}></ion-icon>
                    </div>
                </div>
            </div>
        )
    }

    
}

export default withAuth(CardRecipe)