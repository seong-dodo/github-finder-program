import { $ } from './utils/dom';

class ApiList {
  // eslint-disable-next-line class-methods-use-this
  createUser(users) {
    const template = users.map((user) => `
      <li class="api-item">
      <img class='user-img' src=${user.avatar_url}/>
      <div class='user-name'>${user.login}</div>
      <button class='bookmark-btn' type='button'>
        <i class="far fa-star fa-2x"></i>
      </button>
      </li>
      `).join('');

    $('#search-api-list').innerHTML = template;
  }
}

export default new ApiList();
