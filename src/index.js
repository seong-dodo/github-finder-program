/* eslint-disable no-alert */
const $ = (selector) => document.querySelector(selector);
function App() {
  $('#search-user-form').addEventListener('submit', (e) => {
    e.preventDefault();
  });
  $('#search-user-form').addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    if (e.target.value === '') {
      alert('값을 입력해주세요.');
    }
    // TODO : 추후 단계에서 입력값(e.target.value)찾기 구현 예정
    e.target.value = '';
  });
}

App();
