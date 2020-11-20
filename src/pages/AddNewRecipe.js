import React, { Component } from "react";
// import { withAuth } from "../lib/AuthProvider";

class AddNewRecipe extends Component {
  state = {
      image: "", 
      title: "Write a nice title",
      prepTime: "",
      difficulty: "",
      ingredients: "list the ingredients",
      preparation: "explain the magic"
     };

  handleFormSubmit = (event) => {
    event.preventDefault();
    // const { image, title, prepTime, difficulty, ingredients, preparation } = this.state;
    //console.log('Login -> form submit', { username, password });
    // this.props.login({ username, password });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { image, title, ingredients, preparation } = this.state;

    return (
      <>
        <form className='add-new-recipe-form' onSubmit={this.handleFormSubmit}>
            <input className='image-selector' type='file' name='image' value={image} onChange={this.handleChange} />

            <input className='title1' type='text' name='title' placeholder={title} onChange={this.handleChange} />
            <div className="selector-container">
                <select className='prep-time' name='prepTime' type='text'>
                    <option selected hidden>Prep Time</option>
                    <option>0 - 15 mins</option>
                    <option>15 - 30 mins</option>
                    <option>30 - 45 mins</option>
                    <option>+ 45 mins</option>
                </select>

                <select className='difficulty' name='difficulty' type='text' >
                    <option selected hidden>Difficulty</option>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                </select>
            </div>
            <h2>ingredients</h2>
            <textarea name='ingredients' placeholder={ingredients} onChange={this.handleChange}>
                
            </textarea>
            <h2>preparation</h2>
            <textarea name='preparation' placeholder={preparation} onChange={this.handleChange}>
            </textarea>
            <div className="submitDiv"><input type='submit' value='Save' /></div>
            
        </form>
      </>
    );
  }
}

export default AddNewRecipe;