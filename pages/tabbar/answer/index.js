/*
 * @Author: yukang 1172248038@qq.com
 * @Description:答题
 * @Date: 2021-01-05 22:40:10
 * @LastEditTime: 2021-02-04 15:56:47
 */
import { Router, app } from "../../page";
Router({
  data: {
    active: 0,
    activeKey: 0,
    navs: [],
    list: [
      {
        name: "顺序练习",
        icon: "/assets/image/answer_order.png",
        width: "44rpx",
        height: "44rpx",
        api: "getQuesByOrder",
      },
      {
        name: "随机练习",
        icon: "/assets/image/answer_random.png",
        width: "55rpx",
        height: "44rpx",
        api: "getQuesByRand",
      },
      {
        name: "自测练习",
        icon: "/assets/image/answer_test.png",
        width: "45rpx",
        height: "45rpx",
        api: "getZiCeQues",
      },
      {
        name: "错题本",
        icon: "/assets/image/answer_wrong_book.png",
        width: "40rpx",
        height: "44rpx",
        api: "getMyWrongQues",
      },
      {
        name: "收藏",
        icon: "/assets/image/answer_collection.png",
        width: "48rpx",
        height: "44rpx",
        api: "getMyCollectQues",
      },
      {
        name: "模拟考",
        icon: "/assets/image/answer_mock_examination.png",
        width: "44rpx",
        height: "44rpx",
        api: "getTests",
      },
    ],
  },

  async onLoad(options) {
    await this.fetchDataNavs();
  },
  onShow() {
    wx.showTabBar();
  },
  async fetchDataNavs() {
    const { prof_group_id: group_id } = app.$store.user.userInfo;
    const {
      data: { profs: navs },
    } = await app.$api.getMyProfession({
      group_id,
    });
    this.setData({
      navs,
    });
  },
  handleClick(e) {
    const current = this.data.list[e.currentTarget.dataset.ind],
      { active, navs, activeKey } = this.data;
    const params = JSON.stringify({
      prof_id: 1 || navs[active].id,
      module_id: navs[active].modules[activeKey].id,
      page_no: 1,
      page_size: 30,
      api: current.api,
      company_id: app.$store.user.userInfo.comp_id,
    });

    app.$router.nav(
      `/pages/answer/${
        current.api === "getZiCeQues" ? "form" : "index"
      }/index?params=`,
      params
    );
  },
  handleChange(e) {
    const { index } = e.detail;
    this.setData({
      active: index,
      activeKey: 0,
    });
  },
  onChange(e) {
    this.setData({
      activeKey: e.detail,
    });
  },
});
