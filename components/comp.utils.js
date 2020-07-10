const bindLoginBeforeFunc = (compObj, needLogin, comps, app) => {
    for (let i = 0; i < needLogin.length; i++) {
        let methods = compObj.methods;
        if (methods[needLogin[i]] instanceof Function) {
            let _comp = methods[needLogin[i]];
            methods[needLogin[i]] = function () {
                if (!app.$store.isLogin) {
                    return false;
                }
                _comp.call(comps)
            }
        }
    }
}

const bindToLoginBeforeFunc = (compObj, needLogin, comps, app) => {
    for (let i = 0; i < needLogin.length; i++) {
        let methods = compObj.methods;
        if (methods[needLogin[i]] instanceof Function) {
            let _comp = methods[needLogin[i]];
            methods[needLogin[i]] = function () {
                if (!app.$store.isLogin) {
                    app.$router.toLogin();
                    return false;
                }
                _comp.call(comps)
            }
        }
    }
}

const bindDataFunc = (arr, comp, store) => {
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
        if(store.hasOwnProperty(arr[i])){
            obj[arr[i]] = store[arr[i]]
        }
    }
    comp.setData({
        ...obj
    })
}

module.exports = {
    bindLoginBeforeFunc,
    bindToLoginBeforeFunc,
    bindDataFunc
}
