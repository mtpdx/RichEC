const express = require('express')

const ctrl = require('../controller/menu.js')

const menu = express.Router()

menu.get('/menus',ctrl.menus)

module.exports = menu