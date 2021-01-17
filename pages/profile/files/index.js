/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2021-01-09 17:44:24
 * @LastEditTime: 2021-01-17 13:10:01
 */
import { Router, app } from "../../page";
Router({
  data: {
    info: [],
    resume: {},
  },
  onLoad(options) {
    this.fetchData();
  },
  async fetchData() {
    const {
      data: { resume },
    } = await app.$api.findMyResume({});
    this.setData({ resume, info: [{ intro: resume.summary }] });
  },
  goJump(type, str) {
    app.$store.other = this.data.resume;
    app.$router.nav(
      `/pages/profile/files/edit-info/index?type=${
        type + (str ? "&" + str : "")
      }`
    );
  },
  handleAddInfo(e) {
    this.goJump(1, "title=个人介绍");
  },
  handleAddProject(e) {
    this.goJump(2, `index=${e.detail}&title=项目经历`);
  },
  handleUpdateProject(e) {
    console.log(this.data.resume.projects[e.detail]);
  },
  onShow() {},
});
