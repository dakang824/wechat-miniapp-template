/*
 * @Author: yukang 1172248038@qq.com
 * @Description: 修改个人信息
 * @Date: 2021-01-09 19:57:31
 * @LastEditTime: 2021-01-17 15:59:05
 */
import { Router, app } from "../../../page";
Router({
  data: {
    ind: 0,
    value: "",
    index: null,
    show: false,
    maxlength: 300,
    minDate: new Date(2000, 0, 1).getTime(),
    currentDate: new Date().getTime(),
    maxDate: new Date().getTime(),
    form: [],
    fileList: [],
  },
  onLoad(options) {
    let { type, index = null } = options,
      info = app.$store.other,
      { baseURL } = app.globalData;

    this.setData({
      info,
      ...options,
    });
    const form = this.initData(type),
      uploader = form.find((item) => item.type === "icon"),
      key =
        type == 4 ? "certs" : type == 5 ? "honors" : type == 6 ? "thesis" : "";
    const fileList = uploader
      ? type == 1
        ? [{ url: baseURL + info.icon }]
        : (type == 4 || type == 5 || type == 6) && index !== null
        ? [
            {
              url: baseURL + info[key][index].pic_path,
            },
          ]
        : ""
      : [];

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
          type: "time",
          value: "start_time",
          title: "开始时间",
          val: current.start_time,
        },
        {
          type: "time",
          value: "end_time",
          title: "结束时间",
          val: current.end_time,
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
    } else if (type == 3) {
      const current = info.edus[this.data.index] || {
        resume_id: "",
        roles: "",
        name: "",
        start_time: "",
        end_time: "",
        perfor: "",
      };
      form = [
        {
          type: "text",
          value: "name",
          title: "学校名称",
          val: current.name,
        },
        {
          type: "text",
          value: "roles",
          title: "角色",
          val: current.roles,
        },
        {
          type: "time",
          value: "start_time",
          title: "开始时间",
          val: current.start_time,
        },
        {
          type: "time",
          value: "end_time",
          title: "结束时间",
          val: current.end_time,
        },
        {
          type: "textarea",
          value: "perfor",
          title: "荣誉成绩",
          val: current.perfor,
        },
      ];
    } else if (type == 4) {
      const current = info.certs[this.data.index] || {
        resume_id: "",
        name: "",
        time: "",
        pic_path: "",
      };
      form = [
        {
          type: "text",
          value: "name",
          title: "学校名称",
          val: current.name,
        },
        {
          type: "time",
          value: "time",
          title: "获取时间",
          val: current.time,
        },
        {
          type: "icon",
          value: "pic_path",
          title: "上传图片",
          val: current.pic_path,
          maxCount: 1,
        },
      ];
    } else if (type == 5) {
      const current = info.honors[this.data.index] || {
        resume_id: "",
        name: "",
        pic_path: "",
      };
      form = [
        {
          type: "text",
          value: "name",
          title: "证书名称",
          val: current.name,
        },
        {
          type: "icon",
          value: "pic_path",
          title: "上传图片",
          val: current.pic_path,
          maxCount: 1,
        },
      ];
    } else if (type == 6) {
      const current = info.thesis[this.data.index] || {
        resume_id: "",
        name: "",
        pic_path: "",
      };
      form = [
        {
          type: "text",
          value: "name",
          title: "证书名称",
          val: current.name,
        },
        {
          type: "icon",
          value: "pic_path",
          title: "上传图片",
          val: current.pic_path,
          maxCount: 1,
        },
      ];
    }
    return form;
  },
  updateImgs(e) {
    const { baseURL } = app.globalData,
      val = JSON.parse(JSON.stringify(e.detail)).map((item) =>
        item.url.slice(baseURL.length)
      );
    this.setData({
      fileList: e.detail,
      [`form[${e.currentTarget.dataset.ind}].val`]: val.join(","),
    });
  },
  handleInputChange(e) {
    this.setData({
      [`form[${e.currentTarget.dataset.ind}].val`]: e.detail,
    });
  },
  handleDelect() {
    const { type, info, index, title } = this.data,
      pages = getCurrentPages(),
      prepage = pages[pages.length - 2];
    app.$utils.Dialog.confirm({
      title: "温馨提示",
      message: `确定是否删除该${title}?`,
    })
      .then(async () => {
        if (type == 2) {
          //删除项目经历
          await app.$api.deleteResumeProject({ id: info.projects[index].id });
        } else if (type == 3) {
          //删除教育经历
          await app.$api.deleteResumeEdu({ edu_id: info.edus[index].id });
        } else if (type == 4) {
          //删除资格证书
          await app.$api.deleteResumeCert({ cert_id: info.certs[index].id });
        } else if (type == 5) {
          //删除荣誉证书
          await app.$api.deleteResumeHonor({ honor_id: info.honors[index].id });
        } else if (type == 6) {
          //删除论文
          await app.$api.deleteResumeThesis({
            thesis_id: info.thesis[index].id,
          });
        }

        await prepage.fetchData();
        app.$router.back();
      })
      .catch(() => {});
  },
  async handleSave() {
    const { type, form, fileList, info, index } = this.data,
      pages = getCurrentPages(),
      prepage = pages[pages.length - 2];
    const val = form.reduce((a, b) => {
      a[b.value] = b.val;
      if (b.required && b.val === "") {
        app.$utils.Notify({ type: "danger", message: `${b.title}不能为空` });
        return false;
      }
      return a;
    }, {});
    if (type == 1) {
      //修改个人基本信息
      const res = await app.$api.modifyMyResume({
        ...val,
        id: info.id,
      });
    } else if (type == 2) {
      //添加或修改项目经历
      const res = await app.$api[
        index !== null ? "modifyResumeProject" : "addResumeProject"
      ]({
        ...val,
        resume_id: info.id,
        id: index && info.projects[index].id,
      });
    } else if (type == 3) {
      //添加或修改教育经历
      const res = await app.$api[
        index !== null ? "modifyResumeEdu" : "addResumeEdu"
      ]({
        ...val,
        resume_id: info.id,
        edu_id: index && info.edus[index].id,
      });
    } else if (type == 4) {
      //添加或修改资格证书
      const res = await app.$api[
        index !== null ? "modifyResumeCert" : "addResumeCert"
      ]({
        ...val,
        resume_id: info.id,
        cert_id: index && info.certs[index].id,
      });
    } else if (type == 5) {
      //添加或修改资格证书
      const res = await app.$api[
        index !== null ? "modifyResumeHonor" : "addResumeHonor"
      ]({
        ...val,
        resume_id: info.id,
        honor_id: index && info.honors[index].id,
      });
    } else if (type == 6) {
      //添加或修改论文
      const res = await app.$api[
        index !== null ? "modifyResumeThesis" : "addResumeThesis"
      ]({
        ...val,
        resume_id: info.id,
        thesis_id: index && info.thesis[index].id,
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
    this.setData({
      [`form[${this.data.ind}].val`]: app.$utils
        .dayjs(e.detail)
        .format("YYYY-MM-DD"),
      show: false,
    });
  },

  onDisplay(e) {
    this.setData({ show: !this.data.show, ind: e.currentTarget.dataset.ind });
  },
  onShow() {},
});
