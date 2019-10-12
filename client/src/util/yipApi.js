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
  }
};

export default YipAPI;