import React, { Component } from "react";
import "./App.css";
import { Switch } from "react-router-dom";
import AuthProvider from "./lib/AuthProvider";

import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Private from "./pages/Private";
import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home"
import AddNewRecipe from "./pages/AddNewRecipe";

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className='container'>
          <Navbar />

          <Switch>
            <AnonRoute exact path='/' component={Home} />
            <AnonRoute exact path='/signup' component={Signup} />
            <AnonRoute exact path='/login' component={Login} />
            <PrivateRoute exact path='/private' component={Private} />
            <PrivateRoute exact path='/addNewRecipe' component={AddNewRecipe}/>
          </Switch>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
