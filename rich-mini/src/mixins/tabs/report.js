import wepy from 'wepy'

export default class extends wepy.mixin {
    data = {
        imgUrls: [],
        indicatorDots: true,
        autoplay: true,
        circular: true,
        interval: 3000,
        duration: 1000
    }

    onLoad() {
        this.initData()
    }

    async initData() {
        // wx.showLoading({
        //   title: '加载中'
        // })
        const { data: res, statusCode } = await wepy.richGet('/home/swiperdata')

        if (statusCode !== 200 && res.state !== 0) {
            wepy.richToast('failed')
            return console.log('get data failed')
        }

        this.imgUrls = res.data
        this.$apply()
        // wx.hideLoading()
        wepy.richToast('swiper success')
    }
}