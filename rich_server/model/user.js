const mongo = require('mongoose')

const userSchema = new mongo.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 11,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String, // admin, normal
        required: true,
    },
    state: {
        type: Number,
        default: 0,  // 0 启用, 1 禁用
    },
})

const User = mongo.model('User', userSchema)

// User.create({
//     username: 'sunyh',
//     email: 'sunyh@rich.com',
//     password: '123456',
//     role: 'admin',
//     state: 0
// }).then(() => {
//     console.log(' sunyh create success');
// }).catch(() => {
//     console.log('sunyh create failed');
// })

module.exports = {
    User: User
}