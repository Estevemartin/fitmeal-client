import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";


class Login extends Component {
  state = { username: "", password: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    //console.log('Login -> form submit', { username, password });
    this.props.login({ username, password });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className='container-page'>
        <Navbar/>
        <div className='login'>
        <h1>Login</h1>

        <form className='form-auth' onSubmit={this.handleFormSubmit}>
        <div className="input-field">
          <input id="username" type='text' name='username' value={username} onChange={this.handleChange}  required />
          <label htmlFor="username">Username:</label>
        </div>

        <div className="input-field">
          <input id="password" type='password' name='password' value={password} onChange={this.handleChange}  required />
          <label htmlFor="password">Password:</label>
        </div>

          <input id="login-submit" className="submit-input" type='submit' value='Login' />
        </form>

        <p>Don't have account? <Link to={"/signup"}> Go to Sign Up</Link></p>


        </div>
      </div>
    );
  }
}

export default withAuth(Login);
