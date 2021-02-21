/*
 * @Author: yukang 1172248038@qq.com
 * @Description:学生列表
 * @Date: 2021-01-06 18:00:03
 * @LastEditTime: 2021-02-21 10:18:54
 */
// const { CityList } = require("../../../utils/city.js");

import { Router, app } from "../../page";
Router({
  data: {
    listData: [],
    searchValue: "",
    emptyShow: false,
    topSize: 100,
    list: [],
    show:false
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
            ...item,
          };
        });

      if (tempObj.data && tempObj.data.length > 0) {
        tempArr.push(tempObj);
      }
    });

    return tempArr;
  },
  onSearch(e) {
    let value = e.detail;
    this.setData({
      searchValue: value,
    });

    this.getData({ name: e.detail });
  },
  async onClick() {
    const { result, errMsg } = await wx.pro.scanCode();
    if ("scanCode:ok" === errMsg) {
      console.log(result);
    }
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
    app.$store.other = e.detail.item;
    app.$router.nav(`/pages/teacher/student-skill/index`);
  },
  onLoad() {
    wx.hideHomeButton();
    this.getData();
  },

  async getData(postData = {}) {
    const {
      data: {
        userList: { list },
      },
    } = await app.$api.findUsers(postData);
    const arr = this.formatList(
      list.map((item) => {
        return {
          id: item.id,
          provincecode: item.id,
          city: item.name,
          code: item.prof_group.name,
          initial: item.pinyin
            ? item.pinyin.slice(0, 1).toLocaleUpperCase()
            : "",
          short: item.company.name,
          item,
        };
      })
    );
    this.setData({ list: arr,show:true });
    this.setList(arr);
  },
  onShow() {
  const isStudent= this.data.isLogin&&app.$store.user.userInfo.roles===1
   this.setData({show:!isStudent})
   if(isStudent){
     app.$router.toHome();
   }
  },
});
