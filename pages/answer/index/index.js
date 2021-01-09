/*
 * @Author: yukang 1172248038@qq.com
 * @Description:做题
 * @Date: 2021-01-08 18:19:16
 * @LastEditTime: 2021-01-08 23:53:06
 */
import { Router, app } from "../../page";
Router({
  data: {
    list: [],
    end: false,
    active: 0,
    total: 0,
  },

  onLoad(options) {
    this.setData({
      params: JSON.parse(options.params),
    });
    this.fetchData();
  },
  async fetchData() {
    const { end, params } = this.data,
      { api, ...rest } = params;
    if (!end) {
      const {
        data: {
          ques: { list, total },
        },
      } = await app.$api[api](rest);
      for (const item of list) {
        const {
          data: { collect },
        } = await app.$api.checkHasCollectQues({
          que_id: item.id,
        });
        item.collect = collect;
        item.result = null;
        item.res = [];
      }

      this.setData({
        list: [...this.data.list, ...list],
        end: list.length !== params.page_size,
        [`params.page_no`]: params.page_no + 1,
        total,
      });
    } else {
      app.$utils.Notify({ type: "danger", message: "试题已加载全部" });
    }
  },
  handleSelect(e) {
    const { i, ind } = e.currentTarget.dataset,
      { list } = this.data;

    // 单选和判断
    if (
      list[ind].result === null &&
      (list[ind].type === 1 || list[ind].type === 3)
    ) {
      const index = list[ind].queOptions.findIndex((item) => item.id === i.id);
      this.setData({
        [`list[${ind}].result`]: i.value,
      });
      const right = list[ind].queOptions.find((item) => item.rig);

      app.$api.commitQueResult({
        que_id: list[ind].id,
        result: i.value & right.value ? 1 : 0,
      });
    } else {
      //多选
      const index = list[ind].queOptions.findIndex((item) => item.id === i.id);
      if (!list[ind].res.includes(i.name)) {
        const res = [...list[ind].res, i.name];
        this.setData({
          [`list[${ind}].res`]: res,
        });
      } else {
        const index = list[ind].res.findIndex((item) => item === i.name);
        list[ind].res.splice(index, 1);
        this.setData({
          [`list[${ind}].res`]: list[ind].res,
        });
      }
    }
  },
  handleMultipleChoice(e) {
    const { ind } = e.currentTarget.dataset,
      { list } = this.data;

    const result = list[ind].res.reduce((a, b) => {
      return a + b;
    }, 0);
    console.log(result);
    this.setData({
      [`list[${ind}].result`]: result,
    });
  },
  handleChange(e) {
    this.setData({ active: e.detail.index });
  },
  async handleCollect(e) {
    const arr = e.currentTarget.dataset.i.split("_");
    const { list } = this.data;
    await app.$api.collectQues({
      que_id: arr[1],
      status: list[arr[0]].collect ? 0 : 1,
    });
    this.setData({
      [`list[${arr[0]}].collect`]: !list[arr[0]].collect,
    });
  },
  onShow() {},

  onUnload() {},
});
