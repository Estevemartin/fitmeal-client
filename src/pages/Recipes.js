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

    return (
      <div className="container">
        <NavbarMobile />
        <div className="box">
          <div>
            <span></span>
            <h4>recipes.</h4>
            <span></span>
          </div>
        </div>
          
          <SearchBar />
      

          <h2>Discover</h2>

          {/* podriamos hacer un componente de esto? */}
          <div className="discover-img" style={{borderRadius: "5px", height: "250px", backgroundImage: "linear-gradient(0deg, rgba(95, 163, 151, 0.7) 0%, rgba(0, 0, 0, 0) 50%), url('/img/goat-cheese-salad-nuts.jpeg')"}}>
              
              <div className="discover-title"></div>
              <div className="info-icons-recipe">
                    <div><span></span> <ion-icon name="heart-outline"></ion-icon></div>
                    <ion-icon name="bookmark-outline"></ion-icon>
              </div>
          </div>



          <h2>Categories</h2>
          <Slider/>

          <h2>Popular recipes</h2>
          <div className="cards-recipes">
            {
              this.state.recipes.map((recipe,index) => {
              return (<CardRecipe key={recipe._id} {...recipe}/>
              )})
            }
          </div>
        </div>
    );
  }
}

export default withAuth(Recipes);
