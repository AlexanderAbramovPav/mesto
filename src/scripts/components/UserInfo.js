export default class UserInfo {
  constructor(userName, userAbout) {
    this._userName = userName;
    this._userAbout = userAbout;
  }

  getUserInfo() {
    this._profileValues = {};
    this._profileValues.name = this._userName.textContent;
    this._profileValues.about = this._userAbout.textContent;
    this._profileValues.id = this._userID;
    return this._profileValues;
  }

  setUserInfo(newUserData) {
    this._userID = newUserData._id;
    this._userName.textContent = newUserData.name;
    this._userAbout.textContent = newUserData.about;
  }
}
