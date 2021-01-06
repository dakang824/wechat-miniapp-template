/*
 * @Author: yukang 1172248038@qq.com
 * @Description:课件
 * @Date: 2021-01-05 22:39:26
 * @LastEditTime: 2021-01-06 17:18:51
 */
import { Router, app } from "../../page";
Router({
  data: {
    active: 0,
    navs: [],
  },
  async onLoad() {
    await this.getMyProfession();
    await this.fetchData();
  },
  async getMyProfession() {
    const {
      data: { profs },
    } = await app.$api.getMyProfession({ group_id: 1 });
    return this.setData({
      navs: profs.map((item) => {
        item.list = [];
        item.requesting = false;
        item.queryData = {
          ope_id: 1,
          prof_id: "",
          nav_id: "",
          cate1: 1,
          page_no: 1,
          page_size: 10,
        };
        return item;
      }),
    });
  },
  async fetchData() {
    const { navs, active } = this.data,
      { queryData, list: currentList } = navs[active];

    this.setData({
      [`navs[${active}].requesting`]: true,
    });

    queryData.nav_id = navs[active].id;

    const {
        data: {
          articles: { list },
        },
      } = await app.$api.findArticle(queryData),
      end = list.lenth === queryData.page_size;

    this.setData({
      [`navs[${active}].list`]: [...currentList, ...list],
      [`navs[${active}].requesting`]: false,
      [`navs[${active}].end`]: !end,
      [`navs[${active}].queryData.page_no`]: end
        ? queryData.page_no + 1
        : queryData.page_no,
    });
  },
  handleChange(e) {
    const { index } = e.detail;
    const { navs, active } = this.data;

    this.setData({
      active: index,
      "queryData.nav_id": this.data.navs[index].id,
    });

    if (navs[active].list.length === 0) {
      this.fetchData();
    }
  },
  handleRefresh() {
    const { active } = this.data;
    this.setData(
      {
        [`navs[${active}].list`]: [],
        [`navs[${active}].requesting`]: false,
        [`navs[${active}].end`]: false,
        [`navs[${active}].queryData.page_no`]: 1,
      },
      () => {
        this.fetchData();
      }
    );
  },
});
