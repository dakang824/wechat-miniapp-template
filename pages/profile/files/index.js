/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2021-01-09 17:44:24
 * @LastEditTime: 2021-01-17 10:20:18
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
  handleAddInfo(e) {
    if (e.detail === 1) {
      app.$store.other = this.data.resume;
      app.$router.nav(`/pages/profile/files/edit-info/index?type=${e.detail}`);
    }
  },
  async fetchData() {
    const {
      data: { resume },
    } = await app.$api.findMyResume({});
    this.setData({ resume, info: [{ intro: resume.summary }] });
  },
  handleAddProject() {},
  onShow() {},
});
