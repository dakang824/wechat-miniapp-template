/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2021-01-09 19:21:29
 * @LastEditTime: 2021-01-09 20:34:48
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
  },
  data: {
    src: "https://cdn.uviewui.com/uview/example/fade.jpg",
  },
  methods: {
    handleClick() {
      this.triggerEvent("click", this.data.type);
    },
    handleJump() {
      console.log(1);
    },
  },
});
