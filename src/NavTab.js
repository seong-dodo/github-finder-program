/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
import { $ } from './utils/dom';

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
      apiList.clearUserTemplate();
      localList.clearUserTemplate();
      return;
    }
    if (selectedTabType === '즐겨찾기') {
      apiList.clearUserTemplate();
      localList.clearUserTemplate();
      localList.createUser();
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
