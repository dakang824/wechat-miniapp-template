/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2021-01-05 22:43:08
 * @LastEditTime: 2021-03-10 23:39:36
 */
import { Router, app } from "../../page";
Router({
  data: {
    active: 0,
    navs: [],

    scroll: {
      empty: {
        img: "/assets/image/empty/empty_data.png",
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
  onShow() {
    wx.showTabBar();
  },
  async fetchDataNavs() {
    const { prof_group_id: group_id } = app.$store.user.userInfo;
    const {
      data: { profs: navs },
    } = await app.$api.getAllProfession();
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
  async fetchData(e) {
    const { navs, active } = this.data,
      { queryData, list: currentList } = navs[active];

    this.setData({
      [`navs[${active}].requesting`]: true,
    });

    queryData.prof_id = navs[active].id;

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
      [`navs[${active}].show`]: false,
      [`navs[${active}].active`]: navs[active].active || 0,
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
  handleChangeProfs(e = { detail: { index: 0 } }) {
    const { active, navs } = this.data;

    this.setData({
      [`navs[${active}].active`]: e.detail.index,
    });

    const module = this.data.navs[active].modules[
      e.detail.index === 0 ? e.detail.index : navs[active].active
    ];

    this.setData({
      [`navs[${active}].queryData.module_id`]: module ? module.id : "",
    });
    this.handleRefresh();
  },
  handleChange(e) {
    this.setData({
      active: e.detail.index,
    });

    const { navs, active } = this.data;

    if (navs[active].list.length === 0) {
      this.handleChangeProfs();
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
  handleClick(e) {
    console.log(e);
    const { navs, active } = this.data;
    this.setData({
      [`navs[${active}].show`]: !navs[active].show,
    });
  },
  handleTabsChange(e) {
    const { i } = e.currentTarget.dataset;
    this.handleChangeProfs({ detail: { index: i } });
  },
});
