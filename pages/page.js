/*
 * @Author: yukang 1172248038@qq.com
 * @Description:封装全局页面
 * @Date: 2021-01-05 21:27:27
 * @LastEditTime: 2021-01-09 21:22:05
 */
const app = getApp();
import {
  bindLoginBeforeFunc,
  bindDataFunc,
  bindToLoginBeforeFunc,
} from "./page.utils";
import $utils from "../utils/index";
import * as $api from "../api/index";
app.$utils = $utils;
app.$api = $api;
/**
 * 路由拦截器
 */
const Router = (pageObj, share = true) => {
  //需要登录的接口
  pageObj.needLogin = pageObj.needLogin || [];
  //需要跳转到登录的接口
  pageObj.needToLogin = pageObj.needToLogin || [];
  //需要绑定的store字段
  pageObj.bindData = pageObj.bindData || [];

  //需登录方法前置监听
  bindLoginBeforeFunc(pageObj, pageObj.needLogin, this, app);

  //需跳转到登录的方法前置监听
  bindToLoginBeforeFunc(pageObj, pageObj.needToLogin, this, app);

  //常用参数和配置信息
  if (pageObj.onShow) {
    let _page = pageObj.onShow;
    pageObj.onShow = function () {
      app.$router.setRouter();

      //公共参数
      this.setData({
        isLogin: app.$store.isLogin,
        $themeColor: "#1cbc9a",
      });

      //额外参数
      bindDataFunc(pageObj.bindData, this, app.$store);
      _page.call(this);
    };
  }

  //转发-默认打开，判断转发触发主体
  //全局转发监听，因需求不同，需个人定义
  if (share) {
    pageObj.onShareAppMessage = function (res) {};
    let _page = pageObj.onShareAppMessage;
    pageObj.onShareAppMessage = function (res) {
      //判断是否通过点击按钮分享
      if (res.from === "button") {
        //返回分享对象
        return {};
      } else return initShare;
      _page.call(this);
    };
  } else {
  }

  return Page(pageObj);
};

module.exports = {
  Router,
  app,
};
