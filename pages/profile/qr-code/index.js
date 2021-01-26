/*
 * @Author: yukang 1172248038@qq.com
 * @Description:我的二维码
 * @Date: 2021-01-09 17:44:24
 * @LastEditTime: 2021-01-26 16:42:54
 */
import { Router, app } from "../../page";
Router({
  data: {
    qr_path: "",
  },

  onLoad(options) {
    this.fetchData();
  },
  onShow() {},
  handleClick() {
    wx.previewImage({
      urls: [app.$store.baseURL + this.data.qr_path],
    });
  },
  async fetchData() {
    const {
      data: { qr_path },
    } = await app.$api.findMyQRCode({});
    this.setData({ qr_path });
  },
});
