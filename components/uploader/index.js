/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2021-01-06 15:08:29
 * @LastEditTime: 2021-01-26 16:42:29
 */
import { Comp, app } from "../component";

Comp({
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    fileList: {
      type: Array,
      value: [],
    },
    maxCount: {
      type: Number,
      value: 9,
    },
  },

  data: {},
  methods: {
    async afterRead(event) {
      const { file } = event.detail,
        { baseURL, fileUpload } = app.$store;
      const { data } = await wx.pro.uploadFile({
        url: `${baseURL + fileUpload}`,
        filePath: file.url,
        name: "file",
      });
      const {
          data: { tempUrl },
        } = JSON.parse(data),
        fileList = [...this.data.fileList, { url: baseURL + tempUrl }];

      this.setData({
        fileList,
      });
      this.triggerEvent("updateImgs", fileList);
    },
    handleDeleteImg(e) {
      const { fileList } = this.data;
      fileList.splice(e.detail.index, 1);
      this.setData({ fileList });
      this.triggerEvent("updateImgs", fileList);
    },
  },
});
