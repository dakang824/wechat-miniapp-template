/*
 * @Author: yukang 1172248038@qq.com
 * @Description:文章详情
 * @Date: 2021-01-09 17:44:24
 * @LastEditTime: 2021-01-16 16:24:28
 */
import { Router, app } from "../../page";
Router({
  data: {
    id: "",
    collect: false,
  },

  onLoad(options) {
    this.setData(options);
    this.fetchData();
  },
  onShow() {},
  async fetchData() {
    const {
      data: { article, collect },
    } = await app.$api.getArticleDetail({ id: this.data.id });

    this.setData({ article, collect });
  },
  async handleCollect() {
    const { collect } = this.data;
    const res = await app.$api.collectArticle({
      id: this.data.id,
      status: collect ? 0 : 1,
    });
    this.setData({ collect: !collect });
  },
});
