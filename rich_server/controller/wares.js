const search_wares = (req, res) => {
    console.log(req);
    query = req.query.query
    pagenum = req.query.pagenum
    pagesize = req.query.pagesize

    res.send({
        'state': 0,
        'msg': 'success',
        'data': {
            'total': 3,
            'pageNum': 1,
            'goods': [
                {
                    "plateform": "JD",
                    "createDate": 26017417,
                    "wayCouponDate": 26038910,
                    "updateDate": 26038910,
                    "price": "23.80",
                    "priceVal": 23.8,
                    "itemUrl": "https://item.jd.com/12591504.html",
                    "itemId": "12591504",
                    "monthSale": 1,
                    "id": "JD-12591504",
                    "coverImage": "http://img14.360buyimg.com/n1/jfs/t1/34521/32/6103/186888/5cc297edEf3748ef2/3488b492ca16fc83.jpg",
                    "category": 4766,
                    "title": "2019各地期末名卷精选：数学（一年级下 R 新课标）",
                    "vid": 0,
                    "couponInfo": {
                        "couponRemainCount": 0,
                        "couponMoney": "0.0",
                        "couponRates": "4.00"
                    },
                    'order': 1,
                },
                {
                    "plateform": "JD",
                    "createDate": 26017417,
                    "wayCouponDate": 26032899,
                    "updateDate": 26032899,
                    "price": "25.10",
                    "priceVal": 25.1,
                    "itemUrl": "https://item.jd.com/33993400341.html",
                    "itemId": "33993400341",
                    "monthSale": 0,
                    "id": "JD-33993400341",
                    "coverImage": "http://img14.360buyimg.com/n1/jfs/t26515/84/412456718/69901/28ad815c/5b914579Nd7db328c.jpg",
                    "category": 4765,
                    "title": "清华北大学霸的黄金学习法文科篇",
                    "sellerName": "墨渊图书专营店",
                    "vid": 10012841,
                    "couponInfo": {
                        "couponRemainCount": 0,
                        "couponMoney": "0.0",
                        "couponRates": "1.00"
                    },
                    'order': 2,
                },
                {
                    "plateform": "JD",
                    "createDate": 26017417,
                    "wayCouponDate": 26023300,
                    "updateDate": 26023300,
                    "price": "87.00",
                    "priceVal": 87,
                    "itemUrl": "https://item.jd.com/44361759640.html",
                    "itemId": "44361759640",
                    "monthSale": 4,
                    "id": "JD-44361759640",
                    "coverImage": "http://img14.360buyimg.com/n1/jfs/t1/15486/11/13490/343420/5c9f2314E75822351/dc7e78660b1f24ed.jpg",
                    "category": 4776,
                    "title": "云南中考黑白卷数学语文英语物理化学黑白卷2019中考猜题卷押题卷初三云南考前冲刺总复习逆袭冲刺卷",
                    "sellerName": "龙门诚慧图书专营店",
                    "vid": 654451,
                    "couponInfo": {
                        "couponRemainCount": 0,
                        "couponMoney": "0.0",
                        "couponRates": "3.00"
                    },
                    'order': 0,
                }
            ]
        }
    })
}

const ware_detail = (req, res) => {
    res.send({
        'state': 0,
        'msg': 'success',
        'data': {
            "plateform": "JD",
            "createDate": 26017417,
            "wayCouponDate": 26038910,
            "updateDate": 26038910,
            "price": "23.80",
            "priceVal": 23.8,
            "itemUrl": "https://item.jd.com/12591504.html",
            "itemId": "12591504",
            "monthSale": 1,
            "id": "JD-12591504",
            "coverImage": "http://img14.360buyimg.com/n1/jfs/t1/34521/32/6103/186888/5cc297edEf3748ef2/3488b492ca16fc83.jpg",
            "category": 4766,
            "title": "2019各地期末名卷精选：数学（一年级下 R 新课标）",
            "vid": 0,
            "couponInfo": {
                "couponRemainCount": 0,
                "couponMoney": "0.0",
                "couponRates": "4.00"
            },
            'order': 1,
        }
    })
}

module.exports = {
    search_wares,
    ware_detail
}