/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2021-01-09 14:41:05
 * @LastEditTime: 2021-02-24 22:26:48
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
        } = this.data;
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
