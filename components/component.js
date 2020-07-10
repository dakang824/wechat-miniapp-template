const app = getApp()
import {bindLoginBeforeFunc, bindToLoginBeforeFunc, bindDataFunc} from './comp.utils'

/**
 * 路由拦截器
 */
const Comp = (compObj) => {
    //需要登录的接口
    compObj.needLogin = compObj.needLogin || [];
    //需要跳转登录的接口
    compObj.needToLogin = compObj.needToLogin || [];
    //需要绑定的store字段
    compObj.bindData = compObj.bindData || [];

    //需登录方法前置监听
    compObj.mothods = compObj.mothods || {};
    bindLoginBeforeFunc(compObj, compObj.needLogin,this,app);
    bindToLoginBeforeFunc(compObj, compObj.needToLogin,this,app);

    //组件声明周期声明
    if(!compObj.pageLifetimes){
        compObj.pageLifetimes = {
            show: function () {},
            hide: function () {}
        }
    }
    //组件展示事件
    if (compObj.pageLifetimes.show) {
        let _comp = compObj.pageLifetimes.show
        compObj.pageLifetimes.show = function () {
            //公共参数
            this.setData({
                isLogin: app.$store.isLogin
            })
            //额外参数
            bindDataFunc(compObj.bindData, this, app.$store);

            _comp.call(this)
        }
    }

    return Component(compObj)
}

module.exports = {
    Comp,
    app
}
