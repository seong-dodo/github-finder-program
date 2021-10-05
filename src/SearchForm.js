/* eslint-disable no-alert */

import { $ } from './utils/dom';
import Api from './api/api';

import ApiList from './ApiList';

function SearchForm() {
  const requestApi = async (keyword) => {
    const { items } = await Api.getUsersBySearch(keyword);
    return items;
  };

  $('#search-user-form').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  $('#search-user').addEventListener('keypress', async (e) => {
    const keyword = e.target.value;

    if (e.key !== 'Enter') {
      return;
    }
    if (keyword === '') {
      alert('값을 입력해주세요.');
      return;
    }

    const users = await requestApi(keyword);
    ApiList.createUser(users);

    e.target.value = '';
  });

  $('#search-user-submit-button').addEventListener('click', async () => {
    const keyword = ('#search-user').value;

    if (keyword === '') {
      alert('값을 입력해주세요.');
      return;
    }

    const users = await requestApi(keyword);
    ApiList.createUser(users);

    $('#search-user').value = '';
  });
}

SearchForm();
