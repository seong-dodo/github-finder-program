const store = {
  setLocalStorage(user) {
    localStorage.setItem('user', JSON.stringify(user));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('user'));
  },
  isEmptyLocalStorage() {
    return store.getLocalStorage() === null;
  },
};

export default store;
