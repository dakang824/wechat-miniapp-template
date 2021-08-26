/*
 * @Author: yukang 1172248038@qq.com
 * @Description:工具集
 * @Date: 2021-01-05 23:57:55
 * @LastEditTime: 2021-02-24 20:15:54
 */
import Notify from "../miniprogram_npm/@vant/weapp/notify/notify";
import Toast from "../miniprogram_npm/@vant/weapp/toast/toast";
import Dialog from "../miniprogram_npm/@vant/weapp/dialog/dialog";
import dayjs from "dayjs";
import sha1 from "sha1";
import Login from "./login";
import QRCode from "./weapp-qrcode";
import deepClone from "./deep-clone";
module.exports = {
  Dialog,
  Notify,
  Toast,
  dayjs,
  QRCode,
  sha1,
  Login,
  deepClone
};
