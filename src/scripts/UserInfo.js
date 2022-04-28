export default class UserInfo {
  constructor({nameSelector, infoSelector}) {
    this._nameSelector = nameSelector;
    this._infoSelector = infoSelector;
  }

  getUserInfo() {
    this._profileValues = {};
    this._profileValues.name = this._nameSelector.textContent;
    this._profileValues.info = this._infoSelector.textContent;
    return this._profileValues;
  }

  setUserInfo(newUserData) {
    this._nameSelector.textContent = newUserData.name;
    this._infoSelector.textContent = newUserData.info;
  }
}
