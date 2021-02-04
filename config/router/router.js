export default class Router {
  constructor(last = wx.getStorageSync("router")) {
    this.last = last;
  }

  //页面跳转
  nav(url, str) {
    if (url === this.last) {
      return false;
    } else this.last = url;

    return new Promise((resolve, reject) => {
      if (str) {
        wx.navigateTo({
          url: url + str,
          success: function (res) {},
          fail: function (res) {},
          complete: function (res) {},
        });
      } else {
        wx.navigateTo({
          url: url,
          success: function (res) {},
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {},
        });
      }
    });
  }

  //销毁前一个页面跳转
  redirect(url, str) {
    if (url === this.last) {
      return false;
    } else this.last = url;

    return new Promise((resolve, reject) => {
      if (str) {
        wx.redirectTo({
          url: url + str,
          success: function (res) {},
          fail: function (res) {},
          complete: function (res) {},
        });
      } else {
        wx.redirectTo({
          url: url,
          success: function (res) {},
          fail: function (res) {},
          complete: function (res) {},
        });
      }
    });
  }

  switchTab(url) {
    wx.vibrateShort();
    if (url === this.last) {
      return false;
    } else this.last = url;

    wx.switchTab({
      url: url,
    });
  }

  reLaunchApp() {
    wx.vibrateShort();
    wx.reLaunch({
      url: "/pages/tabbar/home/index",
    });
  }

  toLogin() {
    if ("/pages/login/index" === this.last) {
      return false;
    } else this.last = "/pages/login/index";

    wx.reLaunch({
      url: "/pages/login/index",
    });
  }

  toHome() {
    if ("/pages/tabbar/home/index" === this.last) {
      return false;
    } else this.last = "/pages/tabbar/home/index";

    wx.switchTab({
      url: "/pages/tabbar/home/index",
    });
  }

  back(level = 1) {
    this.last = getCurrentPages().pop();
    if (getCurrentPages().length > 1)
      wx.navigateBack({
        delta: level,
      });
  }

  setRouter() {
    this.last = "/" + getCurrentPages()[0].route;
  }
}