/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2021-01-05 22:43:08
 * @LastEditTime: 2021-01-07 23:35:08
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
  handleChangeProfs(e) {
    const { active } = this.data;
    // this.setData({
    //   [`navs[${active}].queryData.prof_id`]: this.data.navs[active].modules[
    //     e.detail.index
    //   ].id,
    // });
    // this.handleRefresh();
  },
  handleChange(e) {
    const { index } = e.detail;
    const { navs, active } = this.data;

    this.setData({
      active: index,
    });

    if (navs[active].list.length === 0) {
      this.handleRefresh();
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
