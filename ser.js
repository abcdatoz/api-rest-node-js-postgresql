module.exports = {
    secret: 'theresnosecretamongus'
}

//practicing\
const jwt = require('jsonwebtoken')
const config = require('../config/authConfig.js')
const db = require('./models')
const User = db.user



verifyToken = (req,res,next) => {
    let token = req.headers["x-access-token"]

    if(!token){
        return res.satus(403).send({message:'no token provider'})
    }

    jwt.verify(token, config,secret, (err,decoded) => {
        if(err){
            return res.status(401).send({
                message:'Unautharized'
            })            
        }

        req.userId = decoded.id
        next()
    })
}


isAdmin = (req,res,next) => {
    User.findByPk(req.userId).then((user) => {
        user.getRoles().then( roles => {
            for(let i=0;i<roles;i++){
                if(roles[i] === "admin"){
                    next()
                    return
                }
            }

            res.status(403).send({message:'require admin roles'})
            return
        })
    })
}




