/*
 * @Author: yukang 1172248038@qq.com
 * @Description:我的二维码
 * @Date: 2021-01-09 17:44:24
 * @LastEditTime: 2021-01-16 15:19:39
 */
import { Router, app } from "../../page";
Router({
  data: {
    img: "",
  },

  onLoad(options) {
    this.fetchData();
  },
  onShow() {},
  async fetchData() {
    const {
      data: {
        userScores: { list },
      },
    } = await app.$api.findMyQRCode();

    this.setData({});
  },
});
