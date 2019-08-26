const express = require('express')

const ctrl = require('../controller/wares.js')

const wares = express.Router()

wares.get('/search_wares',ctrl.search_wares)

wares.get('/ware_detail',ctrl.ware_detail)

module.exports = wares