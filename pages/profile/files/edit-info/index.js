/*
 * @Author: yukang 1172248038@qq.com
 * @Description: 修改个人信息
 * @Date: 2021-01-09 19:57:31
 * @LastEditTime: 2021-01-17 13:22:13
 */
import { Router, app } from "../../../page";
Router({
  data: {
    value: "",
    show: false,
    maxlength: 300,
    form: [],
    fileList: [],
  },
  onLoad(options) {
    let { type } = options,
      info = app.$store.other,
      { baseURL } = app.globalData;

    this.setData({
      info,
      ...options,
    });
    const form = this.initData(type);
    const fileList = [{ url: baseURL + info.icon }];
    this.setData({
      fileList,
      form: form.map((item) => {
        "required" in item ? "" : (item.required = true);
        return item;
      }),
    });
  },
  initData(type) {
    let info = app.$store.other,
      form;
    if (type == 1) {
      form = [
        {
          type: "text",
          value: "name",
          title: "简历名称",
          val: info.name,
        },
        {
          type: "text",
          value: "department",
          title: "部门",
          val: info.department,
        },
        {
          type: "text",
          value: "position",
          title: "职位",
          val: info.position,
        },
        {
          type: "textarea",
          value: "summary",
          title: "个人介绍",
          val: info.summary,
        },
        {
          type: "icon",
          value: "icon",
          title: "简历头像",
          maxCount: 1,
        },
      ];
    } else if (type == 2) {
      const current = info.projects[this.data.index] || {
        resume_id: "",
        roles: "",
        name: "",
        start_time: "",
        end_time: "",
        intro: "",
        perfor: "",
      };
      form = [
        {
          type: "text",
          value: "name",
          title: "项目名称",
          val: current.name,
        },
        {
          type: "text",
          value: "roles",
          title: "角色",
          val: current.roles,
        },
        {
          type: "calendar",
          value: "start_time",
          title: "时间范围",
          val: current.time,
        },
        {
          type: "textarea",
          value: "intro",
          title: "项目描述",
          val: current.intro,
        },
        {
          type: "textarea",
          value: "perfor",
          title: "项目业绩",
          val: current.perfor,
        },
      ];
    }
    return form;
  },
  updateImgs(e) {
    this.setData({ fileList: e.detail });
  },
  handleInputChange(e) {
    this.setData({
      [`form[${e.currentTarget.dataset.ind}].val`]: e.detail,
    });
  },
  async handleSave() {
    const { type, form, fileList, info } = this.data,
      pages = getCurrentPages(),
      prepage = pages[pages.length - 2];
    const val = form.reduce((a, b) => {
        a[b.value] = b.val;
        return a;
      }, {}),
      { baseURL } = app.globalData,
      imgs = fileList.map((item) => item.url.slice(baseURL.length));
    if (type == 1) {
      const res = await app.$api.modifyMyResume({
        ...val,
        icon: imgs[0],
        id: info.id,
      });
    }
    await prepage.fetchData();
    app.$router.back();
  },
  handleChange(e) {
    this.setData({
      value: e.detail.value,
    });
  },
  onConfirm(e) {
    console.log(e);
  },

  onDisplay() {
    this.setData({ show: !this.data.show });
  },
  onShow() {},
});
