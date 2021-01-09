import { Router, app } from "../../../page";
Router({
  data: {
    value: "",
    maxlength: 300,
  },
  onLoad(options) {},
  handleChange(e) {
    this.setData({
      value: e.detail.value,
    });
  },
  onShow() {},
});
