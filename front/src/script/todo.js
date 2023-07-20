import axios from "axios";
import auth from "./auth";
import config from "../config";

class TodoAPI {

  constructor(){
    this.axios = axios.create({
      baseURL: config.API_URL_Prefix + "/todo",
    });
    
  }

  async getAll() {

    let res = await this.axios.get("/get", {
      headers:{ Authorization: `Bearer ${auth.getAuthToken()}` }
    });

    console.log(res.data);
    return res.data;
  }

  

};

const todo = new TodoAPI();
export default todo;