const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
var path = require('path')
var mount = require('mount-routes')

const app = express()


// require('./model/db')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

// const user = require('./route/user.js')
// app.use(user)

// const menu = require('./route/menu.js')
// app.use(menu)

// const wares = require('./route/wares.js')
// app.use(wares)

// const mini_home = require('./route/mini/home.js')
// app.use(mini_home)

mount(app, path.join(process.cwd(), '/route'), true)

app.use(function(req, res, next) {
    res.sendResult(null, 404, 'Not Found')
  })

app.listen(3000, () => {
    console.log('rich api server boot success')
})