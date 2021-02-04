/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2021-01-06 15:08:29
 * @LastEditTime: 2021-02-04 21:24:34
 */
import { Comp, app } from "../component";

Comp({
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    status: {
      type: String,
      value: "loadmore",
    },
    length: {
      type: Number,
      value: 5,
    },
    loadmore: {
      type: String,
      value: "用力往上拉",
    },
    loading: {
      type: String,
      value: "正在加载中,请喝杯茶...",
    },
    nomore: {
      type: String,
      value: "我是有底线的",
    },
  },
  data: {},
  methods: {},
});
