/*
 * @Author: yukang 1172248038@qq.com
 * @Description:意见反馈
 * @Date: 2021-01-09 17:44:24
 * @LastEditTime: 2021-02-25 20:33:16
 */
import { Router, app } from "../../page";
Router(
  {
    data: {
      value: "",
    },
    onLoad(options) {},
    onShow() {},
    handleInputChange(e) {
      this.setData({
        value: e.detail.value,
      });
    },
    async bindSubmit() {
      await app.$api.addFeedBack({ content: this.data.value });
      app.$utils.Dialog.alert({
        title: "提交成功",
        message: "感谢您的宝贵意见,我们会及时处理",
      }).then(() => {
        app.$router.back();
      });
    },
  },
  false
);
