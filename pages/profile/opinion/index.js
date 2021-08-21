/*
 * @Author: yukang 1172248038@qq.com
 * @Description:意见反馈
 * @Date: 2021-01-09 17:44:24
 * @LastEditTime: 2021-02-28 21:31:50
 */
import { Router, app } from "../../page";
Router(
  {
    data: {
      value: "",
    },
    onLoad(options) { },
    onShow() { },
    onReady() { },
    onHide() { },
    onUnload() { },
    handleInputChange(e) {
      this.setData({
        value: e.detail.value,
      });
    },
    async bindSubmit() {
      const { value: content } = this.data;
      if (content === "") {
        app.$utils.Notify({
          type: "danger",
          message: "请输入您的意见反馈",
        });
        return;
      }
      await app.$api.addFeedBack({ content });
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
