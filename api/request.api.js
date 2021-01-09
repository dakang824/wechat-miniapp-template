/*
 * @Author: yukang 1172248038@qq.com
 * @Description:
 * @Date: 2021-01-05 21:27:27
 * @LastEditTime: 2021-01-09 21:56:27
 */
import Api from "../config/axios/request";
import { globalData } from "../store/globalData";

let api = Api();
let request = api.create({
  url: globalData.baseURL, //默认的接口后缀
  method: "get", //默认的HTTP 请求方法
  dataType: "json", //默认的返回类型
  responseType: "text",
  header: {
    "content-type": "application/x-www-form-urlencoded",
  },
});

request.interceptors.request.use(
  function (config) {
    const {
      user: { userInfo },
    } = wx.getStorageSync("store") || {};
    config.data && userInfo.id ? (config.data.ope_id = userInfo.id) : "";

    //返回的是和wx.request相关的参数
    console.log(config);
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: "加载内容",
      mask: true,
    });
    return config;
  },
  function (error) {
    console.log(error);
    return error;
  }
);

request.interceptors.response.use(
  function (config) {
    // console.log(config);
    wx.hideLoading();
    wx.hideNavigationBarLoading();
    return config.data || config;
  },
  function (error) {
    return error;
  }
);

export default request;
