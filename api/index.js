/*
 * @Author: yukang 1172248038@qq.com
 * @Description:全部接口
 * @Date: 2021-01-05 21:27:27
 * @LastEditTime: 2021-01-06 11:24:19
 */
import request from "./request.api";

export const wxLogin = (data) => {
  return request.post("service/front/wxLogin", data);
};

export const bindAccount = (data) => {
  return request.post("service/front/bindAccount", data);
};

export const getAllArtNav = (data) => {
  return request.post("service/front/getAllArtNav", data);
};

export const findArticle = (data) => {
  return request.post("service/front/findArticle", data);
};

export const getMyProfession = (data) => {
  return request.post("service/front/getMyProfession", data);
};

export const getArticleDetail = (data) => {
  return request.post("service/front/getArticleDetail", data);
};

export const collectArticle = (data) => {
  return request.post("service/front/collectArticle", data);
};
