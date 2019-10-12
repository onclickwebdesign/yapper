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
  postYip: (yip, token) => {
    return fetch('/api/yip/', { 
      method: 'POST', 
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(yip)
    });
  }
};

export default YipAPI;