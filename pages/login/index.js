import { Router, app } from "../page";
Router(
  {
    data: {
      account: "",
      pwd: "",
      password: true,
      loading: false,
    },
    onLoad(options) {},
    onReady() {},
    handleIcon() {
      this.setData({
        password: !this.data.password,
      });
    },
    _checkData() {
      const { account, pwd } = this.data;
      if (account === "") {
        app.$utils.Notify({ type: "danger", message: "请输入姓名" });
        return false;
      } else if (pwd === "") {
        app.$utils.Notify({ type: "danger", message: "请输入工号" });
        return false;
      }
      return true;
    },
    async handleLogin() {
      if (this._checkData()) {
        this.setData({
          loading: true,
        });
        const { code } = await wx.pro.login();
        // const res = await wx.$api.wxLogin({ code });
        const r = await wx.$api.bindAccount({ account, pwd });
        console.log(r);
        // app.$store.isLogin = true;
        // app.$router.back();
        this.setData({
          loading: false,
        });
      }
    },
    onHide() {},
    onUnload() {},
    onPullDownRefresh() {},
    onReachBottom() {},
    onPageScroll(e) {},
  },
  false
);
