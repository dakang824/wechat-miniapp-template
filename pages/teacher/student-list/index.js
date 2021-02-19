/*
 * @Author: yukang 1172248038@qq.com
 * @Description:学生列表
 * @Date: 2021-01-06 18:00:03
 * @LastEditTime: 2021-02-19 12:11:06
 */
const { CityList } = require("../../../utils/city.js");

import { Router, app } from "../../page";
Router({
  data: {
    listData: [],
    searchValue: "",
    emptyShow: false,
    topSize: 100,
  },
  formatList(list) {
    let tempArr = [];

    [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      "M",
      "N",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "W",
      "X",
      "Y",
      "Z",
    ].forEach((initial) => {
      let tempObj = {};

      tempObj.key = initial;
      tempObj.data = list
        .filter((item) => item.initial == initial)
        .map((item) => {
          return {
            name: item.city,
            code: item.code,
            short: item.short,
          };
        });

      if (tempObj.data && tempObj.data.length > 0) {
        tempArr.push(tempObj);
      }
    });

    return tempArr;
  },
  onSearch(e) {
    console.log(e);
    let value = e.detail;
    this.setData({
      searchValue: value,
    });
    let cityList = CityList.filter(
      (item) => item.city.indexOf(value) > -1 || item.short.indexOf(value) > -1
    );
    this.setList(this.formatList(cityList));
  },
  onCancel() {
    this.setData({
      searchValue: "",
    });

    this.setList(this.formatList(CityList));
  },
  setList(listData) {
    let emptyShow = listData.length == 0 ? true : false;

    this.setData({
      listData: listData,
      emptyShow: emptyShow,
    });
  },
  itemClick(e) {
    app.$router.nav(
      `/pages/teacher/student-skill/index?user_id=${e.detail.user_id}&user_name=${e.detail.user_name}`
    );
  },
  async onLoad() {
    wx.hideHomeButton();
    // 模拟异步获取数据场景

    const {
      data: {
        userList: { list },
      },
    } = await app.$api.findUsers({});
    console.log(list);
    const arr = list.map((item) => ({
      id: item.id,
      provincecode: "150000",
      city: item.name,
      code: item.prof_group.name,
      initial: "A",
      short: "Alashanmeng",
    }));

    this.setList(this.formatList(arr));
  },
  onShow() {},
});
