/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2021-01-05 22:43:08
 * @LastEditTime: 2021-01-07 00:12:50
 */
import { Router, app } from "../../page";
Router({
  data: {
    active: 0,
    navs: [],

    scroll: {
      empty: {
        img: "http://coolui.coolwl.cn/assets/mescroll-empty.png",
      },
      refresh: {
        type: "default",
        style: "black",
        background: "#000",
      },
      loadmore: {
        type: "default",
        icon:
          "http://upload-images.jianshu.io/upload_images/5726812-95bd7570a25bd4ee.gif",
        background: "#f2f2f2",
        title: {
          show: true,
          text: "加载中",
          color: "#999",
          shadow: 5,
        },
      },
    },
  },
  async onLoad() {
    await this.fetchDataNavs();
    await this.fetchData();
  },
  async fetchDataNavs() {
    const {
      data: { navs },
    } = await app.$api.getAllArtNav();
    this.setData({
      navs: navs.map((item) => {
        item.list = [];
        item.requesting = false;
        item.queryData = {
          prof_id: app.$store.user.userInfo.prof_group_id,
          nav_id: "",
          cate1: 1,
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
  async fetchData(e) {
    const { navs, active } = this.data,
      { queryData, list: currentList } = navs[active];

    this.setData({
      [`navs[${active}].requesting`]: true,
    });

    queryData.nav_id = navs[active].id;

    const {
        data: {
          articles: { list, total: length },
        },
      } = await app.$api.findArticle(queryData),
      limit = list.length,
      end = limit === queryData.page_size;

    this.setData({
      [`navs[${active}].list`]: [...currentList, ...list],
      [`navs[${active}].queryData.page_no`]: queryData.page_no + 1,
      [`navs[${active}].scroll.pagination`]: {
        page: queryData.page_no + 1,
        totalPage: length / queryData.page_size,
        limit,
        length,
      },
    });

    if (e && end) {
      const select = `.scroll_${e.currentTarget.dataset.ind}`;
      this.selectComponent(select).loadEnd();
    }
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
        [`navs[${active}].queryData.page_no`]: 1,
      },
      () => {
        this.fetchData();
      }
    );
  },
});
