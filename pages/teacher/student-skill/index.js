/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2021-01-09 17:44:24
 * @LastEditTime: 2021-02-24 23:29:31
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
    } = await app.$api.getMyProfessionForSkill({
      user_id: id,
      group_id,
    });
    const prof = profs.map((item) => ({
      text: `${item.name}（完成度${item.finish_rate}%）`,
      value: item.id,
    }));

    this.setData({
      prof,
      professionsKeyVal: prof.reduce((a, b) => {
        a[b.value] = b.text.split("（")[0];
        return a;
      }, {}),
      postData: {
        user_name: name,
        skill_name: "",
        user_id: id,
        prof_id: prof[0].value,
      },
    });
    this.getData(prof[0].value);
  },
  processingData(data) {
    return data.map((item) => {
      item.label = item.name;
      item.downSkillTree.length && (item.children = item.downSkillTree);
      this.processingData(item.downSkillTree);
      return item;
    });
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

    const data = this.processingData(list);
    const map = data.reduce((a, b) => {
      const prof_name = this.data.professionsKeyVal[b.prof_id];
      a[prof_name] = a[prof_name] || [];
      a[prof_name].push(b);
      return a;
    }, {});

    const result = Object.values(map).map((item) => {
      return {
        name: this.data.professionsKeyVal[item[0].prof_id],
        children: item,
        id: 1,
        prof_id: item[0].prof_id,
      };
    });

    this.setData({
      currentIndex: prof_id,
      dataTree: result,
      roles: app.$store.user.userInfo.roles,
    });
  },

  handleJump(e) {
    app.$store.other = e.currentTarget.dataset;
    app.$router.nav(`/pages/teacher/student-skill-detail/index`);
  },
  handleChange(e) {
    this.setData({
      currentIndex: e.detail,
    });
    this.getData(e.detail);
  },
  onSearch(e) {
    this.setData({
      "postData.skill_name": e.detail,
    });
    this.getData(this.data.currentIndex);
  },
  onClear() {
    this.setData({
      "postData.skill_name": "",
    });
    this.getData(this.data.currentIndex);
  },
  async handlePass(e) {
    const { score } = e.detail;
    if (!score.length) {
      app.$utils.Notify({
        type: "danger",
        message: "无score数据",
      });
      return;
    }
    const { data } = await app.$api.auditSkillTreeScore({
      score_id: score[0].id,
      res: 1,
    });
    this.getData(this.data.currentIndex);
  },
  async handleNoPass(e) {
    const { score } = e.currentTarget.dataset.i;
    if (!score.length) {
      app.$utils.Notify({
        type: "danger",
        message: "无score数据",
      });
      return;
    }
    const { data } = await app.$api.auditSkillTreeScore({
      score_id: score[0].id,
      res: 2,
    });
    this.getData(this.data.currentIndex);
  },
  onUnload() {
    app.$store.other = {};
  },
  onShow() {},
});
