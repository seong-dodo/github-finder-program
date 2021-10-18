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

  createUserTemplate({ index, url, login }) {
    return `
    <li data-key-id=${index} class="local-item">
    <img class='user-img' src=${url}/>
    <div class='user-name'>${login}</div>
    <button class='search-bookmark-btn local-bookmark-btn' type='button'>
      <i class="fas fa-star fa-2x search-bookmark-btn local-bookmark-btn"></i>
    </button>
    </li>
    `;
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

      const template = sortFilterUsers.map((user, index) => this.createUserTemplate({
        index,
        url: user.avatar_url,
        login: user.login,
      })).join('');

      $('#local-list').innerHTML = template;
    }
  }

  createUser() {
    if (store.isEmptyLocalStorage() || store.getLocalStorage().length === 0) {
      const template = ` 
      <div class='unmarked-text'>즐겨찾기에 등록된 리스트가 없습니다.</div>
      `;

      $('#local-list').innerHTML = template;
      return;
    }
    if (!store.isEmptyLocalStorage()) {
      const users = store.getLocalStorage();
      const sortUsers = sortByDictionary(users, 'login');

      const template = sortUsers.map((user, index) => this.createUserTemplate({
        index,
        url: user.avatar_url,
        login: user.login,
      })).join('');

      $('#local-list').innerHTML = template;
    }
  }

  clearUserTemplate() {
    if ($('#local-list').classList.contains('api-item')) {
      return;
    }
    $('#local-list').innerHTML = '';
  }

  unmarkUser(e) {
    const removeUser = e.target.closest('li').querySelector('.user-name').innerText;
    const removeFilter = store.getLocalStorage().filter((user) => user.login !== removeUser);
    store.setLocalStorage(removeFilter);
    this.createUser();

    if (store.getLocalStorage().length === 0) {
      alert('모든 내역이 삭제되었습니다.');
    }
  }

  unmarkSearchUser(e) {
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

  initEvent() {
    $('#local-list').addEventListener('click', (e) => {
      if (e.target.classList.contains('local-bookmark-btn')) {
        this.unmarkUser(e);
        return;
      }

      if (e.target.classList.contains('search-bookmark-btn')) {
        this.unmarkSearchUser(e);
      }
    });
  }
}

const localList = new LocalList();
export default localList;
