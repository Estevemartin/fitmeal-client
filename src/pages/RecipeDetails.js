// import { findAllByTitle, render } from '@testing-library/react'
// import React from "react";
import React, { Component } from "react";
import service from "../api/service";
import { withAuth } from "../lib/AuthProvider";


class recipeDetails extends Component {
    state={}
    componentDidMount = async () => {
        const id = this.props.match.params.id
        // console.log("Id:",id)
        const recipe = await service.getRecipeDetails(id)
        console.log("Response from Service en RecipeDetails.js",recipe)
        this.setState(recipe)
    }
    

    render (){
        // console.log("state:",this.state)
        // console.log("state.ingredients:",this.state.ingredients)

        const displayIngredients=(ingredients)=>{
            if (ingredients!==undefined){
                return (
                    ingredients.map((ingredient,index)=>{
                        if (ingredient.amount==="" && ingredient.units==="" && ingredient.name===""  ){
                            
                        } else {
                            return <li key={index}><input type="checkbox"></input>{ingredient.amount} {ingredient.units} {ingredient.name}  </li>
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
                            return <li key={index} style={{display:"flex",flexDirection:"row" }}><span style={{width:"15px",display:"flex",marginRight:"10px",justifyContent:"flex-end", }}>{index+1+"."}</span> {step} </li>
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

        const {title,author,difficulty, ingredients,popularity,portions,prepTime,steps,imageUrl} = this.state
        return (
            <div className='container-recipe-details'> 
                <div className="image-recipe"><img src={imageUrl} alt="Recipe" height="100"/></div>
                <p>{title}</p>
                <div className="media">
                    <span><ion-icon name="heart-outline"> </ion-icon>{popularity} likes</span>
                    <span><ion-icon name="bookmark-outline"></ion-icon>Save</span>
                </div>
                <div className="author">
                    <span style={{width: "30px", padding: "0px 5px", height:"30px", borderRadius: "25px"}} className="profile-picture-mobile avatar-color">a</span>
                    <h4>{displayAuthorUserName(author)}</h4>
                </div>
                <article>
                <p className="create-recipe-titles">Difficulty</p>
                <p>{difficulty}</p>
                </article>
                <section>
                        <article>
                        <p className="create-recipe-titles">Prep Time</p>
                        <p>{prepTime} mins</p>
                        </article>
                        <article>
                        <p className="create-recipe-titles">Serving</p>
                        <p>{portions}</p>
                        </article>
                </section>
                <section>
                        <article>
                        <p className="create-recipe-titles">Ingredients</p>
                            
                            <ul>
                                {displayIngredients(ingredients)}
                            </ul>
                        </article>
                        <article>
                        <p className="create-recipe-titles">Steps</p>

                            {/* <ol>
                            {steps.map((step,index)=>{
                        if (step!==""  ){
                            return <li key={index}> {step} </li>
                        }
                    })}

                            </ol> */}
                            <ul>
                                    {displaySteps(steps)}
                                    </ul>
                        </article>
                </section>
            </div>
          )
    }
    
    }

export default withAuth(recipeDetails);
