/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2021-01-09 17:44:24
 * @LastEditTime: 2021-01-09 21:01:22
 */
import { Router, app } from "../../page";
Router({
  data: {
    option1: [
      { text: "全部商品", value: 0 },
      { text: "新款商品", value: 1 },
      { text: "活动商品", value: 2 },
    ],
    value: 0,
    keyWorld: "",
    activeNames: ["1"],
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  onLoad(options) {},
  onShow() {},
});
