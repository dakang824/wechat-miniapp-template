//app.js
import {init} from './store/store';
import Router from './config/router/router';
import {globalData} from './store/globalData';

App({
    $router: new Router(),
    onLaunch: function () {
        let vm = this;
        //初始化，全局监听
        init(globalData).then(store => {
            vm.$store = store;
        })
    }
});
