import axios from "axios";

class Service {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:4000/api",
      // withCredentials: true
    });
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

  handleUpload = async (theFile) => {
    // console.log("file in service: ", theFile);

    try {
      const res = await this.service.post("/upload", theFile);
      // console.log('res', res.data.secure_url)
      return res.data.secure_url;
    } catch (error) {
      console.log(error);
    }
  };

  saveNewRecipe = async (newRecipe) => {
    // console.log("new thing is: ", newRecipe);

    try {
      const res = await this.service.post("/recipes/create", newRecipe);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  getRecipes = async () => {
    try {
      const res = await this.service.get("/recipes");
      // console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

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
