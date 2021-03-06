/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import store from './store/store';
import { $ } from './utils/dom';

class ApiList {
  constructor() {
    this.initEvent();
  }

  createUserTemplate({
    id, url, login, bookmark,
  }) {
    return `
        <li data-key-id=${id} class="api-item">
        <img class='user-img' src=${url}/>
        <div class='user-name'>${login}</div>
        <button class='bookmark-btn' type='button'>
          <i class="${bookmark} fa-star fa-2x bookmark-btn"></i>
        </button>
        </li>`;
  }

  createUser(users) {
    const template = users.map((user) => {
      if (store.isEmptyLocalStorage()) {
        return this.createUserTemplate({
          id: user.id,
          url: user.avatar_url,
          login: user.login,
          bookmark: 'far',
        });
      }
      if (!store.isEmptyLocalStorage()) {
        const isLocal = store.getLocalStorage().find((target) => target.login === user.login);
        if (isLocal) {
          return this.createUserTemplate({
            id: user.id,
            url: user.avatar_url,
            login: user.login,
            bookmark: 'fas',
          });
        }
        if (!isLocal) {
          return this.createUserTemplate({
            id: user.id,
            url: user.avatar_url,
            login: user.login,
            bookmark: 'far',
          });
        }
      }
    }).join('');
    $('#search-api-list').innerHTML = template;
  }

  addMark(e) {
    const bookmark = e.target.closest('li').querySelector('.fa-star');
    bookmark.classList.remove('far');
    bookmark.classList.add('fas');
  }

  removeMark(e) {
    const bookmark = e.target.closest('li').querySelector('.fa-star');
    bookmark.classList.remove('fas');
    bookmark.classList.add('far');
  }

  addLocalList(e) {
    const userImageUrl = e.target.closest('li').querySelector('.user-img').src;
    const userId = e.target.closest('li').querySelector('.user-name').innerText;

    const markedUser = {
      avatar_url: userImageUrl,
      login: userId,
    };

    if (store.isEmptyLocalStorage()) {
      store.setLocalStorage([markedUser]);
      return;
    }
    if (!store.isEmptyLocalStorage()) {
      const state = store.getLocalStorage();
      store.setLocalStorage([...state, markedUser]);
    }

    this.addMark(e);
  }

  removeLocalList(e, userId) {
    const localList = store.getLocalStorage().filter((item) => item.login !== userId);
    store.setLocalStorage(localList);
    this.removeMark(e);
  }

  toggleBookMark(e) {
    if (!store.isEmptyLocalStorage()) {
      const userId = e.target.closest('li').querySelector('.user-name').innerText;
      const hasUserIdInLocalStorage = store.getLocalStorage()
        .find((item) => item.login === userId);

      if (hasUserIdInLocalStorage) {
        this.removeLocalList(e, userId);
        return;
      }
    }
    this.addLocalList(e);
  }

  clearUserTemplate() {
    if ($('#search-api-list').classList.contains('api-item')) {
      return;
    }
    $('#search-api-list').innerHTML = '';
  }

  initEvent() {
    $('#search-api-list').addEventListener('click', (e) => {
      if (e.target.classList.contains('bookmark-btn')) {
        this.toggleBookMark(e);
      }
    });
  }
}

const apiList = new ApiList();
export default apiList;
