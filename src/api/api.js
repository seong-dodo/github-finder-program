/* eslint-disable no-alert */
const BASE_URL = 'https://api.github.com/search/users';

const Api = {
  async getUsersBySearch(userName) {
    const url = `${BASE_URL}?&q=${userName}&per_page=100&page=1`;
    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      alert('에러가 발생했습니다.');
    }

    return response.json();
  },
};

export default Api;
