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
    const template = users.map((user) => {
      if (store.getLocalStorage() === null) {
        return ` 
        <li data-key-id=${user.id} class="api-item">
        <img class='user-img' src=${user.avatar_url}/>
        <div class='user-name'>${user.login}</div>
        <button class='bookmark-btn' type='button'>
          <i class="far fa-star fa-2x bookmark-btn"></i>
        </button>
        </li>`;
      }
      if (store.getLocalStorage() !== null) {
        const isLocal = store.getLocalStorage().find((target) => target.login === user.login);
        if (isLocal || store.getLocalStorage() === null) {
          return ` 
          <li data-key-id=${user.id} class="api-item">
          <img class='user-img' src=${user.avatar_url}/>
          <div class='user-name'>${user.login}</div>
          <button class='bookmark-btn' type='button'>
            <i class="fas fa-star fa-2x bookmark-btn"></i>
          </button>
          </li>`;
        }

        if (!isLocal) {
          return ` 
          <li data-key-id=${user.id} class="api-item">
          <img class='user-img' src=${user.avatar_url}/>
          <div class='user-name'>${user.login}</div>
          <button class='bookmark-btn' type='button'>
            <i class="far fa-star fa-2x bookmark-btn"></i>
          </button>
          </li>`;
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

  removeLocalList(e) {
    if (store.getLocalStorage() !== null) {
      const userId = e.target.closest('li').querySelector('.user-name').innerText;
      const check = store.getLocalStorage().find((item) => item.login === userId);

      if (check) {
        const localList = store.getLocalStorage().filter((item) => item.login !== userId);
        store.setLocalStorage(localList);
        this.removeMark(e);
      }
    }
  }

  initEvent() {
    $('#search-api-list').addEventListener('click', (e) => {
      if (e.target.classList.contains('bookmark-btn')) {
        if (store.getLocalStorage() !== null) {
          const userId = e.target.closest('li').querySelector('.user-name').innerText;
          const check = store.getLocalStorage().find((item) => item.login === userId);

          if (check) {
            const localList = store.getLocalStorage().filter((item) => item.login !== userId);
            store.setLocalStorage(localList);
            this.removeMark(e);
            return;
          }
        }
        this.addLocalList(e);
      }
    });
  }
}
const apiList = new ApiList();
export default apiList;
