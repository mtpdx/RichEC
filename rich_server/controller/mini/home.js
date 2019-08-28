const swiper_data = (req, res) => {
    res.send({
        'state': 0,
        'msg': 'success',
        'data': [
            {
                "image_src": "https://projects.bmtcontent.com/projects/data/2646/web/banner.jpg",
                "open_type": "navigate",
                "navigator_url": "/pages/goods_detail/main?goods_id=55578"
            },
            {
                "image_src": "https://projects.bmtcontent.com/projects/data/2646/web/banner.jpg",
                "open_type": "navigate",
                "navigator_url": "/pages/goods_detail/main?goods_id=17927"
            },
            {
                "image_src": "https://projects.bmtcontent.com/projects/data/2646/web/banner.jpg",
                "open_type": "navigate",
                "navigator_url": "/pages/goods_detail/main?goods_id=51216"
            }
        ]
    })
}

const recommend_data = (req, res) => {
    page = req.query.page
    test_list = [
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
            'pageNum': page ? (page> 3 ? 3 : page) : 1,
            'goods': [...test_list, ...test_list, ...test_list]
        }
    })
}

module.exports = {
    recommend_data,
    swiper_data
}