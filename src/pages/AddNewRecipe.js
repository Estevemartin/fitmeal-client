import React, { Component } from "react";
import service from "../api/service";
import { withAuth } from "../lib/AuthProvider";
// import axios from 'axios';



class AddNewRecipe extends Component {
  state = {
      imageUrl: "", 
      author: this.props.user._id,
      title: "Write a nice title",
      prepTime: "",
      difficulty: "",
      ingredients: "list the ingredients",
      preparation: "explain the magic"
     };


    handleChange = (event) => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    };

    handleFileUpload = async (e) => {
      console.log("the file to be uploaded is: ", e.target.files[0]);
  
      // creamos un nuevo objeto FormData
      const uploadData = new FormData();
  
      // imageUrl (este nombre tiene que ser igual que en el modelo, ya que usaremos req.body como argumento del método .create() cuando creemos una nueva movie en la ruta POST '/api/movies/create')
      uploadData.append("imageUrl", e.target.files[0]);
  
      try {
        const res = await service.handleUpload(uploadData);
  
        console.log("response is", res);
  
        this.setState({ imageUrl: res });
      } catch (error) {
        console.log("Error while uploading the file: ", error);
      }
    };

  // handleFormSubmit = async (event) => {
  //   console.log(this.state)
  //   event.preventDefault();
  //   // const { image, title, prepTime, difficulty, ingredients, preparation } = this.state;
  //   await axios.post('http://localhost:4000/createRecipe', {recipe: this.state, _id:this.props.user._id})
  //   // await axios.get('http://localhost:3000/private')
  //   //console.log('Login -> form submit', { username, password });
  //   // this.props.login({ username, password });
  //   // return <Redirect to="http://localhost:3000/" />
  //   return this.props.history.push("/");
  // };

  handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await service.saveNewRecipe(this.state);
      console.log("added", res);
      console.log(this.state.imageUrl)

      this.setState({
        imageUrl: "", 
        author: "",
        title: "Write a nice title",
        prepTime: "",
        difficulty: "",
        ingredients: "list the ingredients",
        preparation: "explain the magic"
      });

      // this.props.getRecipes()
    } catch (error) {
        console.log("Error while adding the recipe: ", error);
    }
  };



  render() {
    console.log(this.props)
    const { title, ingredients, preparation } = this.state;

    return (
      <>
        <form method="POST" action="/createRecipe" className='add-new-recipe-form' onSubmit={this.handleFormSubmit}>
            <input className='image-selector' type='file' onChange={(e) => this.handleFileUpload(e)}/>

            <input className='title1' type='text' name='title' placeholder={title} onChange={this.handleChange} />
            <div className="selector-container">
                <select className='prep-time' name='prepTime' type='text' onChange={this.handleChange}>
                    <option selected hidden>Prep Time</option>
                    <option>0 - 15 mins</option>
                    <option>15 - 30 mins</option>
                    <option>30 - 45 mins</option>
                    <option>+ 45 mins</option>
                </select>

                <select className='difficulty' name='difficulty' type='text' onChange={this.handleChange} >
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

export default withAuth(AddNewRecipe);