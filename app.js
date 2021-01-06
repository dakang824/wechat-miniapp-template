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
    });
  },
});
