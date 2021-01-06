/*
 * @Author: yukang 1172248038@qq.com
 * @Description:程序入口
 * @Date: 2021-01-05 21:27:27
 * @LastEditTime: 2021-01-06 19:33:12
 */
//app.js
import { init } from "./store/store";
import Router from "./config/router/router";
import { globalData } from "./store/globalData";
import { promisifyAll } from "wx-promise-pro";

App({
  $router: new Router(),
  onLaunch: function () {
    promisifyAll();
    let vm = this;
    //初始化，全局监听
    init(globalData).then((store) => {
      vm.$store = store;
      console.log(store);
      if (!store.isLogin) {
        this.$router.toLogin();
        return;
      }
    });
  },
});
