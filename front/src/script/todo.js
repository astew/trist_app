import axios from "axios";
import auth from "./auth";
import config from "../config";

class TodoAPI {

  constructor(){
    this.axios = axios.create({
      baseURL: config.API_URL_Prefix + "/todo",
    });
    
  }

  // Gets all todo items
  async getAll() {

    let res = await this.axios.get("/get", {
      headers:{ Authorization: `Bearer ${auth.getAuthToken()}` }
    });

    return res.data;
  }

  // Gets a todo item by id
  async get(id) {
    let res = await this.axios.get(`/get/${id}`, {
      headers:{ Authorization: `Bearer ${auth.getAuthToken()}` }
    });

    return res.data;
  }

  // Adds a new todo item; returns the new todo item id
  async add(title, desc) {
    let res = await this.axios.post(`/add`, { title, desc }, {
      headers:{ Authorization: `Bearer ${auth.getAuthToken()}` }
    });

    return res.data;
  }
  
  // Deletes a todo item
  async delete(id) {
    let res = await this.axios.post(`/delete/${id}`, {}, {
      headers:{ Authorization: `Bearer ${auth.getAuthToken()}` }
    });

    return res.data;
  }

  // Marks an item complete
  async complete(id) {
    let res = await this.axios.post(`/complete/${id}`, {}, {
      headers:{ Authorization: `Bearer ${auth.getAuthToken()}` }
    });

    return res.data;
  }

  // Updates a todo item
  async update(id, title, desc, completed) {
    let data = {};
    if (title) data.title = title;
    if (desc) data.desc = desc;
    if (completed) data.completed = completed;

    let res = await this.axios.post(`/update/${id}`, data, {
      headers:{ Authorization: `Bearer ${auth.getAuthToken()}` }
    });

    return res.data;
  }

  // Clears all items
  async clear() {
    let res = await this.axios.post(`/clear`, {}, {
      headers:{ Authorization: `Bearer ${auth.getAuthToken()}` }
    });

    return res.data;
  }

};

const todo = new TodoAPI();
export default todo;