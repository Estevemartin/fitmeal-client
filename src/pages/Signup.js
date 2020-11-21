import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

class Signup extends Component {
  state = { 
    username: "",
    email: "",
    password: ""
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;
    //console.log('Signup -> form submit', { username, password });
    this.props.signup({ username, email, password });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, email, password } = this.state;
    return (
      <div className='container-page'>
            <div className='signup'>
                <h1>Sign Up</h1>

                <form className='form-auth' onSubmit={this.handleFormSubmit}>
                  <label>username:</label>
                  <input type='text' name='username' value={username} onChange={this.handleChange}/>

                  <label>email:</label>
                  <input type='text' name='email' value={email} onChange={this.handleChange}/>

                  <label>password:</label>
                  <input type='password' name='password' value={password} onChange={this.handleChange}/>

                  <input type='submit' value='Signup' />
                </form>

                <p>Already have account?</p>
                <Link to={"/login"}> Go to Login</Link>
            </div>
      </div>
    );
  }
}

export default withAuth(Signup);
