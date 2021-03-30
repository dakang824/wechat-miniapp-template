/*
 * @Author: yukang 1172248038@qq.com
 * @Description:用户登录
 * @Date: 2021-01-05 21:27:27
 * @LastEditTime: 2021-03-30 21:56:39
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
        app.$utils.Notify({
          type: "danger",
          message: "请输入姓名",
        });
        return false;
      } else if (pwd === "") {
        app.$utils.Notify({
          type: "danger",
          message: "请输入工号",
        });
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

        const {
          data: { userinfo },
          code,
          msg,
        } = await app.$api.bindAccount({
          account,
          pwd: app.$utils.sha1(pwd),
          sys_id: app.$store.sys_id,
        });

        if (code === 0) {
          app.$utils.Dialog.alert({
            title: "温馨提示",
            message: msg,
          }).then(() => {
            this.setData({
              loading: false,
            });
          });
          return;
        }
        app.$store.user.userInfo = userinfo;

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
