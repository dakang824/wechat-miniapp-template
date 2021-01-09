/*
 * @Author: yukang 1172248038@qq.com
 * @Description:个人中心
 * @Date: 2021-01-05 22:40:10
 * @LastEditTime: 2021-01-09 17:45:02
 */
import { Router, app } from "../../page";
Router(
  {
    data: {
      list: [
        { name: "我的收藏", url: "/pages/profile/collect/index" },
        { name: "我的成绩", url: "/pages/profile/success/index" },
        { name: "我的档案", url: "/pages/profile/files/index" },
        { name: "我的技能", url: "/pages/profile/skill/index" },
        { name: "我的二维码", url: "/pages/profile/qr-code/index" },
        { name: "意见反馈", url: "/pages/profile/opinion/index" },
      ],
    },
    onLoad(options) {},
    onShow() {},
    handleLoginOut() {
      app.$store.isLogin = false;
      app.$store.user.userInfo = {};
      app.$router.toLogin();
    },
  },
  false
);
