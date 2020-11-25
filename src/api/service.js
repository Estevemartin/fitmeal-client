import axios from "axios";

class Service {
  constructor() {
    this.service = axios.create({
      // baseURL: "http://localhost:4000/api",
         baseURL: process.env.REACT_APP_API_URL + '/api',
      // withCredentials: true
    });
  }

  // PROFILE
  getUserInfo = async(userId) =>{
    try{
      // console.log(userId,recipeId)
      const res = await this.service.post("/profile",{_id:userId});
      // console.log(res.data);
      return res.data;
    }catch(error){
      console.log(error)
    }
  }
  getMyRecipes = async (id) => {
    try{
      // console.log("Inside getMyRecipes")
      const res = await this.service.post("/myRecipes",{id})
      // console.log(res.data)
      return res.data;
    }catch(error){
      console.log(error);
    }
  }
  getSavedRecipes= async(userId)=>{
    try{
      // console.log(userId,recipeId)
      const res = await this.service.post("/recipes/saved",{userId});
      console.log("SERVICE RESPONSE: ",res.data[0].saved);
      return res.data[0].saved;
    }catch(error){
      console.log(error)
    }
  }

  updateUserProfile = async (user) => {
    try {
      console.log(user)
      const res = await this.service.patch("/profile/update",user);
      // console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  // ACTIONS
  like = async(userId,recipeId)=>{
    try{
      // console.log(userId,recipeId)
      const res = await this.service.post("/like",{userId,recipeId});
      // console.log(res.data);
      return res.data;
    }catch(error){
      console.log(error)
    }
  }
  save = async(userId,recipeId)=>{
    try{
      // console.log(userId,recipeId)
      const res = await this.service.post("/save",{userId,recipeId});
      // console.log(res.data);
      return res.data;
    }catch(error){
      console.log(error)
    }
  }

  // RECIPES
  getRecipes = async () => {
    try {
      const res = await this.service.get("/recipes");
      // console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  getRecipeDetails = async (recipeId) => {
    try {
      // console.log("Im inside Service and the Id is:",recipeId)
      const res = await this.service.get("/recipes/"+recipeId);
      // console.log('Response From Server Inside Service.js', res.data)
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  updateRecipe = async (recipe) =>{
    try {
      // console.log("Recipe en service:", recipe)
      const res = await this.service.post("/recipes/update", recipe);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  deleteRecipe = async (recipeId) =>{
    try {
      // console.log("Recipe en service:", recipe)
      const res = await this.service.post("/recipes/delete", {recipeId:recipeId});
      // console.log("DELETE RECIPE RESPONSE:",res)
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  // CREATE RECIPE
  handleUpload = async (theFile) => {
    // console.log("file in service: ", theFile);

    try {
      const res = await this.service.post("/upload", theFile);
      // console.log('res', res.data.secure_url)
      return res.data.secure_url;
    } catch (error) {
      console.log(error);
    }
  }
  saveNewRecipe = async (newRecipe) => {
    console.log("new thing is: ", newRecipe);

    try {
      const res = await this.service.post("/recipes/create", newRecipe);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  
  // SEARCH
  getRecipesByCategory = async (category)=>{
    try {
      const res = await this.service.get("/category/"+category);
      // console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  getRecipesByDifficulty = async (difficulty)=>{
    try {
      // console.log("about to go to backend", difficulty)
      const res = await this.service.get("/difficulty/"+difficulty);
      // console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  

  // deleteCard = async (oneRecipe) =>{
  //   try {
  //     const res = await this.service.post("/deleteCard", oneRecipe);
  //     return res.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}







const axiosRequestFunctions = new Service();
export default axiosRequestFunctions;
