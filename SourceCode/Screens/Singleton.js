export default class CommonDataManager {
  static myInstance = null;
  _user = null;
  _profile = null;
  email = '';
  password = '';
  mainProfilePic = '';
  ProfilePic = '';
  addressLat = '';
  addressLog = '';
  fullAddress = '';
  appleInfo = null;
  CommonCredential = '';
  _shoppingCartDetails = [];
  _userPersonalInfo = null;
  totalPriceProducts = 0;

  checkFromSignIn = '';

  categoryType = '';

  _distance = null;

  // googleUserProfileUri = "";

  // /**
  //  * @returns {CommonDataManager}
  //  */
  static getInstance() {
    if (CommonDataManager.myInstance == null) {
      CommonDataManager.myInstance = new CommonDataManager();
    }
    return this.myInstance;
  }

  setUserPersonalInfo(resp) {
    this._userPersonalInfo = resp;
  }

  getUserPersonalInfo() {
    return this._userPersonalInfo;
  }

  // Getter Setter of TYPE
  getCategoryType() {
    return this.categoryType;
  }
  setCategoryType(res) {
    this.categoryType = res;
  }

  // Getter Setter of USER
  getUser() {
    return this._user;
  }
  setUser(res) {
    this._user = res;
  }

  getDistance() {
    return this._distance;
  }
  setDistance(res) {
    this._distance = res;
  }
  // Getter Setter of PROFILE
  getProfile() {
    return this._profile;
  }
  setProfile(res) {
    this._profile = res;
  }

  // Getter Setter of SHOPPING CHART
  getShoppingCartDetails() {
    return this._shoppingCartDetails;
  }
  setShoppingCartDetails(res) {
    // this._shoppingCartDetails.push(res);
    this._shoppingCartDetails = res;
  }

  clearCart(res) {
    this._shoppingCartDetails = res;
  }

  // Get total price for products
  getTotalPriceProducts() {
    return this.totalPriceProducts;
  }

  setTotalPriceProducts(res) {
    this.totalPriceProducts = res;
  }

  getCheckFromSignIn() {
    return this.checkFromSignIn;
  }

  setCheckFromSignIn(checkFromSignIn) {
    this.checkFromSignIn = checkFromSignIn;
  }

  getCommonCredential() {
    return this.CommonCredential;
  }

  setCommonCredential(CommonCredential) {
    this.CommonCredential = CommonCredential;
  }

  getFullAddress() {
    return this.fullAddress;
  }

  setFullAddress(fullAddress) {
    this.fullAddress = fullAddress;
  }

  getAddressLog() {
    return this.addressLog;
  }

  setAddressLog(addressLog) {
    this.addressLog = addressLog;
  }

  getAddressLat() {
    return this.addressLat;
  }

  setAddressLat(addressLat) {
    this.addressLat = addressLat;
  }

  getMainProfilePic() {
    return this.mainProfilePic;
  }

  setMainProfilePic(mainProfilePic) {
    this.mainProfilePic = mainProfilePic;
  }

  getEmail() {
    return this.email;
  }

  setEmail(email) {
    this.email = email;
  }

  getPassword() {
    return this.password;
  }

  setPasswrod(password) {
    this.password = password;
  }

  getProfilePic() {
    return this.ProfilePic;
  }

  setProfilePic(ProfilePic) {
    this.ProfilePic = ProfilePic;
  }

  getAppleInfo() {
    return this.appleInfo;
  }

  setAppleInfo(appleInfo) {
    this.appleInfo = appleInfo;
  }

}
