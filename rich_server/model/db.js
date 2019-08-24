const mongo = require('mongoose')

mongo.connect('mongodb://192.168.1.104/rich', {useNewUrlParser: true})
    .then(()=>{console.log('mongodb connect success');
    })
    .catch(()=>{console.log('mongodb connect failed');
    })