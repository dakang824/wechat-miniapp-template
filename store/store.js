import {saveStore} from './action';

const initStore = (store) => {
    const storageData = wx.getStorageSync('store') || store;
    const storeData = new Observer(storageData).data;
    wx.setStorageSync('store', storeData);
    return storeData;
}

class Observer {
    constructor(data) {
        this.data = data;
        this.filterObj(data);
    }

    static isObject(obj) {
        return Object.prototype.toString.call(obj) === "[object Object]";
    }

    filterObj(data) {
        if (!Observer.isObject(data)) return;
        for (const key in data) {
            // 过滤原型链上的属性。
            if (data.hasOwnProperty(key)) {
                const value = data[key];
                if (Observer.isObject(data[key])) {
                    new Observer(data[key]);
                }
                this.watch(key, value);
            }
        }
    }

    watch(k, v) {
        Object.defineProperty(this.data, k, {
            enumerable: true,
            configurable: true,
            get: function () {
                return v;
            },
            set: function (newV) {
                console.log(`${k}，属性值发生变化->新的值为：${JSON.stringify(newV)}。`);
                if (Observer.isObject(newV)) {
                    new Observer(newV);
                }
                v = newV;

                //如果页面上绑定了该值，进行更新操作
                let page = getCurrentPages()[0];
                if(page.data.hasOwnProperty(k)){
                    page.setData({
                        [k]: newV
                    })
                }

                //保存到缓存
                saveStore()
            }
        })
    }
}

const init = (store) => {
    return new Promise((resolve, reject) => {
        //初始化store
        const globalData = initStore(store);
        resolve(globalData)
    })
};

module.exports = {
    init: init
};
