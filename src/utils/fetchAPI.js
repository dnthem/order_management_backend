import { ORIGIN } from '../constants';

function handleErrors(status, response) {
  if (status >= 200 && status < 300) {
    return;
  }
  switch (response.error) {
    case 'Token expired':
    case 'Invalid token':
    case 'Unauthenticated user':
      alert(response.error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      break;
  
    default:
      throw new Error(response.error);
  }
     
}

async function fetchTemplate (url, data, method)  {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + localStorage.getItem('token'),
      origin: ORIGIN,
    };

    const requestOptions = {
      method: method,
      headers: headers,
    };

    if (data) {
      requestOptions.body = JSON.stringify(data);
    }

    const response = await fetch(url, requestOptions);
    const responseData = await response.json();
    handleErrors(response.status, responseData);

    return responseData;
  } catch (error) {
    console.error(`Error ${method} data:`, error);
    throw error;
  }
};

/**
 * @description A wrapper for fetch API. If the response is not ok, it will throw an error.
 * @param {string} url The url to fetch
 * @param {object} data The data to send (optional)
 */
const fetchAPI = {
  get: async (url) => fetchTemplate(url, null, 'GET'),

  post: async (url, data) => fetchTemplate(url, data, 'POST'),

  update: async (url, data) => fetchTemplate(url, data, 'PUT'),

  delete: async (url) => fetchTemplate(url, null, 'DELETE'),
};

export default fetchAPI;
