/* eslint-disable import/no-cycle */
/* eslint-disable no-alert */
/* eslint-disable class-methods-use-this */

import { $ } from './utils/dom';
import Api from './api/api';

import ApiList from './ApiList';
import navTab from './NavTab';

class SearchForm {
  constructor() {
    this.initEvent();
  }

  async requestApi(keyword) {
    const { items } = await Api.getUsersBySearch(keyword);
    return items;
  }

  clearInputValue() {
    $('#search-user').value = '';
  }

  initEvent() {
    $('#search-user-form').addEventListener('submit', (e) => {
      e.preventDefault();
    });

    $('#search-user').addEventListener('keypress', async (e) => {
      const keyword = e.target.value;

      if (e.key !== 'Enter') {
        return;
      }
      if (keyword === '' || keyword === undefined) {
        alert('값을 입력해주세요.');
        return;
      }

      if (navTab.selectedTabType === '깃허브') {
        const users = await this.requestApi(keyword);
        ApiList.createUser(users);
      }

      this.clearInputValue();
    });

    $('#search-user-submit-button').addEventListener('click', async () => {
      const keyword = $('#search-user').value;

      if (keyword === '' || keyword === undefined) {
        alert('값을 입력해주세요.');
        return;
      }

      if (navTab.selectedTabType === '깃허브') {
        const users = await this.requestApi(keyword);
        ApiList.createUser(users);
      }

      this.clearInputValue();
    });
  }
}

const searchForm = new SearchForm();
export default searchForm;
