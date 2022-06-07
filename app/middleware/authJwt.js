const jwt = require("jsonwebtoken");
const config = require("../config/authConfig.js");
const db = require("../models");
const User = db.user;


verifyToken = (req,res,next)=>{

    
    let token = req.headers["x-access-token"];
    

    if(!token){
        return res.status(403).send ({ message: "No token provider" })        
    }

    jwt.verify(token, config.secret, (err,decoded) =>{
        if(err){
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId =decoded.id;

        next();
    });
}


isAdmin = (req,res,next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i=0; i< roles.length;i++){
                if(roles[i].name === "admin"){
                    next();
                    return;
                }
            }

            res.status(403).send({message: "Require Admin Role!"});
            return;
        });
    });
}


isModerator = (req,res,next)=>{
    User.findByPk(req.userId).then(user =>{
        user.getRoles().then(roles => {
            for(let i=0; i<roles.length;i++){
                if(roles[i].name === "moderator"){
                    next();
                    return;
                }
            }
            res.status(403).send({message:"Require Moderator role!"})
        });
    });
}

isModeratorOrAdmin = (req,res,next)=>{
    User.findByPk(req.userId).then(user =>{
        user.getRoles().then(roles => {
            for(let i=0; i<roles.length;i++){
                if(roles[i].name === "moderator" || roles[i].name === "admin"){
                    next();
                    return;
                }
            }
            res.status(403).send({message:"Require Moderator or Admin role!"})
        });
    });
}

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModerator
};

module.exports = authJwt;