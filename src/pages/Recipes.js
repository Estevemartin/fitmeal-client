import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import NavbarMobile from "../components/NavbarMobile";
import service from "../api/service";
import CardRecipe from "../components/CardRecipe";



class Recipes extends Component {
  state={
    recipes: []
  }
  getRecipes = async () => {
    const res = await service.getRecipes();
    console.log(res);
    this.setState({recipes: res})
  }

  componentDidMount = () => {
    this.getRecipes();
  }

  render() {
    return (
      <div className="container">
        <NavbarMobile />
        <div className="box-noIcon">
          <div>
            <h4>recipes.</h4>
            {/* <button>Close</button> */}
          </div>
          <h2>Discover</h2>
          <div className="discover-img" style={{backgroundImage: "linear-gradient(0deg, rgba(95, 163, 151, 0.7) 0%, rgba(0, 0, 0, 0) 50%), url('/img/mockup.png')"}}>
                  <div className="discover-title"></div>
                  <div className="info-icons-recipe">
                  </div>
          </div>
          <h2>Categories</h2>
          <h2>Popular recipes</h2>
          <div className="cards-recipes">
            {
            this.state.recipes.map((recipe, index) => {
              return (<CardRecipe key={index} imageUrl={recipe.imageUrl} title={recipe.title} popularity={recipe.popularity}/>
            )})}

            {/* {this.state.recipes.map((recipe => {
              return (<CardRecipe
                        key={recipe.id}
                        {...recipe}/>);
            }))} */}

          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Recipes);
