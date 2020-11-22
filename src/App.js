import React, { Component } from "react";
import "./App.css";
import { Switch } from "react-router-dom";
import AuthProvider from "./lib/AuthProvider";

import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";

import Signup from "./pages/Signup";
import Login from "./pages/Login";

import Landingpage from "./pages/Landingpage"
import Recipes from "./pages/Recipes";

import AddNewRecipe from "./pages/AddNewRecipe";
import RecipeDetails from "./pages/RecipeDetails";
import SearchRecipes from "./pages/SearchRecipes";


class App extends Component {
 render() {
    return (
      <AuthProvider>
        <div className='container'>
          

          <Switch>
            <AnonRoute exact path='/' component={Landingpage} />
            <AnonRoute exact path='/signup' component={Signup} />
            <AnonRoute exact path='/login' component={Login} />
            <PrivateRoute exact path='/recipes' component={Recipes} />
            <PrivateRoute exact path='/addNewRecipe' component={AddNewRecipe}/>
            <PrivateRoute exact path='/recipes/:id' component={RecipeDetails}/>
            <PrivateRoute exact path='/category/:category' component={SearchRecipes}/>
          </Switch>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
