/*
 * @Author: yukang 1172248038@qq.com
 * @Description:我的档案头部
 * @Date: 2021-01-09 19:14:02
 * @LastEditTime: 2021-03-30 22:47:29
 */
import { Comp, app } from "../../../../../../components/component";

Comp({
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  data: {},
  properties: {
    mode: {
      type: Object,
      value: {},
    },
  },
  methods: {
    handleJump(e) {
      this.triggerEvent("click");
    },
  },
});
