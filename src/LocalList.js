/* eslint-disable class-methods-use-this */
import store from './store/store';
import { $ } from './utils/dom';

class LocalList {
  constructor() {
    this.initEvent();
  }

  createUser() {
    if (store.getLocalStorage() === null) {
      const template = ` 
      <div class='unmarked-text'>즐겨찾기에 등록된 리스트가 없습니다.</div>
      `;

      $('#local-list').innerHTML = template;
      return;
    }
    if (store.getLocalStorage() !== null) {
      const users = store.getLocalStorage();

      const template = users.map((user, index) => `
      <li data-key-id=${index} class="api-item">
      <img class='user-img' src=${user.avatar_url}/>
      <div class='user-name'>${user.login}</div>
      <button class='bookmark-btn' type='button'>
        <i class="fas fa-star fa-2x bookmark-btn"></i>
      </button>
      </li>`);

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
    //
  }
}

const localList = new LocalList();
export default localList;
