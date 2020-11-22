import React, { Component } from "react";
import "./App.css";
import { Switch } from "react-router-dom";
import AuthProvider from "./lib/AuthProvider";
import service from "./api/service";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";
import Landingpage from "./pages/Landingpage"
import AddNewRecipe from "./pages/AddNewRecipe";

class App extends Component {

  state = {
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
      <AuthProvider>
        <div className='container'>
          

          <Switch>
            <AnonRoute exact path='/' component={Landingpage} />
            <AnonRoute exact path='/signup' component={Signup} />
            <AnonRoute exact path='/login' component={Login} />
            <PrivateRoute exact path='/home' component={Home} />
            <PrivateRoute exact path='/addNewRecipe' component={AddNewRecipe}/>
          </Switch>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
