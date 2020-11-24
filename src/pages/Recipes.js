import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import NavbarMobile from "../components/NavbarMobile";
import service from "../api/service";
import CardRecipe from "../components/CardRecipe";
import SearchBar from "../components/SearchBar"
import Slider from "../components/Slider"


class Recipes extends Component {
  state={
    recipes: [],
  }

  getRecipes = async () => {
    const res = await service.getRecipes();
    // console.log(res);
    this.setState({recipes: res})
  }


  componentDidMount = () => {
    this.getRecipes();
  }

  render() {

    const displayRandomRecipe = () =>{
      const recipes = this.state.recipes
      if(recipes.length !== 0){
        // const recipes = this.state.recipes
        console.log(recipes)
        const randomRecipeId = Math.floor(Math.random()*recipes.length)
        console.log(randomRecipeId)
        const currentRecipe = recipes[randomRecipeId]
        console.log(currentRecipe)


        return (
          <article style={{margin: "20px"}}>
            <div className="discover-img" style={{borderRadius: "5px", height: "250px", backgroundImage: "linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 50%), url('"+currentRecipe.imageUrl+"')"}}>
                <div>
                  <div className="discover-title">{currentRecipe.title}</div>
                  <div className="info-icons-recipe">
                    <div><span>{currentRecipe.popularity}</span> <ion-icon name="heart-outline"></ion-icon></div>
                    <ion-icon name="bookmark-outline"></ion-icon>
                  </div>
                </div>
            </div>
          </article>
        )
      }
    }

    return (
      <div className="container">
          <NavbarMobile />

          {/* DISCOVER TITLE */}
          <div className="box">
            <div>
              <span></span>
              <h4>recipes.</h4>
              <span></span>
            </div>
          </div>
          
          <SearchBar />

          <section className="section-cards">
              <h2>Discover</h2>
              {displayRandomRecipe()}
              
              <article>
                <h2>Categories</h2>
                <Slider/>
              </article>

              <article>
                <h2>Popular recipes</h2>
                <div className="cards-recipes">
                  {
                    this.state.recipes.map((recipe,index) => {
                    return (<CardRecipe key={recipe._id} {...recipe}/>
                    )})
                  }
                </div>
              </article>
          </section>
        </div>
    );
  }
}

export default withAuth(Recipes);
