/* eslint-disable class-methods-use-this */
import { $ } from './utils/dom';

const store = {
  setLocalStorage(user) {
    localStorage.setItem('user', JSON.stringify(user));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('user'));
  },
};

class ApiList {
  constructor() {
    this.initEvent();
  }

  createUser(users) {
    const template = users.map((user) => `
      <li class="api-item">
        <img class='user-img' src=${user.avatar_url}/>
        <div class='user-name'>${user.login}</div>
        <button class='bookmark-btn' type='button'>
          <i class="far fa-star fa-2x bookmark-btn"></i>
        </button>
      </li>
      `).join('');

    $('#search-api-list').innerHTML = template;
  }

  addMark(e) {
    const bookmark = e.target.closest('li').querySelector('.fa-star');
    bookmark.classList.add('fas');
    bookmark.classList.remove('far');
  }

  addLocalList(e) {
    const imageUrl = e.target.closest('li').querySelector('.user-img').src;
    const userId = e.target.closest('li').querySelector('.user-name').innerText;

    const markedUser = {
      avatar_url: imageUrl,
      login: userId,
    };

    if (store.getLocalStorage() === null) {
      store.setLocalStorage([markedUser]);
      return;
    }
    if (store.getLocalStorage() !== null) {
      const state = store.getLocalStorage();
      store.setLocalStorage([...state, markedUser]);
    }

    this.addMark(e);
  }

  initEvent() {
    $('#search-api-list').addEventListener('click', (e) => {
      if (e.target.classList.contains('bookmark-btn')) {
        this.addLocalList(e);
      }
    });
  }
}
const apiList = new ApiList();
export default apiList;
