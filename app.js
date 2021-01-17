/*
 * @Author: yukang 1172248038@qq.com
 * @Description:程序入口
 * @Date: 2021-01-05 21:27:27
 * @LastEditTime: 2021-01-09 23:11:46
 */
//app.js
import { init } from "./store/store";
import Router from "./config/router/router";
import { globalData } from "./store/globalData";
import { promisifyAll } from "wx-promise-pro";
import $utils from "./utils/index";
import * as $api from "./api/index";

App({
  $router: new Router(),
  $api,
  $utils,
  globalData,
  async onLaunch() {
    promisifyAll();
    //初始化，全局监听
    const res = await init(globalData).then((store) => {
      this.$store = store;
    });
  },
});
