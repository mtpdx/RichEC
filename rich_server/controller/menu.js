const menus = async (req, res) => {
    res.send({
        'state': 0,
        'msg': 'success',
        'data': [
            {
                'id': 1,
                'name': '商品管理',
                'icon': 'el-icon-shopping-bag-1',
                'children': [
                    {
                        'id': 11,
                        'name': '每日推荐',
                        'icon': 'el-icon-time'
                    },
                    {
                        'id': 12,
                        'name': '商品搜索',
                        'icon': 'el-icon-search'
                    }
                ]
            },
            {
                'id': 2,
                'name': 'test',
                'icon': 'el-icon-monitor',
                'children': [
                    {
                        'id': 21,
                        'name': 'sub test 1',
                        'icon': 'el-icon-headset'
                    },
                    {
                        'id': 22,
                        'name': 'sub test 2',
                        'icon': 'el-icon-mouse'
                    }
                ]
            },
            {
                'id': 3,
                'name': 'test 3',
                'icon': 'el-icon-magic-stick',
                'children': [
                    {
                        'id': 31,
                        'name': 'sub test 3-1',
                        'icon': 'el-icon-data-analysis'
                    },
                    {
                        'id': 32,
                        'name': 'sub test 3-2',
                        'icon': 'el-icon-shopping-cart-full'
                    }
                ]
            }
        ]
    })
}

module.exports = {
    menus
}