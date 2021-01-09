/*
 * @Author: yukang 1172248038@qq.com
 * @Description:我的成绩
 * @Date: 2021-01-09 17:44:24
 * @LastEditTime: 2021-01-09 19:02:02
 */
import { Router, app } from "../../page";
Router({
  data: {
    list: [
      {
        name: "理论",
      },
      {
        name: "实操",
      },
    ],
    current: 0,
  },

  onLoad(options) {},

  onShow() {},
});
