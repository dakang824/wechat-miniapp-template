/*
 * @Author: yukang 1172248038@qq.com
 * @Description:程序入口
 * @Date: 2021-01-05 21:27:27
 * @LastEditTime: 2021-02-24 21:39:43
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
  async onLaunch(e) {
    wx.hideTabBar();
    wx.removeStorageSync("store");
    promisifyAll(); // 初始化所有wx.api为promise结构;
    init(globalData).then((store) => {
      this.$store = store;
    });
  },
  async onHide() {
    const { scene } = await wx.getLaunchOptionsSync()
    let { useInfo } = this.$utils.deepClone(this.$store)
    console.log(useInfo)
    useInfo.systemInfo = await wx.getSystemInfo()
    useInfo.scene = scene
    useInfo.appEndTime = new Date().getTime()
    useInfo.userId = this.$store.user.userInfo.id
    useInfo.pages = JSON.stringify(useInfo.pages)
    useInfo.systemInfo = JSON.stringify(useInfo.systemInfo)
    //上传浏览信息
    await this.$api.addPageViewRecord(useInfo);
  },
});
