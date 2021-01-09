import { Router, app } from "../../page";
Router({
  data: {},
  onLoad(options) {},
  handleAddInfo(e) {
    if (e.detail === 1) {
      app.$router.nav("/pages/profile/files/edit-info/index");
    }
  },
  handleAddProject() {},
  onShow() {},
});
