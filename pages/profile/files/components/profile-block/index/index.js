/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2021-01-09 19:21:29
 * @LastEditTime: 2021-03-30 22:42:27
 */
import { Comp, app } from "../../../../../../components/component";

Comp({
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    showJump: {
      type: Boolean,
      value: true,
    },
    icon: {
      type: String,
      value: "edit",
    },
    type: {
      type: Number,
      value: 1,
    },
    title: {
      type: String,
      value: "",
    },
    mode: {
      type: Object,
      value: {},
    },
  },
  data: {
    src: "https://cdn.uviewui.com/uview/example/fade.jpg",
  },
  methods: {
    handlePreviewImage(e) {
      wx.previewImage({
        urls: [e.currentTarget.dataset.src],
      });
    },
    handleClick() {
      this.triggerEvent("click");
    },
    handleJump(e) {
      this.triggerEvent("update", e.currentTarget.dataset.i);
    },
  },
});
