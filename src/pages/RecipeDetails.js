// import { findAllByTitle, render } from '@testing-library/react'
// import React from "react";
import React, { Component } from "react";
import service from "../api/service";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";


class recipeDetails extends Component {
    state={

    }

    componentDidMount = async () => {
        const id = this.props.match.params.id
        // console.log("Id:",id)
        const recipe = await service.getRecipeDetails(id)
        // console.log("Response from Service en RecipeDetails.js",recipe)
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

        const {title,author,difficulty, ingredients,popularity,portions,prepTime,steps,imageUrl} = this.state
        return (
            <>
            <div className="image-recipe">
                <span><Link to="/"><ion-icon name="arrow-back-outline"></ion-icon></Link></span>
                <img src={imageUrl} alt="Recipe"/>
            </div>
            <div className="recipe-wrapped">
                <div className='container-recipe-details'> 
                    <h1>{title}</h1>
                    <div className="media">
                        <div><ion-icon name="heart-outline"></ion-icon><span>{popularity} likes</span></div>
                        <div><ion-icon name="bookmark-outline"></ion-icon><span>Save</span></div>
                        <div><ion-icon name="share-outline"></ion-icon><span>Share</span></div>
                    </div>
                    <div className="author">
                        <span className="profile-picture"></span>
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
