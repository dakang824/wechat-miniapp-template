/*
 * @Author: yukang 1172248038@qq.com
 * @Description:程序入口
 * @Date: 2021-01-05 21:27:27
 * @LastEditTime: 2021-01-06 20:39:23
 */
//app.js
import { init } from "./store/store";
import Router from "./config/router/router";
import { globalData } from "./store/globalData";
import { promisifyAll } from "wx-promise-pro";

App({
  $router: new Router(),
  async onLaunch() {
    promisifyAll();
    let vm = this;
    //初始化，全局监听
    const res = await init(globalData).then((store) => {
      vm.$store = store;
      if (!store.isLogin) {
        this.$router.toLogin();
        return;
      }
    });
  },
});
