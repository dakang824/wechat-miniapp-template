/*
 * @Author: yukang 1172248038@qq.com
 * @Description:全部接口
 * @Date: 2021-01-05 21:27:27
 * @LastEditTime: 2021-01-14 22:19:38
 */
import request from "./request.api";

// 微信登录
export const wxLogin = (data) => {
  return request.post("service/front/wxLogin", data);
};

// 绑定账户
export const bindAccount = (data) => {
  return request.post("service/front/bindAccount", data);
};

// 查询导航-查询顶部tab导航信息
export const getAllArtNav = (data) => {
  return request.post("service/front/getAllArtNav", data);
};

// 查询文章/课件
export const findArticle = (data) => {
  return request.post("service/front/findArticle", data);
};

// 查询我的专业
export const getMyProfession = (data) => {
  return request.post("service/front/getMyProfession", data);
};

// 查询文章/课件详情
export const getArticleDetail = (data) => {
  return request.post("/service/front/getArticleDetail", data);
};

// 收藏文章/课件
export const collectArticle = (data) => {
  return request.post("/service/front/collectArticle", data);
};

// 顺序练习-获取习题
export const getQuesByOrder = (data) => {
  return request.post("/service/front/getQuesByOrder", data);
};

// 随机练习-获取习题
export const getQuesByRand = (data) => {
  return request.post("/service/front/getQuesByRand", data);
};

// 自测练习-获取习题
export const getZiCeQues = (data) => {
  return request.post("/service/front/getZiCeQues", data);
};

// 顺序练习/随机练习/自测练习 提交做题结果
export const commitQueResult = (data) => {
  return request.post("/service/front/commitQueResult", data);
};

// 错题集练习 获取习题
export const getMyWrongQues = (data) => {
  return request.post("/service/front/getMyWrongQues", data);
};

// 收藏练习 获取习题
export const getMyCollectQues = (data) => {
  return request.post("/service/front/getMyCollectQues", data);
};

// 查询模拟考
export const getTests = (data) => {
  return request.post("/service/front/getTests", data);
};

// 收藏习题
export const collectQues = (data) => {
  return request.post("/service/front/collectQues", data);
};

// 查询问题是否收藏
export const checkHasCollectQues = (data) => {
  return request.post("/service/front/checkHasCollectQues", data);
};

// 提交模拟考试卷
export const commitTestQueResult = (data) => {
  return request.post("/service/front/commitTestQueResult", data);
};

// 获取模拟考成绩
export const getTestScoreResult = (data) => {
  return request.post("/service/front/getTestScoreResult", data);
};

// 查询所有专业 文章/课件中顶部导航显示所有专业
export const getAllProfession = (data) => {
  return request.post("/service/front/getAllProfession", data);
};

// 个人中心-查询我的成绩
export const findMyScore = (data) => {
  return request.post("/service/front/findMyScore", data);
};