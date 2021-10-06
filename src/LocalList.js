/* eslint-disable class-methods-use-this */
import { $ } from './utils/dom';

class LocalList {
  constructor() {
    this.initEvent();
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
