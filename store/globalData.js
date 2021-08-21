/*
 * @Author: yukang 1172248038@qq.com
 * @Description:全局变量
 * @Date: 2021-01-05 21:27:27
 * @LastEditTime: 2021-02-19 14:12:46
 */
const globalData = {
  isLogin: false,
  token: "",
  baseURL: "https://shangsong.shquyi.net/",
  fileUpload: "service/common/fileUpload",
  useInfo: {
    pages: [],//用户操作页面信息
    systemInfo: {},//用户手机信息
    appStartTime: new Date().getTime(),//app开始时间
    appEndTime: 0,//app结束时间
    scene: null,//场景值
  },
  user: {
    isLecturer: 0,
    userInfo: {
      nickName: "Hi,游客",
      avatar: "/static/icons/mine_author_login.png",
    },
    userWallets: {},
  },
  other: {},
};

module.exports = {
  globalData,
};