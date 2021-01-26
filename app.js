/*
 * @Author: yukang 1172248038@qq.com
 * @Description:程序入口
 * @Date: 2021-01-05 21:27:27
 * @LastEditTime: 2021-01-26 16:46:50
 */
import { init } from "./store/store";
import Router from "./config/router/router";
import { globalData } from "./store/globalData";
import { promisifyAll } from "wx-promise-pro";
import $utils from "./utils/index";
import * as $api from "./api/index";

App({
  $store: wx.getStorageSync("store") || globalData,
  $router: new Router(),
  $api,
  $utils,
  async onLaunch() {
    promisifyAll(); // 初始化所有wx.api为promise结构;
    await init(globalData).then((store) => {
      this.$store = store;
    });
  },
});
