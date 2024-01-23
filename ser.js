// module.exports = {
//     secret: 'theresnosecretamongus'
// }

// //practicing\
// const jwt = require('jsonwebtoken')
// const config = require('../config/authConfig.js')
// const db = require('./models')
// const User = db.user



// verifyToken = (req,res,next) => {
//     let token = req.headers["x-access-token"]

//     if(!token){
//         return res.satus(403).send({message:'no token provider'})
//     }

//     jwt.verify(token, config,secret, (err,decoded) => {
//         if(err){
//             return res.status(401).send({
//                 message:'Unautharized'
//             })            
//         }

//         req.userId = decoded.id
//         next()
//     })
// }


// isAdmin = (req,res,next) => {
//     User.findByPk(req.userId).then((user) => {
//         user.getRoles().then( roles => {
//             for(let i=0;i<roles;i++){
//                 if(roles[i] === "admin"){
//                     next()
//                     return
//                 }
//             }

//             res.status(403).send({message:'require admin roles'})
//             return
//         })
//     })
// }



const moment = require('moment');

function obtenerDiasPorSemana(mes, anio) {
  const diasMes = moment(`${anio}-${mes}`, "YYYY-MM").daysInMonth();
  const diasPorSemana = [];
  let semana = 1;
  for (let dia = 1; dia <= diasMes; dia++) {
    const fecha = moment(`${anio}-${mes}-${dia}`, "YYYY-MM-DD");
    const numeroSemana = fecha.isoWeek();
    
    if (!diasPorSemana[numeroSemana]) {
      diasPorSemana[numeroSemana] = [];
      semana++
    }
    diasPorSemana[numeroSemana].push({dia, nombre: fecha.format('L') });
  }
  return diasPorSemana;
}

// Ejemplo de uso
const mes = 3; // Ingresa el mes que desees (1 para enero, 2 para febrero, etc.)
const anio = 2024; // Ingresa el año
const diasPorSemana = obtenerDiasPorSemana(mes, anio);
console.log(diasPorSemana);
