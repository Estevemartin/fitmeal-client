import axios from "axios";

class Auth {
  constructor() {
    this.auth = axios.create({
      // baseURL: "http://localhost:4000",
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
    });
  }

  signup({ username, password,email }) {
    // username = "@" + username
    return this.auth
      .post("/auth/signup", { username, password ,email})
      .then(({ data }) => data);
  }

  login({ username, password }) {
    return this.auth
      .post("/auth/login", { username, password })
      .then(({ data }) => data);
  }

  logout() {
    return this.auth.post("/auth/logout", {}).then(({ data }) => data);
  }

  updateUser (userId){
    return this.auth.post("/profile",{_id:userId}).then(({ data}) => data);
  }

  me() {
    return this.auth.get("/auth/me").then(({ data }) => data);
  }
}

const axiosRequestFunctions = new Auth();

export default axiosRequestFunctions;
