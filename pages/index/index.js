// pages/index/index.js
import {Router, app} from '../page';

Router({
    bindData: ['token'],
    needLogin: ['need'],
    needToLogin: ['needToLoginPage'],
    data: {

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
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

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    onPageScroll: function (e) {

    }
})
