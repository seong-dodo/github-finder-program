const store = {
  setLocalStorage(user) {
    localStorage.setItem('user', JSON.stringify(user));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('user'));
  },
};

export default store;
