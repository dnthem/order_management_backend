import { ORIGIN } from '../constants';

const fetchAPI = {
  get: async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + localStorage.getItem('token'),
          origin: ORIGIN,
        }

      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },

  post: async (url, data) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + localStorage.getItem('token'),
          origin: ORIGIN,
        },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  },

  update: async (url, data) => {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + localStorage.getItem('token'),
          origin: ORIGIN,
        },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error updating data:', error);
      throw error;
    }
  },

  delete: async (url) => {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + localStorage.getItem('token'),
          origin: ORIGIN,
        }
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
  }
};

export default fetchAPI;
