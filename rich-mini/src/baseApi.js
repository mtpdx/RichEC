import wepy from 'wepy'

const baseURL = 'http://127.0.0.1:3000/mini'

wepy.richToast = (msg = '') => {
    wx.showToast({
        title: msg,
        icon: 'failed',
        duration: 2000
    })
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