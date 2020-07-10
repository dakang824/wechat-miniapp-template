// components/my-component/index.js
import {Comp, app} from '../component'

Comp({
    /**
     * 组件的属性列表
     */
    properties: {},
    needLogin: ['needLoginComp'],
    needToLogin: ['needToLoginComp'],

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        needLoginComp() {
            console.log('登陆后我才执行-我是组件里面的')
        },
        needToLoginComp(){
            console.log('我可是会让你去登录的-我是组件里面的')
        }
    }
})
