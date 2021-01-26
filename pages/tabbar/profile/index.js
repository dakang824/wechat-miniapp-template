/*
 * @Author: yukang 1172248038@qq.com
 * @Description:个人中心
 * @Date: 2021-01-05 22:40:10
 * @LastEditTime: 2021-01-17 16:17:01
 */
import {
  Router,
  app
} from "../../page";
Router({
    data: {
      list: [{
          name: "我的收藏",
          url: "/pages/profile/collect/index"
        },
        {
          name: "我的成绩",
          url: "/pages/profile/success/index"
        },
        {
          name: "我的档案",
          url: "/pages/profile/files/index"
        },
        {
          name: "我的技能",
          url: "/pages/profile/skill/index"
        },
        {
          name: "我的二维码",
          url: "/pages/profile/qr-code/index"
        },
        {
          name: "意见反馈",
          url: "/pages/profile/opinion/index"
        },
      ],
    },
    onLoad(options) {},
    onShow() {
      this.setData({
        userInfo: app.$store.user.userInfo,
      });
    },
    handleLoginOut() {
      app.$store.isLogin = false;
      app.$store.other = {};
      app.$store.user.userInfo = {};
      app.$router.toLogin();
    },
  },
  false
);