import axios from "axios";

class TodoAPI {

  constructor(){
    this.axios = axios.create({
      baseURL: "/api/todo",
    });
    
  }

  // Gets all todo items
  async getAll() {

    let res = await this.axios.get("/get");

    return res.data;
  }

  // Gets a todo item by id
  async get(id) {
    let res = await this.axios.get(`/get/${id}`);

    return res.data;
  }

  // Adds a new todo item; returns the new todo item id
  async add(title, desc) {
    let res = await this.axios.post(`/add`, { title, desc });

    return res.data;
  }
  
  // Deletes a todo item
  async delete(id) {
    let res = await this.axios.post(`/delete/${id}`, {});

    return res.data;
  }

  // Marks an item complete
  async complete(id) {
    let res = await this.axios.post(`/complete/${id}`, {});

    return res.data;
  }

  // Updates a todo item
  async update(id, title, desc, completed) {
    let data = {};
    if (title) data.title = title;
    if (desc) data.desc = desc;
    if (completed) data.completed = completed;

    let res = await this.axios.post(`/update/${id}`, data);

    return res.data;
  }

  // Clears all items
  async clear() {
    let res = await this.axios.post(`/clear`, {});

    return res.data;
  }

};

const todo = new TodoAPI();
export default todo;