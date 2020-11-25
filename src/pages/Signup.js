import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar";

class Signup extends Component {
  state = { 
    username: "",
    email: "",
    password: ""
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;
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
        <Navbar/>
        <div className='signup'>
          <h1>Sign Up</h1>
            <form className='form-auth' onSubmit={this.handleFormSubmit}>
              <div className="input-field">
                <input id="username" type='text' name='username' value={username} onChange={this.handleChange}  required />
                <label htmlFor="username">Username:</label>
              </div>
              <div className="input-field">
                <input id="email" type='text' name='email' value={email} onChange={this.handleChange} required/>
                <label htmlFor="email">email:</label>
              </div>
              <div className="input-field">
                <input id="password" type='password' name='password' value={password} onChange={this.handleChange}  required />
                <label htmlFor="password">Password:</label>
              </div>
              <input className="submit-input" type='submit' value='Signup' />
            </form>
          <p>Already have account? <Link to={"/login"}> Go to Login</Link></p>
        </div>
      </div>
    );
  }
}

export default withAuth(Signup);
