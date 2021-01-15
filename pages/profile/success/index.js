/*
 * @Author: yukang 1172248038@qq.com
 * @Description:我的成绩
 * @Date: 2021-01-09 17:44:24
 * @LastEditTime: 2021-01-15 20:01:39
 */
import { Router, app } from "../../page";
Router({
  data: {
    list: [
      {
        name: "理论",
        data: [],
        status: "loadmore", //loadmore 加载更多,loading 加载中,nomore 没有更多
      },
      {
        name: "实操",
        data: [],
        status: "loadmore",
      },
    ],
    current: 0,
    postData: {
      type: 1,
      pageNo: 1,
      pageSize: 10,
    },
  },

  onLoad(options) {
    this.fetchData();
  },
  onChange(e) {
    this.setData({
      "postData.type": e.detail.index + 1,
      current: e.detail.index,
    });
  },
  async reset() {
    const { postData, current } = this.data;
    this.setData({
      [`list[${current}].data`]: [],
      [`list[${current}].status`]: "loadmore",
      "postData.pageNo": 1,
    });
  },
  async onPullDownRefresh() {
    await this.reset();
    await this.fetchData();
    wx.stopPullDownRefresh();
  },
  onReachBottom() {
    const { postData, list, current } = this.data;
    if (list[current].status !== "nomore") {
      this.fetchData();
    }
  },
  async fetchData() {
    const { postData, list: d, current } = this.data;
    this.setData({
      [`list[${current}].status`]: "loading",
    });

    const {
      data: {
        userScores: { list },
      },
    } = await app.$api.findMyScore(postData);

    this.setData({
      [`list[${current}].data`]: [...d[current].data, ...list],
      "postData.pageNo": postData.pageNo + 1,
      [`list[${current}].status`]:
        postData.pageSize !== list.length ? "nomore" : "loadmore",
    });
  },

  onShow() {},
});
