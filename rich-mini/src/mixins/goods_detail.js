import wepy from 'wepy'
import * as echarts from '@/components/ec-canvas/echarts';
import util from '@/utils/util.js'

export default class extends wepy.mixin {

    data = {
        goods_id: '',
        vid: '',
        goodsInfo: {},
        ec: {
            onInit: ''
        },
        showPriceHistory: false,
        hpInfo: null,
        option: null
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
        },
        showPriceHistory() {
            this.showPriceHistory = true
            // if (this.hpInfo && this.option) {
            //     console.log(this.option);
            //     this.ecInit()
            //     this.showPriceHistory = true
            // } else {
            //     this.gethp(() => {
            //         this.ecInit()
            //         this.showPriceHistory = true
            //     })
            // }

        },
        jumpBuy() {

        },
        closePriceHistory() {
            this.showPriceHistory = false
        }
    }

    async gethp(cb) {
        const { data: res } = await wepy.richGet('/home/goods_price_history', { goods_id: this.goods_id })
        if (res.state !== 0) return wepy.richToast()
        this.hpInfo = res.data
        this.ecInit()
        cb && cb()
    }

    ecInit() {
        let date_list = []
        let price_list = []
        this.hpInfo.listPrice.forEach(dp => {
            date_list.push(util.formatHpTime(new Date(dp.dt * 1)))
            price_list.push(dp.pr * 1)
        });
        this.ec.onInit = (canvas, width, height) => {
            const chart = echarts.init(canvas, null, {
                // width: width,
                // height: height
                width: 300,
                height: 300
            });
            canvas.setChart(chart);
            const op = {
                // title: {
                //     text: '测试下面legend的红色区域不应被裁剪',
                //     left: 'center'
                // },
                color: ["#da2f25"],
                // legend: {
                //     data: ['A', 'B', 'C'],
                //     top: 50,
                //     left: 'center',
                //     backgroundColor: 'red',
                //     z: 100
                // },
                grid: {
                    top: 30,
                    bottom: 60,
                    left: 0,
                    right: 0,
                    containLabel: true
                },
                tooltip: {
                    show: true,
                    trigger: 'axis'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: date_list,
                    // show: false
                },
                yAxis: {
                    scale: true,
                    x: 'center',
                    type: 'value',
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    }
                    // show: false
                },
                series: [{
                    name: 'price',
                    type: 'line',
                    smooth: true,
                    data: price_list
                }]
            }
            chart.setOption(op);
            return chart;
        }
    }

    initOption() {
        let date_list = []
        let price_list = []
        this.hpInfo.listPrice.forEach(dp => {
            date_list.push(util.formatHpTime(new Date(dp.dt * 1)))
            price_list.push(dp.pr * 1)
        });
        return {
            // title: {
            //     text: '测试下面legend的红色区域不应被裁剪',
            //     left: 'center'
            // },
            color: ["#da2f25"],
            // legend: {
            //     data: ['A', 'B', 'C'],
            //     top: 50,
            //     left: 'center',
            //     backgroundColor: 'red',
            //     z: 100
            // },
            grid: {
                containLabel: true
            },
            tooltip: {
                show: true,
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                // show: false
            },
            yAxis: {
                x: 'center',
                type: 'value',
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                }
                // show: false
            },
            series: [{
                name: 'price',
                type: 'line',
                smooth: true,
                data: [18, 36, 65, 30, 78, 40, 33]
            }]
        }
    }

    initData() {
        this.getDetailData()
        this.gethp()
    }

    async getDetailData() {
        const { data: res } = await wepy.richGet('/home/goods_detail', { goods_id: this.goods_id, vid: this.vid })
        if (res.state !== 0) return wepy.richToast()
        this.goodsInfo = res.data
        this.$apply()
    }
}