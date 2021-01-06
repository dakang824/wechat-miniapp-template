//app.js
import { init } from "./store/store";
import Router from "./config/router/router";
import { globalData } from "./store/globalData";
import { promisifyAll, promisify } from "wx-promise-pro";
import $utils from "utils/index";

App({
  $router: new Router(),
  onLaunch: function () {
    promisifyAll();

    let vm = this;
    //初始化，全局监听
    init(globalData).then((store) => {
      vm.$store = store;
      wx.$utils = $utils;
    });
  },
});
