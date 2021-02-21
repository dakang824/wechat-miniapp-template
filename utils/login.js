/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2021-02-21 12:25:04
 * @LastEditTime: 2021-02-21 12:33:17
 */
module.exports = async function () {
  const app = getApp();
  const { code } = await wx.pro.login();
  const {
    code: resCode,
    data: { sys_id, userinfo = {} },
  } = await app.$api.wxLogin({
    code,
  });

  if (resCode === 5) {
    app.$store.sys_id = sys_id;
    app.$router.toLogin();
  } else if (resCode === 200) {
    app.$store.user.userInfo = userinfo;
    app.$store.isLogin = true;
    if (app.$store.user.userInfo.roles === 1) {
      app.$router.toHome();
      return;
    }
  }
};
