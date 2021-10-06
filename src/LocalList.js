/* eslint-disable no-alert */
/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
import store from './store/store';
import { $ } from './utils/dom';
import sortByDictionary from './utils/utils';
import searchForm from './SearchForm';

class LocalList {
  constructor() {
    this.initEvent();
  }

  createFilterUser(keyword) {
    const users = store.getLocalStorage();

    if (users.length !== 0) {
      const filterUsers = users.filter((target) => target.login.startsWith(keyword));
      const sortFilterUsers = sortByDictionary(filterUsers, 'login');

      if (filterUsers.length === 0 || filterUsers === undefined) {
        const template = ` 
        <div class='unmarked-text'>검색한 사용자가 즐겨찾기 목록에 없습니다.</div>
        `;

        $('#local-list').innerHTML = template;
        return;
      }

      const template = sortFilterUsers.map((user, index) => `
      <li data-key-id=${index} class="local-item">
      <img class='user-img' src=${user.avatar_url}/>
      <div class='user-name'>${user.login}</div>
      <button class='search-bookmark-btn ' type='button'>
        <i class="fas fa-star fa-2x search-bookmark-btn"></i>
      </button>
      </li>
      `);
      $('#local-list').innerHTML = template;
    }
  }

  createUser() {
    if (store.getLocalStorage() === null || store.getLocalStorage().length === 0) {
      const template = ` 
      <div class='unmarked-text'>즐겨찾기에 등록된 리스트가 없습니다.</div>
      `;

      $('#local-list').innerHTML = template;
      return;
    }
    if (store.getLocalStorage() !== null) {
      const users = store.getLocalStorage();
      const sortUsers = sortByDictionary(users, 'login');

      const template = sortUsers.map((user, index) => `
      <li data-key-id=${index} class="local-item">
      <img class='user-img' src=${user.avatar_url}/>
      <div class='user-name'>${user.login}</div>
      <button class='local-bookmark-btn' type='button'>
        <i class="fas fa-star fa-2x local-bookmark-btn"></i>
      </button>
      </li>
      `);

      $('#local-list').innerHTML = template;
    }
  }

  clearUserTemplate() {
    if ($('#local-list').classList.contains('api-item')) {
      return;
    }
    $('#local-list').innerHTML = '';
  }

  initEvent() {
    $('#local-list').addEventListener('click', (e) => {
      if (e.target.classList.contains('local-bookmark-btn')) {
        const removeUser = e.target.closest('li').querySelector('.user-name').innerText;
        const removeFilter = store.getLocalStorage().filter((user) => user.login !== removeUser);
        store.setLocalStorage(removeFilter);
        this.createUser();
        if (store.getLocalStorage().length === 0) {
          alert('모든 내역이 삭제되었습니다.');
          return;
        }
        return;
      }

      if (e.target.classList.contains('search-bookmark-btn')) {
        const removeUser = e.target.closest('li').querySelector('.user-name').innerText;
        const removeFilter = store.getLocalStorage().filter((user) => user.login !== removeUser);
        store.setLocalStorage(removeFilter);

        if (store.getLocalStorage().length === 0) {
          alert('모든 내역이 삭제되었습니다.');
          this.createUser();
          return;
        }
        this.createFilterUser(searchForm.keyword);
      }
    });
  }
}

const localList = new LocalList();
export default localList;
