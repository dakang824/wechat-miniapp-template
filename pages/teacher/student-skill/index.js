/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2021-01-09 17:44:24
 * @LastEditTime: 2021-02-19 15:19:45
 */
import { Router, app } from "../../page";
Router({
  data: {
    prof: [],
    keyWorld: "",
    activeNames: ["1"],
    selectKey: "", //选中的节点id
    dataTree: [
      {
        id: 1,
        name: "一级A",
        children: [
          {
            id: 23,
            name: "二级A-a",
            children: [
              {
                id: 98,
                name: "三级A-a-1",
              },
            ],
          },
          {
            id: 20,
            name: "二级A-b",
          },
        ],
      },
      {
        id: 2,
        name: "一级B",
        children: [
          {
            id: 21,
            name: "二级B-a",
          },
        ],
      },
    ],
    postData: {
      prof_id: "",
      user_name: "",
      skill_name: "",
      user_id: "",
    },
  },
  onChange(event) {
    console.log(event);
    this.setData({
      activeNames: event.detail,
    });
  },
  handleSelect(e) {
    if (e.detail.tips) {
      console.log("必须选择到最后一个节点");
    } else {
      this.setData({
        selectKey: e.detail.item.id,
      });
    }
  },
  async onLoad(options) {
    const val = Object.keys(app.$store.other).length
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
    this.setData({ list });
  },
  handleJump(e) {
    app.$store.other = e.currentTarget.dataset;
    app.$router.nav(`/pages/teacher/student-skill-detail/index`);
  },
  handleChange(e) {
    this.getData(e.detail);
  },
  onUnload() {
    app.$store.other = {};
  },
  onShow() {},
});
