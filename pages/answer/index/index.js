/*
 * @Author: yukang 1172248038@qq.com
 * @Description:做题
 * @Date: 2021-01-08 18:19:16
 * @LastEditTime: 2021-01-15 00:09:22
 */
import { Router, app } from "../../page";
Router(
  {
    data: {
      list: [],
      end: false,
      active: 0,
      total: 0,
      copyList: [],
      time: null,
      timeData: {},
      doTime: null,
      swiperCurrent: 0,
    },

    onLoad(options) {
      const params = JSON.parse(options.params);
      this.setData({
        params,
        time: params.time ? params.time * 60 * 1000 : null,
      });

      this.fetchData();
    },
    onShow() {},
    async fetchData() {
      const { end, params } = this.data,
        { api, ...rest } = params;
      if (!end) {
        if (api === "getZiCeQues") {
          const {
            data: { check_ques, radio_ques, judge_ques },
          } = await app.$api[api](rest);
          const list = [...check_ques, ...radio_ques, ...judge_ques];
          this.handlingData(list, list.length);
          this.setData({
            [`params.page_size`]: list.length,
          });
        } else if (api === "getTests") {
          const { code, msg, data } = await app.$api[api](rest);
          if (code === 5) {
            app.$utils.Dialog.alert({
              title: "温馨提示",
              message: msg,
            }).then(() => {
              app.$router.back();
            });
          } else {
            const list = data.ques.map((item) => item.que);
            this.handlingData(list, list.length);
            this.setData({
              code: data.code,
              tests: data.tests,
              time: data.tests.time * 60 * 1000,
            });
          }
        } else {
          const {
            data: {
              ques: { list, total },
            },
          } = await app.$api[api](rest);
          this.handlingData(list, total);
        }
      } else {
        app.$utils.Notify({ type: "danger", message: "试题已加载全部" });
      }
    },
    handleSwiperChange(e) {
      this.setData({
        swiperCurrent: e.detail.current,
      });
    },
    timeFinish(e) {
      app.$utils.Dialog.alert({
        title: "温馨提示",
        message: "考试已结束,终止答题",
      }).then(() => {
        app.$router.back();
      });
    },
    timeChange(e) {
      this.setData({
        timeData: e.detail,
      });
    },
    bindanimationfinish(e) {
      const { current } = e.detail;
      const { list, total, params } = this.data;
      if (params.page_size - current === 2 && list.length !== total) {
        this.fetchData();
      }
    },
    handleMultipleChoice(e) {
      let { ind } = e.currentTarget.dataset,
        { list } = this.data,
        right = 0;

      const key_val = list[ind].queOptions.reduce((a, b) => {
        a[b.name] = b.value;
        right += b.rig ? b.value : 0;
        return a;
      }, {});

      const result = list[ind].res.reduce((a, b) => {
        return a + key_val[b];
      }, 0);

      this.setData({
        [`list[${ind}].result`]: result,
      });

      this.sendResult({ ind, right: result === right });
    },
    async sendResult({ ind, right }) {
      const { params, code, tests, timeData, doTime, time, list } = this.data;
      let score = null,
        t = 0,
        api = "commitQueResult";

      if (params.api === "getTests") {
        const {
          radio_score,
          radio_count,
          judge_count,
          judge_score,
          check_score,
          check_count,
        } = tests;
        score =
          list[ind].type === 1
            ? radio_score / radio_count
            : list[ind].type === 2
            ? check_score / check_count
            : judge_score / judge_count;
        api = "commitTestQueResult";
        const nowDate = timeData.minutes * 60 + timeData.seconds;
        t = (doTime || time / 1000) - nowDate;
        this.setData({
          doTime: nowDate,
        });
      }

      await app.$api[api]({
        test_id: tests.id,
        code,
        score: right ? score : 0,
        time: t,
        que_id: list[ind].id,
        result: right ? 1 : 0,
      });

      if (params.api === "getTests" && ind === list.length - 1) {
        const {
          data: {
            score: { right_count, wrong_count, score },
          },
        } = await app.$api.getTestScoreResult({
          test_id: tests.id,
          code,
        });
        app.$utils.Dialog.alert({
          title: "得分结果",
          message: `正确:${right_count}个,\n错误:${wrong_count}个,\n得分:${score}分,\n正确率:${(
            right_count / list.length
          ).toFixed(2)}%`,
        }).then(() => {
          app.$router.back();
        });
      }
    },
    handleSelect(e) {
      const { i, ind } = e.currentTarget.dataset,
        { list, active } = this.data;

      // 判断是否已经做过改题
      if (list[ind].result !== null || active) {
        return;
      }

      // 单选和判断
      if (list[ind].type === 1 || list[ind].type === 3) {
        const index = list[ind].queOptions.findIndex(
          (item) => item.id === i.id
        );
        this.setData({
          [`list[${ind}].result`]: i.value,
        });
        let right = list[ind].queOptions.find((item) => item.rig);
        // 提交选择结果
        this.sendResult({ ind, right: i.value & right.value });
      } else {
        //多选
        const index = list[ind].queOptions.findIndex(
          (item) => item.id === i.id
        );
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
    handleChange(e) {
      this.setData({ active: e.detail.index });
    },
    async handlingData(list, total) {
      const { params } = this.data;
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
    onUnload() {},
  },
  false
);
