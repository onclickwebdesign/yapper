const FetchAPI = {
  fetchGet: (url, headers) => {
    return fetch(url, { 
      method: 'GET', 
      headers
    });
  },
  fetchPost: (url, headers, body) => {
    return fetch(url, { 
      method: 'POST', 
      headers,
      body
    });
  },
  fetch: (url, headers, body, method) => {
    return fetch(url, {
      method,
      headers,
      body
    });
  }
};

export default FetchAPI;
