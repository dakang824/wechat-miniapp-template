# wechat-miniapp-template

#### 介绍

微信小程序原生代码模版
全局声明对象，通过修改声明的属性做到全局响应

#### 安装教程

直接下载或者 git clone 即可

#### 使用说明

    1.app.js调用init方法同时传递需要的全局加载的store数据对象
    该方法是一个promise，调用后返回一个对象绑定到全局上

    2.app全局绑定了router,进行跳转的拦截和传参，主要为了避免卡顿或延迟导致的页面打开n次

    3.封装了page方法进行页面的初始化

    a.额外增加了三个参数
        needLogin: 如果方法需要登录后才能使用的
        needToLogin: 进行登录判断，如果没有登录跳转到登录
        bindData: 绑定全局store对象中的某个参数到页面的data中（需要注意的是目前只支持一级属性）

    b.page方法封装时默认绑定了isLogin作为全局参数，不用在bindData里再进行声明

    4.再来说说组件，基本上跟page大同小异
    需要注意的是组件的方法需要写在methods中

    5.请求封装
    增加了请求拦截器，请求统一改为promise，在目录api下进行设置和编写，返回值是一个promise

#### 参考贡献

api 模块设计参考 wx-axios-promise，感谢
