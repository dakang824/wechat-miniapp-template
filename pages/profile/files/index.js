/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2021-01-09 17:44:24
 * @LastEditTime: 2021-01-17 15:52:14
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
  handleAddProject() {
    this.goJump(2, `title=项目经历`);
  },
  handleUpdateProject(e) {
    this.goJump(2, `index=${e.detail}&title=项目经历`);
  },
  handleAddEdus() {
    this.goJump(3, `title=教育经历`);
  },
  handleUpdateEdus(e) {
    this.goJump(3, `index=${e.detail}&title=教育经历`);
  },
  handleAddResumeCert() {
    this.goJump(4, `title=资格证书`);
  },
  handleUpdateResumeCert(e) {
    this.goJump(4, `index=${e.detail}&title=资格证书`);
  },
  handleAddResumeHonor() {
    this.goJump(5, `title=荣誉证书`);
  },
  handleUpdateResumeHonor(e) {
    this.goJump(5, `index=${e.detail}&title=荣誉证书`);
  },
  handleAddResumeThesis() {
    this.goJump(6, `title=发布论文`);
  },
  handleUpdateResumeThesis(e) {
    this.goJump(6, `index=${e.detail}&title=发布论文`);
  },
  onShow() {},
});
