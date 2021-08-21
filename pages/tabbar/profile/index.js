/*
 * @Author: yukang 1172248038@qq.com
 * @Description:个人中心
 * @Date: 2021-01-05 22:40:10
 * @LastEditTime: 2021-03-08 22:43:58
 */
import { Router, app } from "../../page";
Router(
  {
    data: {
      show: false,
      list: [
        {
          name: "我的收藏",
          url: "/pages/profile/collect/index",
        },
        {
          name: "我的成绩",
          url: "/pages/profile/success/index",
        },
        {
          name: "我的档案",
          url: "/pages/profile/files/index",
        },
        {
          name: "我的技能",
          url: "/pages/teacher/student-skill/index",
        },
        {
          name: "我的二维码",
          url: "/pages/profile/qr-code/index",
        },
        {
          name: "意见反馈",
          url: "/pages/profile/opinion/index",
        },
      ],
    },
    async onLoad(options) { },
    onReady() { },
    onHide() { },
    onUnload() { },
    onShow() {
      this.setData({
        userInfo: app.$store.user.userInfo,
      });
      wx.showTabBar();
    },
    handleGetUserInfo() {
      if (!("avatarUrl" in this.data.userInfo)) {
        this.setData({
          show: true,
        });
      }
    },
    getUserInfo(e) {
      app.$store.user.userInfo = {
        ...app.$store.user.userInfo,
        ...e.detail.userInfo,
      };
      this.onShow();
    },
    handleLoginOut() {
      app.$store.isLogin = false;
      app.$store.other = {};
      app.$store.user.userInfo = {};
      app.$router.toLogin();
    },
    async onPullDownRefresh() {
      await app.$utils.Login(true);
      wx.stopPullDownRefresh();
    },
  },
  false
);
