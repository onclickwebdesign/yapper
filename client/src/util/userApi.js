const UserAPI = {
  getUserWithSession: token => {
    return fetch('/api/user', { 
      method: 'GET', 
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      }
    });
  },
  getUserByHandle: handle => {
    return fetch(`/api/user/${handle}`, { 
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
};

export default UserAPI;