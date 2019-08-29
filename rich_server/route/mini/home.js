
const express = require('express')

const ctrl = require('../../controller/mini/home.js')

const mini_home = express.Router()

mini_home.get('/swiperdata', ctrl.swiper_data)

mini_home.get('/recommend', ctrl.recommend_data)

mini_home.get('/goods_detail', ctrl.goods_detail)

mini_home.get('/goods_price_history', ctrl.goods_price_history)

module.exports = mini_home