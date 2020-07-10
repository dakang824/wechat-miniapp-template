import Api from '../config/axios/request'
let api = Api()
let request = api.create({
    url: 'https://miniapp.xiabanjiayouzhan.com/wxapp/v1',//默认的接口后缀
    method: 'get',//默认的HTTP 请求方法
    dataType: 'json',//默认的返回类型
    responseType: 'text',
    header: {
        'content-type': "application/json"
    }
})

request.interceptors.request.use(function (config){
    //返回的是和wx.request相关的参数
    console.log(config)
    wx.showLoading({
        title: '加载内容'
    })
    return config;
}, function(error){
    console.log(error)
    return error
})

request.interceptors.response.use(function (config){
    //接口||wx.接口
    console.log('请求返回')
    console.log(config)
    wx.hideLoading();
    return config.data || config
}, function(error){
    return error
})

export default request;
