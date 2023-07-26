import axios from 'axios';

const BASE_API_URL = '/api/todo';  

const apiClient = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


class Todo {

  async addList(name) {
    const response = await apiClient.post('/lists', { name });
    return response.data;
  }

  async getLists() {
    const response = await apiClient.get('/lists');
    return response.data;
  }

  async deleteList(listId) {
    const response = await apiClient.delete(`/lists/${listId}`);
    return response.data;
  }

  async addItem(list_id, title, desc) {
    const response = await apiClient.post('/items', { list_id, title, desc });
    return response.data;
  }

  async getItems(listId) {
    const response = await apiClient.get(`/lists/${listId}/items`);
    return response.data;
  }

  async getItem(itemId) {
    const response = await apiClient.get(`/items/${itemId}`);
    return response.data;
  }

  async deleteItem(itemId) {
    const response = await apiClient.delete(`/items/${itemId}`);
    return response.data;
  }

  async completeItem(itemId) {
    const response = await apiClient.post(`/items/${itemId}/complete`);
    return response.data;
  }

  async updateItem(itemId, title, desc, listId) {
    const response = await apiClient.put(`/items/${itemId}`, { title, desc, listId });
    return response.data;
  }
};

let todo = new Todo();

export default todo;
