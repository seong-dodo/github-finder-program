/* eslint-disable no-alert */

import { $ } from './utils/dom';

function SearchForm() {
  $('#search-user-form').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  $('#search-user').addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    if (e.target.value === '') {
      alert('값을 입력해주세요.');
      return;
    }
    // TODO : 추후 단계에서 입력값(e.target.value)찾기 구현 예정

    e.target.value = '';
  });

  $('#search-user-submit-button').addEventListener('click', () => {
    if ($('#search-user').value === '') {
      alert('값을 입력해주세요.');
      return;
    }
    // TODO : 추후 단계에서 입력값 찾기 구현 예정

    $('#search-user').value = '';
  });
}

SearchForm();
