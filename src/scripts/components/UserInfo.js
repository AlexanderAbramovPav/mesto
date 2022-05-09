export default class UserInfo {
  constructor(userName, userAbout, userID, userAvatar) {
    this._userName = userName;
    this._userAbout = userAbout;
    this._userID = userID;
    this._userAvatar = userAvatar;
  }

  getUserInfo() {
    this._profileValues = {};
    this._profileValues.name = this._userName.textContent;
    this._profileValues.about = this._userAbout.textContent;
    this._profileValues.id = this._userID;
    this._profileValues.avatar = this._userAvatar;
    return this._profileValues;
  }

  setUserInfo(newUserData) {
    this._userID = newUserData._id;
    this._userName.textContent = newUserData.name;
    this._userAbout.textContent = newUserData.about;
    this._userAvatar.src = newUserData.avatar;
  }
}
