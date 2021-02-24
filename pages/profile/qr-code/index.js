/*
 * @Author: yukang 1172248038@qq.com
 * @Description:我的二维码
 * @Date: 2021-01-09 17:44:24
 * @LastEditTime: 2021-02-24 21:20:45
 */
import { Router, app } from "../../page";
Router({
  data: {
    qr_path: "",
    qrcode_w: "",
  },

  onLoad() {
    const W = wx.getSystemInfoSync().windowWidth;
    const rate = 750.0 / W;
    const qrcode_w = 334 / rate;
    this.setData({ qrcode_w });
    const { prof_group_id, name, id } = app.$store.user.userInfo;

    new app.$utils.QRCode("myQrcode", {
      text: JSON.stringify({ prof_group_id, name, id }),
      padding: 12,
      width: qrcode_w,
      height: qrcode_w,
      colorDark: "#1cbc9a",
      colorLight: "white",
      correctLevel: app.$utils.QRCode.CorrectLevel.H,
      callback: async (res) => {
        this.setData({ qr_path: res.path });
      },
    });
  },
  onShow() {},
  handleClick() {
    wx.previewImage({
      urls: [this.data.qr_path],
    });
  },
});
