/*
 * @Author: yukang 1172248038@qq.com
 * @Description:全局变量
 * @Date: 2021-01-05 21:27:27
 * @LastEditTime: 2021-01-17 11:25:09
 */
const globalData = {
  isLogin: false,
  token: "",
  baseURL: "http://47.101.210.167:9999/",
  fileUpload: "service/common/fileUpload",
  user: {
    isLecturer: 0,
    userInfo: {
      nickName: "Hi,游客",
      avatar: "/static/icons/mine_author_login.png",
    },
    userWallets: {},
  },
  other: {
    searchData: "",
  },
};

module.exports = {
  globalData,
};
