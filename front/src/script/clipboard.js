import axios from "axios";
import auth from "./auth";
import Config from "../config";

const API_BASE = Config.APIBaseURL + "/clipboard";

class ClipboardAPI {

  constructor(){
    this.axios = axios.create({
      baseURL: Config.APIBaseURL + "/clipboard"
    });
    
  }

  async pullText() {
    let res = await this.axios.get(API_BASE + "/get", {
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
    let res = await this.axios.post(API_BASE + "/set", { text }, {
      headers:{
        Authorization: `Bearer ${auth.getAuthToken()}`
      }
    });

    return res.status === 200;
  }
  

};

const clipboard = new ClipboardAPI();
export default clipboard;