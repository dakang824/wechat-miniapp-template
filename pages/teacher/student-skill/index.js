/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2021-01-09 17:44:24
 * @LastEditTime: 2021-02-19 17:26:26
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

    dataTree: [
      // {
      //   id: 1,
      //   name: "一级A",
      //   children: [
      //     {
      //       id: 23,
      //       name: "二级A-a",
      //       children: [
      //         {
      //           id: 98,
      //           name: "三级A-a-1",
      //         },
      //       ],
      //     },
      //     {
      //       id: 20,
      //       name: "二级A-b",
      //     },
      //   ],
      // },
    ],
    selectKey: "", //选中的节点id
  },
  async onLoad(options) {
    const other = Object.keys(app.$store.other).length;

    const val =
      other &&
      wx.setNavigationBarTitle({
        title: app.$store.other.name,
      })
        ? app.$store.other
        : app.$store.user.userInfo;

    const { prof_group_id: group_id, name, id } = val;
    const {
      data: { profs },
    } = await app.$api.getMyProfession({ group_id });
    const prof = profs.map((item) => ({ text: item.name, value: item.id }));
    this.setData({
      prof,
      postData: {
        user_name: name,
        skill_name: "",
        user_id: id,
        prof_id: prof[0].value,
      },
    });
    this.getData(prof[0].value);
  },
  async getData(prof_id) {
    const {
      data: {
        SkilTree: { list },
      },
    } = await app.$api.querySkillTreeScore({
      ...this.data.postData,
      prof_id,
    });
    this.setData({
      dataTree: this.processingData(list),
      roles: app.$store.user.userInfo.roles,
    });
  },
  processingData(data) {
    return data.map((item) => {
      item.label = item.name;
      item.downSkillTree.length ? (item.children = item.downSkillTree) : "";
      this.processingData(item.downSkillTree);

      return item;
    });
  },
  handleJump(e) {
    app.$store.other = e.currentTarget.dataset;
    app.$router.nav(`/pages/teacher/student-skill-detail/index`);
  },
  handleChange(e) {
    this.getData(e.detail);
  },
  async handlePass(e) {
    const { id } = e.currentTarget.dataset.i;
    const { data } = await app.$api.auditSkillTreeScore({
      score_id: id,
      res: 1,
    });
  },
  async handleNoPass(e) {
    const { id } = e.currentTarget.dataset.i;
    const { data } = await app.$api.auditSkillTreeScore({
      score_id: id,
      res: 2,
    });
  },
  onUnload() {
    app.$store.other = {};
  },
  onShow() {},
});
