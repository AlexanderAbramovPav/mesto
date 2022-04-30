export default class UserInfo {
  constructor(userName, userAbout) {
    this._userName = userName;
    this._userAbout = userAbout;
  }

  getUserInfo() {
    this._profileValues = {};
    this._profileValues.name = this._userName.textContent;
    this._profileValues.info = this._userAbout.textContent;
    return this._profileValues;
  }

  setUserInfo(newUserData) {
    this._userName.textContent = newUserData.name;
    this._userAbout.textContent = newUserData.info;
  }
}
