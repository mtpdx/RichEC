const {User} = require('../model/user')

const signUp = (req, res) => {

}

const login = async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body
    console.log(email + password);
    
    if (!email || !password || email.trim().length == 0 || password.trim().length == 0) {
        return res.send({'state': 1, 'msg': 'params error'})
    }
    let user = await User.findOne({email})
    if (user){
        if(user.password == password){
            res.send({'state': 0, 'msg': 'success'})
        }else{
            res.send({'state': 2, 'msg': 'email or password error'})
        }
    }else{
        res.send({'state': 2, 'msg': 'email or password error'})
    }
    
}

module.exports = {
    signUp,
    login
}