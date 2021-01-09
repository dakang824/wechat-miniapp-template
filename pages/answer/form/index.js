/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2021-01-09 14:41:05
 * @LastEditTime: 2021-01-09 16:39:10
 */
import { Router, app } from "../../page";
Router(
  {
    data: {
      judge_count: "",
      radio_count: "",
      check_count: "",
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
          params,
          judge_count,
          radio_count,
          check_count,
          time,
        } = this.data;
        const total = judge_count * 1 + radio_count * 1 + check_count * 1;
        if (total > 100) {
          app.$utils.Notify({
            type: "danger",
            message: "题目总数不能超过100个。",
          });
          return;
        }
        app.$router.redirect(
          `/pages/answer/index/index?params=`,
          JSON.stringify({
            ...params,
            judge_count,
            radio_count,
            check_count,
            time,
          })
        );
      }
    },
    onShow() {},
    onHide() {},
  },
  false
);
