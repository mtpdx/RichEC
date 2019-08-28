import wepy from 'wepy'

export default class extends wepy.mixin {
    data = {
        pagenum: 1,
        total: 0,
        goodsList: [],
        isLoading: false,
        noMoreData: false
    }

    onLoad() {
        this.initData()
    }

    initData() {
        this.getGoodList()
    }

    async getGoodList(callback) {
        this.isLoading = true
        const { data: res } = await wepy.richGet('/home/recommend', {
            pagenum: this.pagenum
        })

        if (res.state !== 0) {
            return wepy.baseToast()
        }
        this.goodsList = [...this.goodsList, ...res.data.goods]
        this.total = res.data.total
        this.pagenum = res.data.pageNum
        this.isLoading = false
        this.$apply()
        callback && callback()

    }

    methods = {
        goGoodsDetail(goods_id) {
            wepy.navigateTo({
                url: '/pages/goods_detail/main?goods_id=' + goods_id
            })
        }
    }

    onReachBottom() {
        if (this.isLoading) {
            return
        }
        if (this.pagenum >= this.total) {
            this.noMoreData = true
            return
        }
        this.pagenum++
        this.getGoodList()
    }

    onPullDowenRefresh() {
        this.pagenum = 1
        this.total = 0
        this.goodsList = []
        this.noMoreData = this.isLoading = false

        this.getGoodList(() => {
            wepy.stopPullDownRefresh()
        })
    }
}