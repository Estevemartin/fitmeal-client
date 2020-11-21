import axios from "axios";

class Service {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:4000/api",
      // withCredentials: true
    });
  }


  handleUpload = async (theFile) => {
    console.log("file in service: ", theFile);

    try {
      const res = await this.service.post("/upload", theFile);
      console.log('res.data', res.data)
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  saveNewRecipe = async (newRecipe) => {
    console.log("new thing is: ", newRecipe);

    try {
      const res = await this.service.post("/createRecipe", newRecipe);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  getRecipes = async () => {
    try {
      const res = await this.service.get("/recipes");
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
}

const axiosRequestFunctions = new Service();

export default axiosRequestFunctions;
