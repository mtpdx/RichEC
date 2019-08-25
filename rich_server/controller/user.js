const { User } = require('../model/user')

const signUp = (req, res) => {

}

const login = async (req, res) => {
    // console.log(req.body);
    const { username, password } = req.body

    if (!username || !password || username.trim().length == 0 || password.trim().length == 0) {
        return res.send({ 'state': 1, 'msg': 'params error' })
    }

    if (username == 'sunyh' && password == '123456') {
        res.send({ 'state': 0, 'msg': 'success', 'token': 'testrichtoken' })
    } else {
        res.send({ 'state': 2, 'msg': 'email or password error' })
    }

    // let user = await User.findOne({email})
    // if (user){
    //     if(user.password == password){
    //         // TODO 增加token验证
    //         res.send({'state': 0, 'msg': 'success', 'token': 'testrichtoken'})
    //     }else{
    //         res.send({'state': 2, 'msg': 'email or password error'})
    //     }
    // }else{
    //     res.send({'state': 2, 'msg': 'email or password error'})
    // }

}

module.exports = {
    signUp,
    login
}