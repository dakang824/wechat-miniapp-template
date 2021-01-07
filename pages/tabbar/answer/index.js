/*
 * @Author: yukang 1172248038@qq.com
 * @Description:答题
 * @Date: 2021-01-05 22:40:10
 * @LastEditTime: 2021-01-08 00:15:04
 */
import { Router, app } from "../../page";
Router({
  data: {
    active: 0,
    activeKey: 0,
  },

  async onLoad(options) {
    await this.fetchDataNavs();
  },
  async fetchDataNavs() {
    const { prof_group_id: group_id } = app.$store.user.userInfo;
    const {
      data: { profs: navs },
    } = await app.$api.getMyProfession({ group_id });
    this.setData({
      navs: navs.map((item) => {
        item.list = [];
        item.queryData = {
          prof_id: "",
          // nav_id: "",
          cate1: 2,
          page_no: 1,
          page_size: 10,
        };
        item.scroll = {
          pagination: {},
          ...this.data.scroll,
        };
        return item;
      }),
    });
  },
  handleChange(e) {
    const { index } = e.detail;
    this.setData({
      active: index,
    });
  },
  onChange(e) {
    this.setData({
      activeKey: e.detail,
    });
  },
});
