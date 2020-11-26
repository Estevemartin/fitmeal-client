import React, { Component } from "react";
import service from "../api/service";
import { withAuth } from "../lib/AuthProvider";
import Ingredients from "../components/Ingredients";
import { Link } from "react-router-dom";
// import axios from 'axios';



class AddNewRecipe extends Component {
  state = {
      imageUrl: "", 
      author: this.props.user._id,
      title: "",
      prepTime: 0,
      difficulty: "easy",
      portions:"",
      ingredients: [{ingredientId:0,name:"",amount:"",units:""}],
      steps: [''],
      numberOfIngredients: [0],
      numberOfSteps:[0],
      category:"breakfast",
      errorMsg:null,
      successMsg:null
  };

  // FILLING RECIPE ON EDIT
  getRecipeNumberOf = (steps) => {
    let resultArray = [0]
    for (let i=0; i<steps.length-1;i++){
      resultArray.push(i+1)
    }
    return resultArray
  }
  componentDidMount = async () =>{
        const id = this.props.match.params.id
        // console.log("Id:",id)
        if(id!==undefined){
          let recipe = await service.getRecipeDetails(id)
          // console.log("Response from Service en RecipeDetails.js",recipe)
          recipe.numberOfSteps = this.getRecipeNumberOf(recipe.steps)
          // console.log(recipe.numberOfSteps)
          recipe.numberOfIngredients = this.getRecipeNumberOf(recipe.ingredients)
          // console.log(recipe.numberOfIngredients)

          this.setState(recipe)
        }
  }

  // CHANGE HANDLERS
  handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleChangeField = (e,x,field) => {
    e.preventDefault();

    let stateCopy = this.state.ingredients
    var result=0
    stateCopy.forEach((num, ind)=>{
      if (num.ingredientId===x){result = ind}
    })
    switch (field){
      case "Name":
        stateCopy[result].name = e.target.value
        break
      case "Amount":
        stateCopy[result].amount = e.target.value
        break
      case "Units":
        stateCopy[result].units = e.target.value
        break
      default:
        break
    }
    this.setState({ingredients:stateCopy})
  };

  // CLICK HANDLERS
  handleFileUpload = async (e) => {
    // console.log("the file to be uploaded is: ", e.target.files[0]);
    e.preventDefault();

    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);

