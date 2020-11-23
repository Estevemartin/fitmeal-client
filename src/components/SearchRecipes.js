import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import service from "../api/service";
import CardRecipe from "../components/CardRecipe";

//category filter search
class SearchRecipes extends Component { 
  state={
    recipes: []
  }

  getRecipes = async () => {
    console.log("inicio getRecipes")
    const res = await service.getRecipes();
    // console.log(res);
    this.setState({recipes: res})
    console.log("fin getRecipes")
  }

  getRecipesByCategory = async (category) => {
    const res = await service.getRecipesByCategory(category);
    // console.log(res);
    this.setState({recipes: res})
  }

  getRecipesByDifficulty = async (difficulty) => {
    const res = await service.getRecipesByDifficulty(difficulty);
    // console.log(res);
    this.setState({recipes: res})
  }

  filterRecipe = (searchWord) => {
    console.log("inicio filtered")
    console.log("esto es searchWord",searchWord)
    
    if (searchWord !== undefined){
    const searchedWord = searchWord.toLowerCase();
    console.log("searchedWord",searchedWord)
    const stateList = [...this.state.recipes]
    console.log("esto es statelist",stateList)
    const filteredList = stateList.filter(recipe => {
      // console.log(recipe)
      // if (recipe.title !== undefined){
    return recipe.title.toLowerCase().includes(searchedWord);
      // }
    })
    console.log("filters state", filteredList)

    this.setState({recipes:filteredList})
    }
    console.log("fin del filter")
  }

  componentDidUpdate = async (prevProps) => {
    if(this.props.searchField !== prevProps.searchField){
        const searched = this.props.searchField.toLowerCase()
        console.log("CDM props", searched)

        if (searched === "easy" || searched === "medium" || searched === "hard"){
          this.getRecipesByDifficulty(searched)
        } else if (searched === "breakfast" || searched === "brunch" || searched === "lunch" || searched === "snack" || searched === "dinner"){
          this.getRecipesByCategory(searched)

        } else if (searched === "") {
          this.getRecipes()
        } else {
          await this.getRecipes()
          await this.filterRecipe(searched)
        }
      }
  }

  render() {
    return (
       <div className="cards-recipes">
          {
            this.state.recipes.map((recipe,index) => {
            return (<CardRecipe key={recipe._id} {...recipe}/>
            )})
          }
        </div>
    );
  }
}

export default withAuth(SearchRecipes);
