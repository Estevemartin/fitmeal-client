import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import NavbarMobile from "../components/NavbarMobile";
import service from "../api/service";
import CardRecipe from "../components/CardRecipe";
import SearchBar from "../components/SearchBar"
import Slider from "../components/Slider"
import { Link } from "react-router-dom";


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
      // console.log(this.state)
      // console.log(this.props)
      if(recipes.length !== 0){
        // const recipes = this.state.recipes
        // console.log(recipes)
        const randomRecipeId = Math.floor(Math.random()*recipes.length)
        // console.log(randomRecipeId)
        const currentRecipe = recipes[randomRecipeId]
        // console.log(currentRecipe)

        return (
          <section className="discover-section">
            <div className="text-discover">
              <p className="discover-title">{currentRecipe.title}</p>
              <div className="info-icons-recipe">
                  <div><ion-icon name="time-outline"></ion-icon><span>{currentRecipe.prepTime.replace(" mins", "''").replace(" -", "'' -")}</span></div>
                  <div><ion-icon name="heart-outline"></ion-icon><span>{currentRecipe.popularity}</span></div>
                  <ion-icon name="bookmark-outline"></ion-icon>
              </div>
          </div>
          <Link to = {"/recipes/"+currentRecipe._id} >
            <article style={{margin: "20px"}}>
              <div className="discover-img" style={{backgroundImage: "linear-gradient(0deg, rgba(95, 163, 151, 1) 10%, rgba(0, 0, 0, 0) 60%), url('"+currentRecipe.imageUrl+"')", backgroundSize: "cover", backgroundPosition: "50% 50%", backgroundRepeat: "no-repeat"}}>
              </div>
            </article>
          </Link>
          </section>
        )
      }
    }

    const displayAvatar = user => {
      if(user.profilePictureUrl){
          return <span className="profile-picture"><img src={user.profilePictureUrl} alt="profile"/></span>
      } else {
          return <span className="profile-picture avatar-green1"></span>
      }
    }
    const { user } = this.props;
    return (
      <div className="container">
          <NavbarMobile />

          {/* DISCOVER TITLE */}
          <div className="box">
            <div>
              <span><img style={{width: "25px"}} src="/favicon2.png" alt=""/></span>
              <h4>fitmeal.</h4>
              <span>
                  <Link to="/profile" className="user-mobile">
                    {/* <div className='navbar-icons-mobile'> */}
                      {displayAvatar(user)}
                    {/* <p className='icons-text'>Me</p> */}
                    {/* </div> */}
                </Link>
              </span>
            </div>
          </div>
          <h2>Search</h2>
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
