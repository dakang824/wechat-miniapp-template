/*
 * @Author: yukang 1172248038@qq.com
 * @Description:用户登录
 * @Date: 2021-01-05 21:27:27
 * @LastEditTime: 2021-02-02 15:40:40
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
    onLoad() {
      wx.hideHomeButton();
    },
    onShow() {},
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
        (app.$store.user.userInfo.roles === 1 && app.$router.toHome()) ||
          app.$router.redirect(`/pages/teacher/student-list/index`);

        this.setData({
          loading: false,
        });
      }
    },
  },
  false
);
