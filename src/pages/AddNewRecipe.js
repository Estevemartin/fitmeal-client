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
      ingredients: "Ingredient",
      preparation: "Start writing the steps here"
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
        ingredients: "Ingredient",
        preparation: "Start writing the steps here"
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

        <div className="box">
          <div>
            <h4>add a recipe.</h4>
            <button>Close</button>
          </div>
        </div>

        <div className="box-green">
          <p>We’re excited to see your recipe! Let’s start with the basics</p>
        </div>

        <form method="POST" action="/createRecipe" className='add-new-recipe-form' onSubmit={this.handleFormSubmit}>
            
           {/* name your recipe */}
           <div className="create-section">
            <label className="create-recipe-titles" htmlFor="">Name your recipe<span>*</span></label>
            <input className="input-title-recipe" type='text' name='title' placeholder={title} onChange={this.handleChange} />
          </div>

           {/* image recipe */}
           <div className="img-create create-section">
           <label className="create-recipe-titles" htmlFor="">Add a recipe photo<span>*</span></label>
           <div className="upload-img-text">
              <div className="img-text-box">
                <ion-icon name="add-circle-outline"></ion-icon>
                <label htmlFor="file">Upload a final photo of your dish</label>
                <input id="file" className='image-selector' type='file' name='file' onChange={(e) => this.handleFileUpload(e)}/>
            </div>
            </div>
            </div>

            <div className="box-green">
              <p>Something’s cooking! Let’s add a few more details…</p>
            </div>

            {/* portions*/}
            <div className="portions-section create-section">
              <label className="create-recipe-titles" htmlFor="">Portions<span>*</span></label>
              <select className='portions select-underline' name='portions' type='text' onChange={this.handleChange}>
                      <option hidden>nº servings</option>
                      <option value="1 serving">1 serving</option>
                      <option value="2 serving">2 serving</option>
                      <option value="3 serving">3 serving</option>
                      <option value="4 serving">4 serving</option>
                      <option value="5 serving">5 serving</option>
                      <option value="6 serving">6 serving</option>
                      <option value="7 serving">7 serving</option>
                      <option value="8 serving">8 serving</option>
                      <option value="9 serving">9 serving</option>
                      <option value="10 serving">10 serving</option>
                </select> 
            </div>


            {/* difficulty */}
            <div className="difficulty-section create-section">
                <label className="create-recipe-titles" htmlFor="">Difficulty<span>*</span></label>
                <div className="diff-btn-section">
                        <button>Easy</button>
                        <button>Medium</button>
                        <button>Hard</button>
                </div>
            </div>

            {/* prep time */}
            <div className="selector-container create-section">
                  <div className="text-box-select">
                        <label className="create-recipe-titles" htmlFor="">Prep time<span>*</span></label>
                        <p>How much time do you spend making the dish?</p>
                  </div>
                  <select className='prep-time select-underline' name='prepTime' type='text' onChange={this.handleChange}>
                        <option hidden>0 min</option>
                        <option value="0 - 15 mins">0 - 15 mins</option>
                        <option value="15 - 30 mins">15 - 30 mins</option>
                        <option value="30 - 45 mins">30 - 45 mins</option>
                        <option value="+ 45 mins">+ 45 mins</option>
                  </select> 
            </div>

            <div className="box-green">
                  <p>A recipe would be nothing without the ingredients! What goes in your dish?</p>
            </div>

            <div className="ingredients-create create-section">
                  <label className="create-recipe-titles" htmlFor="">Ingredients<span>*</span></label>
                  <div className="ingredients-options">
                      <input className="amount select-underline" type="number" name="amount" placeholder="Amount" onChange={this.handleChange} />
                      <select className="select-underline unit" name='unit' type='text' onChange={this.handleChange} >
                                <option hidden>Unit</option>
                                <option value=""> - </option>
                                <option value="tbsp">tbsp</option>
                                <option value="tbs">tbs</option>
                                <option value="cup">cup</option>
                                <option value="g">g</option>
                                <option value="kg">kg</option>
                                <option value="ml">ml</option>
                                <option value="l">l</option>
                      </select>
                      <input className="ingredients-text select-underline" type="text" placeholder={ingredients} onChange={this.handleChange}/>
                      <ion-icon name="close-circle-outline"></ion-icon>
                  </div>
                  <button className="add-btn"><span>+ </span>Add an ingredient</button>
            </div>
            
            <div className="box-green">
                  <p>Sound delicious! Now, it's time to add the steps...</p>
            </div>

            <div className="steps-create create-section">
                  <label className="create-recipe-titles" htmlFor="">Steps<span>*</span></label>
                  <div className="textarea-create">
                      <textarea className="textarea-placeholder-create" name='preparation' placeholder={preparation} onChange={this.handleChange}>
                      </textarea>
                      <ion-icon name="close-circle-outline"></ion-icon>
                  </div>
                  <button className="add-btn"><span>+ </span>Add a step</button>
            </div>

            
            <input className="submitDiv" type='submit' value='Save' />
        </form>
      </>
    );
  }
}

export default withAuth(AddNewRecipe);