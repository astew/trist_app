import axios from "axios";
import auth from "./auth";
import config from "../config";

class ClipboardAPI {

  constructor(){
    this.axios = axios.create({
      baseURL: config.API_URL_Prefix + "/clipboard"
    });
    
  }

  async pullText() {
    let res = await this.axios.get("/get", {
      headers:{
        Authorization: `Bearer ${auth.getAuthToken()}`
      }
    });
    if(res.status === 200) {
      return res.data;
    }

    if(res.status === 401) {
      throw new Error("Unauthorized");
    };

    throw new Error(`Failed to get clipboard text. (status: ${res.status})`);
  }

  async pushText(text) {
    let res = await this.axios.post("/set", { text }, {
      headers:{
        Authorization: `Bearer ${auth.getAuthToken()}`
      }
    });

    return res.status === 200;
  }
  

};

const clipboard = new ClipboardAPI();
export default clipboard;