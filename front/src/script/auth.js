import axios from "axios";
import config from "../config";



class Auth {
  constructor() {
    this.loginURL = `${config.APIBaseURL}/login`;
  }

  getAuthToken() {
    return localStorage.getItem("auth_token");
  }

  setAuthToken(token) {
    localStorage.setItem("auth_token", token);
  }

  async login(password) {

    const data = {'password': password};

    try {
      const res = await axios.post(this.loginURL, data);
      
      if(res.status === 200) {
        this.setAuthToken(res.data.access_token);
        return true;
      }

    } catch (err) {
      if(err.response.status === 401) {
        console.log("unauthorized");
        console.log(err);
      }
    }
    return false;
  }

  async test_auth() {
    const token = this.getAuthToken();

    if(token == null) return false;

    try {
      let res = await axios.get(config.APIBaseURL + "/test_auth", {
        headers:{ Authorization: `Bearer ${this.getAuthToken()}` }
      });
      if(res.status == 200) return true;
    } catch (err) {
      if(err.response.status === 401) 
        return false;
    }

    return false;
  }

}

const auth = new Auth();

export default auth;
