/*
 * @Author: yukang 1172248038@qq.com
 * @Description:用户登录
 * @Date: 2021-01-05 21:27:27
 * @LastEditTime: 2021-01-06 19:36:58
 */
import { Router, app } from "../page";
Router(
  {
    data: {
      account: "",
      pwd: "",
      password: true,
      loading: false,
    },
    onShow() {
      wx.hideHomeButton();
    },
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
      const { account, pwd } = this.data;
      if (this._checkData()) {
        this.setData({
          loading: true,
        });
        const { code } = await wx.pro.login();
        const {
          code: resCode,
          data: { sys_id, userinfo = {} },
        } = await app.$api.wxLogin({ code });

        if (resCode === 5) {
          const {
            data: { userinfo },
          } = await app.$api.bindAccount({ account, pwd, sys_id });
          app.$store.user.userInfo = userinfo;
        } else if (resCode === 200) {
          app.$store.user.userInfo = userinfo;
        }

        app.$store.isLogin = true;

        app.$router.toHome();
        this.setData({
          loading: false,
        });
      }
    },
  },
  false
);
