import wepy from 'wepy'

// const baseURL = 'http://127.0.0.1:3000/mini'
// const baseURL = 'http://192.168.1.29:3000/mini'
const baseURL = 'http://192.168.20.67:3000/mini'
const showLog = true

wepy.richToast = (msg = '') => {
    wx.showToast({
        title: msg,
        icon: 'failed',
        duration: 2000
    })
}

wepy.richLog = (msg) => {
    if (msg) console.log(msg);
}

wepy.richGet = (url, data = {}) => {
    return wepy.request({
        url: baseURL + url,
        method: 'GET',
        data
    })
}

wepy.richPost = (url, data = {}) => {
    return wepy.request({
        url: baseURL + url,
        method: 'POST',
        data
    })
}