import { Router, app } from "../page";
Router(
  {
    data: {
      account: "",
      pwd: "",
      password: true,
    },
    onLoad(options) {},
    onReady() {},
    handleIcon() {
      this.setData({
        password: !this.data.password,
      });
    },
    login() {
      const { account, pwd } = this.data;
      app.$store.isLogin = true;
      app.$router.back();
    },
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},

    onPageScroll: function (e) {},
  },
  false
);
