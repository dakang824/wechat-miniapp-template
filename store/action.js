const saveStore = () => {
    wx.setStorageSync('store', JSON.parse(JSON.stringify(getApp().$store)));
};

const updateStore = (key, value, that) => {

}

module.exports = {
    updateStore,
    saveStore,
};
