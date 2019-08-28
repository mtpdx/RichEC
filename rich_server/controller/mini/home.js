const swiper_data = (req, res) => {
    res.send({
        'state': 0,
        'msg': 'success',
        'data': [
            {
                "image_src": "https://projects.bmtcontent.com/projects/data/2646/web/banner.jpg",
                "open_type": "navigate",
                "navigator_url": "/pages/goods_detail?goods_id=JD-12591504&vid=10012841"
            },
            {
                "image_src": "https://projects.bmtcontent.com/projects/data/2646/web/banner.jpg",
                "open_type": "navigate",
                "navigator_url": "/pages/goods_detail?goods_id=JD-12591504&vid=10012841"
            },
            {
                "image_src": "https://projects.bmtcontent.com/projects/data/2646/web/banner.jpg",
                "open_type": "navigate",
                "navigator_url": "/pages/goods_detail?goods_id=JD-12591504&vid=10012841"
            }
        ]
    })
}

const recommend_data = (req, res) => {
    let page = req.query.pagenum
    let test_list = [
        {
            "plateform": "JD",
            "price": "23.80",
            "priceVal": 23.8,
            "itemUrl": "https://item.jd.com/12591504.html",
            "itemId": "12591504",
            "monthSale": 1,
            "id": "JD-12591504",
            "coverImage": "http://img14.360buyimg.com/n1/jfs/t1/34521/32/6103/186888/5cc297edEf3748ef2/3488b492ca16fc83.jpg",
            "title": "2019各地期末名卷精选：数学（一年级下 R 新课标）",
            "vid": 0,
            'order': 1,
        },
        {
            "plateform": "JD",
            "price": "25.10",
            "priceVal": 25.1,
            "itemUrl": "https://item.jd.com/33993400341.html",
            "itemId": "33993400341",
            "monthSale": 0,
            "id": "JD-33993400341",
            "coverImage": "http://img14.360buyimg.com/n1/jfs/t26515/84/412456718/69901/28ad815c/5b914579Nd7db328c.jpg",
            "title": "清华北大学霸的黄金学习法文科篇",
            "vid": 10012841,
            "couponMoney": "5.0",
            'order': 2,
            "nowPrice": "20.10",
            "nowPriceVal": 20.1,
        },
        {
            "plateform": "JD",
            "price": "87.00",
            "priceVal": 87,
            "itemUrl": "https://item.jd.com/44361759640.html",
            "itemId": "44361759640",
            "monthSale": 4,
            "id": "JD-44361759640",
            "coverImage": "http://img14.360buyimg.com/n1/jfs/t1/15486/11/13490/343420/5c9f2314E75822351/dc7e78660b1f24ed.jpg",
            "title": "云南中考黑白卷数学语文英语物理化学黑白卷2019中考猜题卷押题卷初三云南考前冲刺总复习逆袭冲刺卷",
            "vid": 654451,
            'order': 0,
        }
    ]
    res.send({
        'state': 0,
        'msg': 'success',
        'data': {
            'total': 3,
            'pageNum': page ? (page > 3 ? 3 : page) : 1,
            'goods': [...test_list, ...test_list, ...test_list]
        }
    })
}

const goods_detail = (req, res) => {
    let goods_id = req.query.goods_id
    let vid = req.query.vid
    res.send({
        'state': 0,
        'msg': 'success',
        'data': {
            "plateform": "JD",
            "price": "4499.00",
            "priceVal": 4499,
            "nowPrice": "4000.00",
            "nowPriceVal": 4000,
            "itemUrl": "https://item.jd.com/100005502444.html",
            "monthSale": 15000,
            "id": "JD-100005502444",
            "title": "一加 OnePlus 7 Pro 2K+90Hz 流体屏 骁龙855旗舰性能 4800万超广角三摄 8GB+256GB 皓月金 全面屏游戏手机",
            "vid": 1000001947,
            "couponMoney": "499.00",
            "sellerName": "一加手机京东自营官方旗舰店",
            "sellerLogo": "",
            "sellerGrades": ['9', '9', '8'],
            "slideImgs": [
                'http://img14.360buyimg.com/n5/s750x750_jfs/t1/47320/13/7033/186884/5d4925b1E3452e53c/a95c82b7c278fe1a.jpg',
                'http://img14.360buyimg.com/n5/s750x750_jfs/t1/56872/32/719/114076/5ce67f92E14b33453/3e4ee6b91564649d.jpg',
                'http://img14.360buyimg.com/n5/s750x750_jfs/t1/55275/8/721/195218/5ce67f93E79f9f6d8/8ebfba5078b66461.jpg',
                'http://img14.360buyimg.com/n5/s750x750_jfs/t1/39654/21/7210/117584/5ce67f94Ebf1e8d3a/59a4103ba00fb456.jpg',
                'http://img14.360buyimg.com/n5/s750x750_jfs/t1/62246/34/254/144275/5ce67f94Ebaedc008/064b51b3e3659253.jpg'
            ],
            'video': 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/00379c05210816721622675457/v.f30.mp4?dockingId=a49b3d09-704b-4b7e-94f6-8dbf22faa254&storageSource=3',
            "detailImgs": [
                'http://img20.360buyimg.com/vc/jfs/t1/35333/40/13791/1134827/5d19cb2eEbdab7f0b/960a6c722178772f.jpg',
                'http://img20.360buyimg.com/vc/jfs/t1/57330/33/6454/3860799/5d4261b0E06cf2ac8/3bf9c2d23ac80ad7.jpg',

            ]
        }
    })
}

module.exports = {
    recommend_data,
    swiper_data,
    goods_detail
}