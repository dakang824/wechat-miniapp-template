const globalData = {
    isLogin: false,
    token: '',
    user: {
        isLecturer: 0,
        userInfo: {
            nickName: 'Hi,游客',
            avatar: '/static/icons/mine_author_login.png'
        },
        userWallets: {},
    },
    other: {
        searchData: '',
    }
};

module.exports = {
    globalData
};
