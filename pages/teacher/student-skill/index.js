/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2021-01-09 17:44:24
 * @LastEditTime: 2021-02-04 14:10:09
 */
import { Router, app } from "../../page";
Router({
  data: {
    prof: [],
    keyWorld: "",
    activeNames: ["1"],
    postData: {
      prof_id: "",
      user_name: "",
      skill_name: "",
      user_id: "",
    },
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  async onLoad(options) {
    const { prof_group_id: group_id } = app.$store.user.userInfo;
    const {
      data: { profs },
    } = await app.$api.getMyProfession({ group_id });
    const prof = profs.map((item) => ({ text: item.name, value: item.id }));

    this.setData({
      prof,
      "postData.prof_id": prof[0].value,
    });
  },
  handleChange(e) {
    console.log(e.detail);
  },
  onShow() {},
});
