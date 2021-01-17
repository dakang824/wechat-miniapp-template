/*
 * @Author: yukang 1172248038@qq.com
 * @Description: 修改个人信息
 * @Date: 2021-01-09 19:57:31
 * @LastEditTime: 2021-01-17 12:26:39
 */
import { Router, app } from "../../../page";
Router({
  data: {
    value: "",
    maxlength: 300,
    form: [],
    fileList: [],
  },
  onLoad(options) {
    let { type } = options,
      info = app.$store.other,
      { baseURL } = app.globalData,
      form;
    this.setData({
      info,
      ...options,
    });
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
    }
    const fileList = [{ url: baseURL + info.icon }];
    this.setData({
      fileList,
      form: form.map((item) => {
        "required" in item ? "" : (item.required = true);
        return item;
      }),
    });
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
  onShow() {},
});
