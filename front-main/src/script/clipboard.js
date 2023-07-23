import axios from "axios";

class ClipboardAPI {

  constructor(){
    this.axios = axios.create({
      baseURL: "/api/clipboard"
    });
    
  }

  async pullText() {
    let res = await this.axios.get("/get");
    if(res.status === 200) {
      return res.data;
    }

    if(res.status === 401) {
      throw new Error("Unauthorized");
    };

    throw new Error(`Failed to get clipboard text. (status: ${res.status})`);
  }

  async pushText(text) {
    let res = await this.axios.post("/set", { text });

    return res.status === 200;
  }
  

};

const clipboard = new ClipboardAPI();
export default clipboard;