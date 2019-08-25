const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()


// require('./model/db')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(cors())

const user = require('./route/user.js')
app.use(user)

const menu = require('./route/menu.js')
app.use(menu)

app.listen(3000, ()=>{
    console.log('rich api server boot success')
})