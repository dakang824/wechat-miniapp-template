const bindLoginBeforeFunc = (pageObj, needLogin, page, app) => {
    for (let i = 0; i < needLogin.length; i++) {
        if (pageObj[needLogin[i]] instanceof Function) {
            let _page = pageObj[needLogin[i]];
            pageObj[needLogin[i]] = function () {
                if (!app.$store.isLogin) {
                    return false;
                }
                _page.call(page)
            }
        }
    }
}

const bindToLoginBeforeFunc = (pageObj, needLogin, page, app) => {
    for (let i = 0; i < needLogin.length; i++) {
        if (pageObj[needLogin[i]] instanceof Function) {
            let _page = pageObj[needLogin[i]];
            pageObj[needLogin[i]] = function () {
                if (!app.$store.isLogin) {
                    app.$router.toLogin();
                    return false;
                }
                _page.call(page)
            }
        }
    }
}

const bindDataFunc = (arr, page, store) => {
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
        if(store.hasOwnProperty(arr[i])){
            obj[arr[i]] = store[arr[i]]
        }
    }
    page.setData({
        ...obj
    })
}

module.exports = {
    bindLoginBeforeFunc,
    bindDataFunc,
    bindToLoginBeforeFunc
}