    try {
      const res = await service.handleUpload(uploadData);
      // console.log("response is", res);
      this.setState({ imageUrl: res });
    } catch (error) {
      console.log("Error while uploading the file: ", error);
    }
  };
  handleLevelClick = (e) => {
    e.preventDefault();
    // console.log(e.target.value)
    this.setState({difficulty:e.target.value})
  };
  handleCategoryClick = (e) => {
    e.preventDefault();
    // console.log(e.target.value)
    this.setState({category:e.target.value})
  };

  // INGREDIENTS
  addIngredient = (e) => {
    e.preventDefault();

    let nIng = this.state.numberOfIngredients
    // console.log("nIng: ",nIng)
    let maxNumber = Math.max(...nIng)+1
    // console.log("Max:",maxNumber)
    nIng.push(maxNumber)
    // console.log("nIng.push(MaxNumber): ",nIng)
    let newIngredient = {ingredientId:maxNumber, name:"",amount:"",units:""}
    // console.log("NewIngredient: ",newIngredient)
    let newIngState = [...this.state.ingredients]
    // console.log("newIngState:",newIngState)
    newIngState.push(newIngredient)
    // console.log("resultIng:",resultIng)
    // console.log("Ingredients about to be in state:",this.state.ingredients.push(newIngredient))
    return this.setState({numberOfIngredients:nIng,ingredients:newIngState})
  };
  handleDeleteIngredient = (x) => {
    // e.preventDefault();

    // console.log("X:", x)
    const filteredCopy = this.state.ingredients.filter((element,ind)=>ind!==x)
    // console.log("Filtered Copy:",filteredCopy)

    const numIngreResultArray = this.state.numberOfIngredients.filter((element,ind)=>ind!==x)
    // console.log("Num Ingr Arr:",numIngreResultArray)

    if (numIngreResultArray.length===0){
      this.setState({numberOfIngredients:[0],ingredients: [{ingredientId:0,name:"",amount:"",units:""}]})
    } else{
      this.setState({numberOfIngredients:numIngreResultArray,ingredients:filteredCopy})
    }
  };

  // STEPS
  addStep = (e) => {
    e.preventDefault();

    let nSteps = this.state.numberOfSteps
    // console.log("nSteps: ",nSteps)
    let maxNumber = Math.max(...nSteps)+1
    // console.log("Max:",maxNumber)
    nSteps.push(maxNumber)
    // console.log("nSteps.push(MaxNumber): ",nSteps)

    let newStep = ""
    // console.log("newStep: ",newStep)
    let newStepState = [...this.state.steps]
    // console.log("newStepState:",newStepState)
    newStepState.push(newStep)
    // console.log("newStepState.push(newStep):",newStepState)

    return this.setState({numberOfSteps:nSteps,steps:newStepState})
  };
  handleStepChange = (e,x) => {
    e.preventDefault();

    // console.log("X:",)
    let stateCopy = this.state.steps

    stateCopy[x] = e.target.value
    // console.log("StateCopy:",stateCopy)
    
    this.setState({steps:stateCopy})
  };
  
  // FORM SUBMIT
  handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      let currentUrl = this.props.location.pathname
      // console.log("Handle Form Submit, currentUrl:",currentUrl)
      var res
      if (currentUrl.includes("AddNewRecipe")){
        // console.log("Inside AddNewRecipe")
        res = await service.saveNewRecipe(this.state);
        // console.log("CREATED RECIPE -->", res);
        // var successMsg = "Recipe Successfully Created!"
      } else if (currentUrl.includes ("editRecipe")){
        // console.log("Inside editRecipe")

        res = await service.updateRecipe(this.state);
        // console.log("UPDATED RECIPE -->", res);
        // var successMsg = "Recipe Successfully Updated!"
      }
      // console.log("CREATED / UPDATED RECIPE -->", res);
      
      // const res = await service.saveNewRecipe(this.state);
      
      // console.log(this.state.imageUrl)
      
      this.setState({
        imageUrl: "", 
        author: this.props.user.username,
        title: "",
        prepTime: 0,
        difficulty: "easy",
        portions:"",
        ingredients: [{ingredientId:0,name:"",amount:"",units:""}],
        steps: [''],
        category:"breakfast",
        numberOfIngredients: [0],
        numberOfSteps:[0],
        errorMsg:null,
        successMsg:null
      });
      setTimeout(() => this.props.history.push('/recipes/'+res._id), 1500)

      // return this.props.history.push("/")
      // this.props.getRecipes()
      this.setState({successMsg:"Well done!"})
    } catch (error) {
        this.setState({errorMsg:"Make sure to fullfill all the required fields."})
        console.log("Error while adding the recipe: ", error);
    }
  };

  // RENDER
  render() {
    // console.log(this.props)
    const { title, prepTime, portions, errorMsg,successMsg, imageUrl , steps,category,difficulty} = this.state

    const displayDifficultyButtons = (difficulty) => {
      switch (difficulty) {
        case "easy":
          return(
            <>
              <button onClick={(e)=>this.handleLevelClick(e)} value="easy" style= {{border:"2px solid var(--green3)", backgroundColor:"white"}}>Easy</button>
              <button onClick={(e)=>this.handleLevelClick(e)} value="medium">Medium</button>
              <button onClick={(e)=>this.handleLevelClick(e)} value="hard">Hard</button>
            </>
          )
        case "medium":
          return(
            <>
              <button onClick={(e)=>this.handleLevelClick(e)} value="easy">Easy</button>
              <button onClick={(e)=>this.handleLevelClick(e)} value="medium" style= {{border:"2px solid var(--green3)", backgroundColor:"white"}}>Medium</button>
              <button onClick={(e)=>this.handleLevelClick(e)} value="hard">Hard</button>
            </>
          )
        case "hard":
          return(
            <>
              <button onClick={(e)=>this.handleLevelClick(e)} value="easy">Easy</button>
              <button onClick={(e)=>this.handleLevelClick(e)} value="medium">Medium</button>
              <button onClick={(e)=>this.handleLevelClick(e)} value="hard" style= {{border:"2px solid var(--green3)", backgroundColor:"white"}}>Hard</button>
            </>
          )
        default:
          return (<></>)
      }
    }

    const displayCategoryButtons = (category) =>{
      switch (category) {
        case "breakfast":
          return(
            <>
              <button onClick={(e)=>this.handleCategoryClick(e)} value="breakfast" style= {{border:"2px solid var(--green3)", backgroundColor:"white"}}>Breakfast</button>
              <button onClick={(e)=>this.handleCategoryClick(e)} value="brunch">Brunch</button>
              <button onClick={(e)=>this.handleCategoryClick(e)} value="lunch">Lunch</button>
              <button onClick={(e)=>this.handleCategoryClick(e)} value="snack">Snack</button>
              <button onClick={(e)=>this.handleCategoryClick(e)} value="dinner">Dinner</button>
            </>
          )
        case "brunch":
          return(
            <>
              <button onClick={(e)=>this.handleCategoryClick(e)} value="breakfast" >Breakfast</button>
              <button onClick={(e)=>this.handleCategoryClick(e)} value="brunch" style= {{border:"2px solid var(--green3)", backgroundColor:"white"}}>Brunch</button>
              <button onClick={(e)=>this.handleCategoryClick(e)} value="lunch">Lunch</button>
              <button onClick={(e)=>this.handleCategoryClick(e)} value="snack">Snack</button>
              <button onClick={(e)=>this.handleCategoryClick(e)} value="dinner">Dinner</button>
            </>
          )
        case "lunch":
          return(
            <>
              <button onClick={(e)=>this.handleCategoryClick(e)} value="breakfast" >Breakfast</button>
              <button onClick={(e)=>this.handleCategoryClick(e)} value="brunch">Brunch</button>
              <button onClick={(e)=>this.handleCategoryClick(e)} value="lunch" style= {{border:"2px solid var(--green3)", backgroundColor:"white"}}>Lunch</button>
              <button onClick={(e)=>this.handleCategoryClick(e)} value="snack">Snack</button>
              <button onClick={(e)=>this.handleCategoryClick(e)} value="dinner">Dinner</button>
            </>
          )
        case "snack":
          return(
            <>
              <button onClick={(e)=>this.handleCategoryClick(e)} value="breakfast" >Breakfast</button>
              <button onClick={(e)=>this.handleCategoryClick(e)} value="brunch">Brunch</button>
              <button onClick={(e)=>this.handleCategoryClick(e)} value="lunch">Lunch</button>
              <button onClick={(e)=>this.handleCategoryClick(e)} value="snack" style= {{border:"2px solid var(--green3)", backgroundColor:"white"}}>Snack</button>
              <button onClick={(e)=>this.handleCategoryClick(e)} value="dinner">Dinner</button>
            </>
          )
        case "dinner":
          return(
            <>
              <button onClick={(e)=>this.handleCategoryClick(e)} value="breakfast" >Breakfast</button>
              <button onClick={(e)=>this.handleCategoryClick(e)} value="brunch">Brunch</button>
              <button onClick={(e)=>this.handleCategoryClick(e)} value="lunch">Lunch</button>
              <button onClick={(e)=>this.handleCategoryClick(e)} value="snack">Snack</button>
              <button onClick={(e)=>this.handleCategoryClick(e)} value="dinner" style= {{border:"2px solid var(--green3)", backgroundColor:"white"}}>Dinner</button>
            </>
          )
        default:
          return (<></>)
      }
    }

    const displayErrorMsg = (errorMsg) => {
      if (errorMsg !==null){
        return (<div className="msg msg-error">{errorMsg}</div>)
      } else{
        return ""
      }
    }

    const displaySuccessMsg = (successMsg) => {
      if (successMsg !==null){
        return (<div className="msg msg-success">{successMsg}</div>)
      } else{
        return ""
      }
    }
    
    const displayPhotobackground = (imageUrl) =>{
      if(imageUrl===""){
        return(
          <label  htmlFor="file" className="upload-img-text">
            <div className="img-text-box" style={{background:'#dadada'}}>
              <ion-icon name="add-circle-outline"></ion-icon>
              <p>Upload a final photo of your dish</p>
              <input id="file" className='image-selector' type='file' name='file' onChange={(e) => this.handleFileUpload(e)}/>
            </div>
          </label>
          )
      } else {
        return(
          <label  htmlFor="file" className="upload-img-text">
            <div className="img-text-box" style={{background:'#ddefec'}}>
              <ion-icon name="add-circle-outline"></ion-icon>
              <p>Picture Uploaded</p>
              <input id="file" className='image-selector' type='file' name='file' onChange={(e) => this.handleFileUpload(e)}/>
            </div>
          </label>
          )
      }
    }

    const displaySteps = () =>{
    
      const steps = this.state.steps
      // console.log("DisplaySteps > this.state.steps:", steps)
      // console.log("this.state.numberOfSteps:",this.state.numberOfSteps)
      if (steps!==[""]){
        return (
          this.state.numberOfSteps.map((num,index)=>{
              // let indexInsideSteps = steps.find(step=>step.ingredientId===num)
              let currentStep = steps[num]
              // console.log("indexInsideSteps:",indexInsideSteps)
              // console.log("currentStep:",currentStep)
            return (
              <div className="textarea-create" key={num}>
                <textarea className="textarea-placeholder-create" value={currentStep} id={'preparation-step-'+num} placeholder="Write here the steps..." onChange={(e)=>this.handleStepChange(e,num)}>
                </textarea>
              </div>
            )
          })
        )
      }
    }

    return (
      <>
        {/* HEADER */}
        <div className="box">
          <div>
            <span><Link to="/"><img style={{width: "25px"}} src="/favicon2.png" alt=""/></Link></span>
            <h4 className="section-box">add a recipe.</h4>
            <button><Link to="/">Close</Link></button>
          </div>
        </div>

        <div className="box-green">
          <p>We’re excited to see your recipe! Let’s start with the basics</p>
        </div>

        <form method="POST" action="/createRecipe" className='add-new-recipe-form' onSubmit={this.handleFormSubmit}>
            
          {/* TITLE */}
          <div className="create-section">
            <label className="create-recipe-titles">Name your recipe<span>*</span></label>
            <input className="input-title-recipe" type='text' name='title' value={title} placeholder="Write a nice title" onChange={this.handleChange} />
          </div>

          {/* IMAGE */}
          <div className="img-create create-section">
            <label className="create-recipe-titles">Add a recipe photo<span>*</span></label>
              {displayPhotobackground(imageUrl)}
          </div>


          {/* CATEGORY */}
          <div className="difficulty-section create-section">
            <label className="create-recipe-titles">Category<span>*</span></label>
            <div className="cat-btn-section">
              {displayCategoryButtons(category)}
            </div>
          </div>

          <div className="box-green">
            <p>Something’s cooking! Let’s add a few more details…</p>
          </div>

          {/* PORTIONS */}
          <div className="portions-section create-section">
            <label className="create-recipe-titles" htmlFor="">Portions<span>*</span></label>
            <select className='portions select-underline' name='portions' value={portions} type='text' onChange={this.handleChange}>
              <option hidden>nº servings</option>
              <option value="1 serving">1 serving</option>
              <option value="2 servings">2 servings</option>
              <option value="3 servings">3 servings</option>
              <option value="4 servings">4 servings</option>
              <option value="5 servings">5 servings</option>
              <option value="6 servings">6 servings</option>
              <option value="7 servings">7 servings</option>
              <option value="8 servings">8 servings</option>
              <option value="9 servings">9 servings</option>
              <option value="10 servings">10 servings</option>
            </select> 
          </div>
          <hr/>

          {/* DIFFICULTY */}
          <div className="difficulty-section create-section">
            <label className="create-recipe-titles">Difficulty<span>*</span></label>
            <div className="diff-btn-section">
              {displayDifficultyButtons(difficulty)}
              {/* <button onClick={(e)=>this.handleLevelClick(e)} value="easy">Easy</button>
              <button onClick={(e)=>this.handleLevelClick(e)} value="medium">Medium</button>
              <button onClick={(e)=>this.handleLevelClick(e)} value="hard">Hard</button> */}
            </div>
          </div>
          <hr/>

          {/* PREP TIME */}
          <div className="selector-container create-section">
            <div className="text-box-select">
              <label className="create-recipe-titles" htmlFor="">Prep time<span>*</span></label>
              <p>How much time do you spend making the dish?</p>
            </div>
            <select className='prep-time select-underline' name='prepTime' type='text' value={prepTime} onChange={this.handleChange}>
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

          {/* INGREDIENTS */}
          <div className="ingredients-create create-section">
            <label className="create-recipe-titles">Ingredients<span>*</span></label>
            {/* {console.log("Array de Ingredients ID:",this.state.numberOfIngredients,"Ingredientes en State:",this.state.ingredients)} */}

            {this.state.numberOfIngredients.map((num,index)=>{
              var result=0
              this.state.ingredients.forEach((element, ind)=>{
                if (element.ingredientId===num){result = ind}
              })

              /* console.log("numberOfIngredients:",num,"(value) ",index,"(index) | Ingredient:", this.state.ingredients[result].ingredientId,"(value) ", result,"(index)") */

              return <Ingredients 
                index={num} 
                key={num} 
                handleDelete={()=>this.handleDeleteIngredient(result)} 
                handleChangeName = {(e)=>this.handleChangeField(e,num,"Name")}
                handleChangeUnits = {(e)=>this.handleChangeField(e,num,"Units")}
                handleChangeAmount = {(e)=>this.handleChangeField(e,num,"Amount")}
                amount={this.state.ingredients[result].amount}
                units={this.state.ingredients[result].units}
                name={this.state.ingredients[result].name} 
                />
            })}
              
            <button onClick={(e)=>this.addIngredient(e)} className="add-btn"><span>+ </span>Add an ingredient</button>
          </div>
            
          <div className="box-green">
            <p>Sound delicious! Now, it's time to add the steps...</p>
          </div>    
            
          {/* STEPS */}
          <div className="steps-create create-section">
            <label className="create-recipe-titles">Steps<span>*</span></label>
            {displaySteps(steps)}
            {/* {this.state.numberOfSteps.map((num,index)=>{
              return <div className="textarea-create " key={num}><textarea className="textarea-placeholder-create" id={'preparation-step-'+num} placeholder="Write here the steps..." onChange={(e)=>this.handleStepChange(e,num)}></textarea></div>
            })} */}
            
            <button  className="add-btn"  onClick ={(e)=>this.addStep(e)} ><span>+ </span>Add a step</button>
          </div>

          {/* FLASH MESSAGES */}
          {displayErrorMsg(errorMsg)}
          {displaySuccessMsg(successMsg)}

          <input className="submitDiv" type='submit' value='Save' />
          
        </form>
      </>
    );
  }
}

export default withAuth(AddNewRecipe);