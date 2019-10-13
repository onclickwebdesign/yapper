const YipAPI = {
  getAuthUserYips: token => {
    return fetch('/api/yip', { 
      method: 'GET', 
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      }
    });
  },
  getTimelineYips: token => {
    return fetch(`/api/timelineyips`, { 
      method: 'GET', 
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      }
    });
  },
  postYip: (yip, url, headers) => {
    return fetch(url, { 
      method: 'POST', 
      headers,
      body: yip
    });
  }
};

export default YipAPI;