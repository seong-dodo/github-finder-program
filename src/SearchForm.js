/* eslint-disable import/no-cycle */
/* eslint-disable no-alert */
/* eslint-disable class-methods-use-this */

import { $ } from './utils/dom';
import Api from './api/api';

import navTab from './NavTab';
import apiList from './ApiList';
import localList from './LocalList';
import store from './store/store';

class SearchForm {
  constructor() {
    this.initEvent();
  }

  async requestApi(keyword) {
    const { items } = await Api.getUsersBySearch(keyword);
    return items;
  }

  async renderList() {
    const keyword = $('#search-user').value;

    if (keyword === '' || keyword === undefined) {
      alert('값을 입력해주세요.');
      return;
    }

    if (navTab.selectedTabType === '깃허브') {
      const users = await this.requestApi(keyword);
      apiList.createUser(users);
    }
    if (navTab.selectedTabType === '즐겨찾기') {
      if (store.getLocalStorage() === null) {
        alert('즐겨찾기에 등록된 사람이 없습니다.');
      }
      if (store.getLocalStorage() !== null) {
        localList.createFilterUser(keyword);
      }
    }
    this.clearInputValue();
  }

  clearInputValue() {
    $('#search-user').value = '';
  }

  initEvent() {
    $('#search-user-form').addEventListener('submit', (e) => {
      e.preventDefault();
    });

    $('#search-user').addEventListener('keypress', async (e) => {
      if (e.key !== 'Enter') {
        return;
      }

      this.renderList();
    });

    $('#search-user-submit-button').addEventListener('click', async () => {
      this.renderList();
    });
  }
}

const searchForm = new SearchForm();
export default searchForm;
