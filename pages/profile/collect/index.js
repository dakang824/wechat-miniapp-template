/*
 * @Author: yukang 1172248038@qq.com
 * @Description:我的收藏
 * @Date: 2021-01-09 17:44:24
 * @LastEditTime: 2021-01-17 08:44:30
 */
import { Router, app } from "../../page";
Router({
  data: {
    list: [],
    status: "loadmore", //loadmore 加载更多,loading 加载中,nomore 没有更多
    postData: {
      pageNo: 1,
      pageSize: 10,
    },
  },

  onLoad(options) {
    this.fetchData();
  },
  onReady() { },
  onUnload() { },
  onHide() { },
  async reset() {
    this.setData({
      list: [],
      status: "loadmore",
      "postData.pageNo": 1,
    });
  },
  async onPullDownRefresh() {
    await this.reset();
    await this.fetchData();
    wx.stopPullDownRefresh();
  },
  onReachBottom() {
    const { status } = this.data;
    if (status !== "nomore") {
      this.fetchData();
    }
  },
  async fetchData() {
    const { postData, list: d } = this.data;
    this.setData({
      status: "loading",
    });

    const {
      data: {
        articleCollects: { list },
      },
    } = await app.$api.findMyCollectArticle(postData);

    this.setData({
      list: [...d, ...list],
      "postData.pageNo": postData.pageNo + 1,
      status: postData.pageSize !== list.length ? "nomore" : "loadmore",
    });
  },

  onShow() { },
});
