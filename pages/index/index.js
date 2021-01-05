// pages/index/index.js
import {Router, app} from '../page';

Router({
    bindData: ['token'],
    needLogin: ['need'],
    needToLogin: ['needToLoginPage'],
    data: {

    },
    onLoad: function (options) {

    },
    onReady: function () {

    },
    onShow: function () {
        console.log('这是页面的onShow方法，通过重写page方法后可以在这获取全局属性，onlunch里做的任何操作结果都在这可以拿到最新的值(除了定时器延迟绑定)')
    },

    change() {
        app.$store.token = '020002304203402340'
    },
    clear(){
        app.$store.token = '';
    },
    need(){
        console.log('你看我不登录就不执行')
    },
    noNeed(){
        console.log('我不需要登录也能使用')
    },
    needToLoginPage(){
        console.log('你看我就没触发就去登录了')
    },
    onHide: function () {

    },
    onUnload: function () {

    },
    onPullDownRefresh: function () {

    },
    onReachBottom: function () {

    },

    onPageScroll: function (e) {

    }
})
