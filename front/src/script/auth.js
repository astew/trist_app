
import axios from "axios";


async function getAuthToken(password) {
  try {
    const data = {'password': password};
    const res = await axios.post("http://127.0.0.1:5000/login", data);
    
    if(res.status === 200) {
      console.log(res.data.access_token);
      return res.data.access_token;
    }
  } catch (err) {
    if(err.response.status === 401) {
      console.log("unauthorized");
      console.log(err);
    }
  }
  return false;
}

export { getAuthToken };
