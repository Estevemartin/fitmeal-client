import React, { Component } from "react";
import service from "../api/service";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";


class recipeDetails extends Component {
    state={
    }


    save = async (recipeId) => {
        if(this.props.user !== undefined){
            var userId = this.props.user._id
            const savedUser = await service.save(userId,recipeId);
            console.log(savedUser.currentUser.saved)
            var recipeSaved
            if (savedUser.currentUser.saved.includes(recipeId)){
                console.log("Saved")
                recipeSaved=true
            } else {
                console.log("Unsaved")
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
                console.log("Disliked")
                recipeLiked=false
            } else {
                console.log("Liked")
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
        const recipeId = this.props.match.params.id
        const recipe = await service.getRecipeDetails(recipeId)
        this.setState(recipe)

                var userId = this.props.user._id
                // // var recipeId = this.props._id
                // console.log(userId)
                const currentUser = await service.getUserInfo(userId)
                const currentRecipe = await service.getRecipeDetails(recipeId)
                // console.log(res)
                // const currentUser = res
                console.log(currentUser)
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
    

    render (){
        const displayIngredients=(ingredients)=>{
            if (ingredients!==undefined){
                return (
                    ingredients.map((ingredient,index)=>{
                        if (ingredient.amount==="" && ingredient.units==="" && ingredient.name===""  ){
                            return ""
                        } else {
                            return (
                                <li className="list-ingredients" key={index}>
                                    <input id={"ingredient-id-"+index} type="checkbox" data-content={ingredient.amount +" "+ ingredient.units +" "+ ingredient.name}/>
                                    <label htmlFor={"ingredient-id-"+index}>{ingredient.amount} {ingredient.units} {ingredient.name}</label>
                                </li>
                                )
                        }
                    })
                )
            } else {
                return ""
            }
        }
        const displaySteps = (steps) => {
            if (steps!==undefined){
                return (
                    steps.map((step,index)=>{
                        if (step!==""){
                            return <li key={index} style={{display:"flex",flexDirection:"row", marginBottom: "20px" }}><span style={{width:"15px",display:"flex", marginLeft: "10px",marginRight:"10px",justifyContent:"flex-end", }}>{index+1+"."}</span> {step} </li>
                        } else {
                            return ""
                        }
                    })
                )
            } else {
                return ""
            }
        }
        const displayAuthorUserName = (author) => {
            if (author!==undefined){
                return author.username
            } else {
                return ""
            }
        }
        const displayAvatar = (author, recipe) => {
            if(author!==undefined){
                // mirarse las rutas del perfil
                return <Link to={"/profile/"+author._id}><span className="profile-picture"><img src={author.profilePictureUrl} alt="profile"/></span></Link>
            } else {
                return <span className="profile-picture avatar-green"></span>
            }
        }
        // const displayLike = (like)=>{
        //     if (like) {
        //         return <ion-icon name="heart" style={{this.state.like ? "#ec5e5e" : ""}}></ion-icon>
        //     } else {
        //         return <ion-icon name={like ? "heart" : "heart-outline"} style={{this.state.like ? "#ec5e5e" : ""}}></ion-icon>
        //     }
        // }
        const {title,author,difficulty, ingredients,popularity,portions,prepTime,steps,imageUrl, like,saved,_id} = this.state
        return (
            <>
                <div className="image-recipe">
                    <span>
                        <Link to="/">
                            <ion-icon name="arrow-back-outline"></ion-icon>
                        </Link>
                    </span>
                    <img src={imageUrl} alt="Recipe"/>
                </div>
                <div className="recipe-wrapped">
                    <div className='container-recipe-details'> 
                        <h1>{title}</h1>
                        <div className="media">
                            <div>
                                <ion-icon name={like ? "heart" : "heart-outline"} style={{color:like ? "#ec5e5e" : ""}} onClick={()=>this.like(_id)} ></ion-icon>
                                <span>{popularity} likes</span>
                            </div>
                            <div>
                                <ion-icon name={saved ? "bookmark" : "bookmark-outline"} style={{color:saved ? "var(--green3)" : ""}}  onClick={()=>this.save(_id)} ></ion-icon>
                                <span>Save</span>
                            </div>
                            <div>
                                <ion-icon name="share-outline"></ion-icon>
                                <span>Share</span>
                            </div>
                        </div>
                        <div className="author">
                            <span className="profile-picture">{displayAvatar(author)}</span>
                            <h4>@{displayAuthorUserName(author)}</h4>
                        </div>
                    </div>
                </div>
                <section className="info-details-recipe">
                    <article>
                        <span>{difficulty}</span>
                        <p>Difficulty</p>
                    </article>
                    <article>
                        <span>{prepTime ? prepTime.replace(" mins", "''").replace(" -", "'' -") : ""}</span>
                        <p>Prep Time</p>
                    </article>
                    <article>     
                        <span>{portions ? portions.replace(" serving", "").replace("s", "") : ""}</span>
                        <p>Serving</p>
                    </article>
                </section>
                <section className="info-recipe-ingred-steps">
                    <article>
                        <h3>Ingredients</h3>
                        <ul>
                            {displayIngredients(ingredients)}
                        </ul>
                    </article>
                    <article>
                        <h3>Steps</h3>
                        <ul>
                            {displaySteps(steps)}
                        </ul>
                    </article>
                </section>
            </>
          )
        }
    }

export default withAuth(recipeDetails);
