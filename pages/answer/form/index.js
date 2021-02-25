/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2021-01-09 14:41:05
 * @LastEditTime: 2021-02-25 22:27:28
 */
import { Router, app } from "../../page";
Router(
  {
    data: {
      judge_count: "",
      radio_count: "",
      check_count: "",
      radio_score: "",
      judge_score: "",
      check_score: "",

      time: "",
    },
    onLoad(options) {
      this.setData({
        params: JSON.parse(options.params),
      });
    },
    _checkData() {
      const { judge_count, radio_count, check_count, time } = this.data;
      if (
        judge_count === "" ||
        radio_count === "" ||
        check_count === "" ||
        time === ""
      ) {
        app.$utils.Notify({ type: "danger", message: "请完善数据" });
        return false;
      }
      return true;
    },
    handleClick() {
      if (this._checkData()) {
        const {
          judge_count,
          radio_count,
          check_count,
          radio_score,
          judge_score,
          check_score,
          time,
        } = this.data;

        const r = /^\+?[1-9][0-9]*$/; //正整数判断
        const res = [
          { name: "判断题数量", val: judge_count },
          { name: "判断题分值", val: judge_score },
          { name: "单选题数量", val: radio_count },
          { name: "单选题分值", val: radio_score },
          { name: "多选题数量", val: check_count },
          { name: "多选题分值", val: check_score },
          { name: "考试时间", val: time },
        ];

        for (const item of res) {
          if (!r.test(item.val)) {
            app.$utils.Dialog.alert({
              title: "输入验证",
              message: `${item.name}:请输入正整数`,
            }).then(() => {});
            return;
          }
        }

        const total =
          judge_count * judge_score +
          radio_count * radio_score +
          check_count * check_score;
        if (total > 100) {
          app.$utils.Dialog.confirm({
            title: "温馨提示",
            message: "题目总分不可以大于100。",
            confirmButtonText: "下一步",
            cancelButtonText: "去修改",
          })
            .then(() => {
              this.jumpPage();
            })
            .catch(() => {
              // on cancel
            });
          return;
        }

        this.jumpPage();
      }
    },
    jumpPage() {
      const {
        params,
        judge_count,
        radio_count,
        check_count,
        time,
        radio_score,
        judge_score,
        check_score,
      } = this.data;
      app.$router.redirect(
        `/pages/answer/index/index?params=`,
        JSON.stringify({
          ...params,
          judge_count,
          radio_count,
          check_count,
          time,

          tests: {
            radio_score,
            judge_score,
            check_score,
          },
        })
      );
    },
    onShow() {},
    onHide() {},
  },
  false
);
