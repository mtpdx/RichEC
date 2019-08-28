import wepy from 'wepy'

export default class extends wepy.mixin {

    data = {
        goods_id: '',
        vid: '',
        goodsInfo: {}
    }

    onLoad(options) {
        console.log(options);
        this.goods_id = options.goods_id
        this.vid = options.vid
        this.initData()
    }

    methods = {
        preview(current) {
            wepy.previewImage({
              urls: this.goodsInfo.slideImgs,
              current: current
            })
          }
    }

    initData() {
        this.getDetailData()
    }

    async getDetailData() {
        const { data: res } = await wepy.richGet('/home/goods_detail', { goods_id: this.goods_id, vid: this.vid })
        if (res.state !== 0) return wepy.richToast()
        this.goodsInfo = res.data
        this.$apply()
    }
}