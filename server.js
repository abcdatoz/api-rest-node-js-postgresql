const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

//let corsOptions = { origin:'http://localhost:8081' }
let corsOptions = { origin: false }

app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const db = require("./app/models");
const Role = db.role;


// db.sequelize.sync({force:true})
//     .then(()=>{ 
//         console.log("Drop and Resync Db");        
//          //initial()
//     });


/**
 * checar cual es la forma pro de administrar imagenes
 * 
 * checar como validar registros en casdada // #######DONE  
 * 
 * postgressql ...procedimientos almacenados...invoke
 *   
 * 
 * checar bien las validaciones
 * 
 * checar como enviar correos
 * 
*/




app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token");
    next();   
});


app.get('/',(req,res)=>{ res.json({messsage:'Welcome to abcdatoz app'}) })


require('./app/routes/authRoutes')(app)
require('./app/routes/userRoutes')(app)

require('./app/routes/grupoRoutes')(app)
require('./app/routes/productoRoutes')(app)
require('./app/routes/articuloRoutes')(app)

require('./app/routes/bugRoutes')(app)
require('./app/routes/solutionRoutes')(app)
require('./app/routes/commentRoutes')(app)


app.use((error, req, res, next) => {
    return res.status(500).json({ error: error.toString() });
});
   


const PORT = process.env.PORT || 8080

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)    
})





function initial(){
    Role.create({
        id:1,
        name:"user"
    });

    Role.create({
        id:2,
        name:"moderator"
    });

    Role.create({
        id:3,
        name:"admin"
    })

}