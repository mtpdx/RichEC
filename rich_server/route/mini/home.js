
const express = require('express')

const ctrl = require('../../controller/mini/home.js')

const mini_home = express.Router()

mini_home.get('/swiperdata', ctrl.swiper_data)

mini_home.get('/recommend', ctrl.recommend_data)

module.exports = mini_home