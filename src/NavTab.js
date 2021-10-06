/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
import { $ } from './utils/dom';

import store from './store/store';

import apiList from './ApiList';
import localList from './LocalList';
import searchForm from './SearchForm';

class NavTab {
  constructor(selectedTabType) {
    this.initEvent();
    this.selectedTabType = selectedTabType;
  }

  clearActive() {
    const tabButtons = document.querySelectorAll('.tabs');
    tabButtons.forEach((tabButton) => {
      tabButton.classList.remove('active');
    });
  }

  setActive(targetTab) {
    targetTab.classList.add('active');
  }

  render(selectedTabType) {
    if (selectedTabType === '깃허브') {
      // 깃허브 탭을 클릭하면 처음화면에 api리스트와 로컬리스트 초기화 호출
      apiList.clearUserTemplate();
      localList.clearUserTemplate();

      // 2. 입력폼에 클릭, 키보드 이벤트가 일어났을 경우 사용자 검색이 서버에 호출되고 응답을 받아온다.
      return;
    }
    if (selectedTabType === '즐겨찾기') {
      apiList.clearUserTemplate();
      localList.clearUserTemplate();

      if (store.getLocalStorage() === null) {
        // 로컬이 비어있는 경우
        // 즐겨찾기 탭 클릭 시 초기화면은 즐겨찾기 등록된 리스트가 없습니다를 그려준다 호출
      }
      if (store.getLocalStorage() !== null) {
        // 로컬에 저장 데이터가 있을 경우
        // 즐겨찾기 탭 클릭 시 초기화면은 즐겨찾기 등록된 리스트가 그려진다 호출
      }

      // 입력폼 클릭,키보드 이벤트가 발생하면 로컬 리스트에서 사용자 검색을 요청하고 응답을 받는다.
    }
  }

  initEvent() {
    $('#tab-view').addEventListener('click', (e) => {
      if (e.target.classList.contains('tabs')) {
        const targetTab = e.target;
        const selectedTabType = e.target.innerText;
        this.selectedTabType = selectedTabType;

        this.clearActive();
        this.setActive(targetTab);
        searchForm.clearInputValue();
        this.render(selectedTabType);
      }
    });
  }
}

const navTab = new NavTab('깃허브');
export default navTab;
