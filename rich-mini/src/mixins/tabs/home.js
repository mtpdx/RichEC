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

    async getGoodList(cb) {
        this.isLoading = true
        console.log('pagenum' + this.pagenum)

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
        console.log(this.goodsList);

        cb && cb()

    }

    methods = {
        goGoodsDetail(idStr) {
            let ids = idStr.split(',')
            
            wepy.navigateTo({
                url: '/pages/goods_detail?goods_id=' + ids[0] + (ids.length > 1 ? ("&vid=" + ids[1]) : '')
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