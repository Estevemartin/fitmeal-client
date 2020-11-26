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
import Profile from "./pages/Profile"
import Search from "./pages/Search";
import EditProfile from "./pages/EditProfile"
import ProfileId from "./pages/ProfileId"


class App extends Component {
 render() {
    return (
      <AuthProvider>
        <>
          <Switch>
            <AnonRoute exact path='/' component={Landingpage} />
            <AnonRoute exact path='/signup' component={Signup} />
            <AnonRoute exact path='/login' component={Login} />

            <PrivateRoute exact path='/recipes' component={Recipes} />
            <PrivateRoute exact path='/recipes/:id' component={RecipeDetails}/>
            
            <PrivateRoute exact path='/profile' component={Profile}/>
            <PrivateRoute exact path='/profile/savedRecipes' component={Profile}/>
            <PrivateRoute exact path='/profile/edit' component={EditProfile}/>
            <PrivateRoute exact path='/profile/:id' component={ProfileId}/>

            <PrivateRoute exact path='/addNewRecipe' component={AddNewRecipe}/>
            <PrivateRoute exact path='/search/:query' component={Search}/>
            <PrivateRoute exact path='/editRecipe/:id' component={AddNewRecipe}/>
          </Switch>
        </>
      </AuthProvider>
    );
  }
}

export default App;
