import Popup from './Popup.js';
import {popupImg, popupImgInfo, popupImgContent} from './utils.js'


export default class PopupWithImage extends Popup {
  constructor(data, popupSelector) {
    super(popupSelector);
    this._popupImgInfo = popupImg;
    this._popupImgInfo = popupImgInfo;
    this._popupImgContent = popupImgContent;
    this._data = data;
  }

  open() {
    this._popupImgInfo.src = this._data.link;
    this._popupImgInfo.name = this._data.name;
    this._popupImgInfo.alt = this._data.name;
    this._popupImgContent.textContent = this._data.name;
    super.open();
  }

}
