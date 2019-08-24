const express = require('express')

const ctrl = require('../controller/user.js')

const user = express.Router()

user.post('/user-sign-up',ctrl.signUp)

user.post('/user-login',ctrl.login)

module.exports = user