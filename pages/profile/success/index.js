/*
 * @Author: yukang 1172248038@qq.com
 * @Description:我的成绩
 * @Date: 2021-01-09 17:44:24
 * @LastEditTime: 2021-01-16 15:14:44
 */
import { Router, app } from "../../page";
Router({
  data: {
    list: [
      {
        name: "理论",
        data: [],
        status: "loadmore", //loadmore 加载更多,loading 加载中,nomore 没有更多
        postData: {
          type: 1,
          pageNo: 1,
          pageSize: 10,
        },
      },
      {
        name: "实操",
        data: [],
        status: "loadmore",
        postData: {
          type: 2,
          pageNo: 1,
          pageSize: 10,
        },
      },
    ],
    current: 0,
  },

  onLoad(options) {
    this.fetchData();
  },
  onReady() { },
  onHide() { },
  onUnload() { },
  onChange(e) {
    this.setData({
      current: e.detail.index,
    });
    if (!this.data.list[e.detail.index].data.length) {
      this.fetchData();
    }
  },
  async reset() {
    const { current } = this.data;
    this.setData({
      [`list[${current}].data`]: [],
      [`list[${current}].status`]: "loadmore",
      [`list[${current}].postData.pageNo`]: 1,
    });
  },
  async onPullDownRefresh() {
    await this.reset();
    await this.fetchData();
    wx.stopPullDownRefresh();
  },
  onReachBottom() {
    const { list, current } = this.data;
    if (list[current].status !== "nomore") {
      this.fetchData();
    }
  },
  async fetchData() {
    const { list: d, current } = this.data,
      { postData } = d[current];
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
      [`list[${current}].postData.pageNo`]: postData.pageNo + 1,
      [`list[${current}].status`]:
        postData.pageSize !== list.length ? "nomore" : "loadmore",
    });
  },

  onShow() { },
});
