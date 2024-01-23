const db = require("../models");
const config = require("../config/authConfig");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

let jwt = require("jsonwebtoken")
let bcrypt = require("bcryptjs");

exports.signup = (req,res) =>{
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,8)
        
    })
    .then(user=>{
        if(req.body.roles){
            Role.findAll({ 
                where: {
                    name:{
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles =>{
                user.setRoles(roles).then(()=>{
                    res.send({message:"User was registered successfully"})
                });
            });
        }else{
            user.setRoles([1]).then(()=> {
                res.send({message:"User was registered successfully!"})
            });
        }
    });
}




exports.createWaitress =(req,res) => {
    User.create({
        username: req.body.username,        
        passport: req.body.password,
        password: bcrypt.hashSync(req.body.password,8),
        email: 'thismail@doesnt.com',
        owner: req.userId
    }).then (user => {

        Role.findAll ({
            where: {
                name: 'moderator'
                
            }
        }).then (roles => {
            user.setRoles(roles).then(()=> {
                res.send({message: 'The waittreess was created so good'})
            })
        })

    })
}


exports.signin = (req,res)=>{


    User.findOne({
        where:{
            username: req.body.username
        }
    }).then (user => {
        if(!user){
            return res.status(404).send({message:"user not found"});
        }

        let passwordOK = bcrypt.compareSync( req.body.password, user.password);

        if (!passwordOK){
            return res.status(401).send({message:"Invalid password", accessToken: null});
        }

        let token = jwt.sign({id:user.id, username: user.username}, config.secret, {expiresIn:86400});

        let authorities = [];
        
        user.getRoles().then(roles => {
            for( let i=0; i<roles.length; i++ ){
                authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token,
                message: 'ok'

            });
        });
    })
    .catch( err => { res.status(500).send ({ message: err.message }); });
}
