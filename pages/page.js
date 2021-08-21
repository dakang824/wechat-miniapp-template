/*
 * @Author: yukang 1172248038@qq.com
 * @Description:封装全局页面
 * @Date: 2021-01-05 21:27:27
 * @LastEditTime: 2021-02-24 23:41:35
 */
const app = getApp();
import {
  bindLoginBeforeFunc,
  bindDataFunc,
  bindToLoginBeforeFunc,
} from "./page.utils";
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

  //程序一打开就判断用户是否登录
  if (pageObj.onLoad) {
    let _page = pageObj.onLoad;
    pageObj.onLoad = async function (options) {
      try {
        // 判断登录逻辑
        if (!app.$store.isLogin) {
          await app.$utils.Login();
        } else if (
          //判断用户为老师只能访问老师页面
          app.$store.user.userInfo.roles === 2 &&
          !app.$router.last.includes("teacher")
        ) {
          app.$router.redirect(`/pages/teacher/student-list/index`);
        }
      } catch (err) {
        console.log(err);
      } finally {
        _page.call(this, options);
      }
    };
  }

  // 页面已经准备好
  if (pageObj.onReady) {
    let _page = pageObj.onReady;
    pageObj.onReady = function () {
      const {
        route,
        __displayReporter: {
          showReferpagepath,
          pageReadyTime: startTime
        }
      } = this

      const obj = {
        route,
        showReferpagepath,
        startTime
      }

      if (route === 'pages/home/detail/index') {
        obj.article_id = this.options.id
      }

      app.$store.useInfo.pages.push(obj)
      console.log('收集用户数据', app.$store.useInfo)
      _page.call(this);
    }
  }

  // 页面隐藏
  if (pageObj.onHide) {
    let _page = pageObj.onHide;
    pageObj.onHide = function () {
      const currPage = app.$store.useInfo.pages.find(item => item.route === this.route)
      currPage.endTime = new Date().getTime()
      _page.call(this);
    }
  }

  // 页面销毁
  if (pageObj.onUnload) {
    let _page = pageObj.onUnload;
    pageObj.onUnload = function () {
      const currPage = app.$store.useInfo.pages.find(item => item.route === this.route && !item.endTime)
      currPage.endTime = new Date().getTime()
      _page.call(this);
    }
  }


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
    pageObj.onShareAppMessage = function (res) { };
    let _page = pageObj.onShareAppMessage;
    pageObj.onShareAppMessage = function (res) {
      //判断是否通过点击按钮分享
      if (res.from === "button") {
        //返回分享对象
        return {};
      } else return initShare;
      _page.call(this);
    };
  } else { }

  return Page(pageObj);
};

module.exports = {
  Router,
  app,
};