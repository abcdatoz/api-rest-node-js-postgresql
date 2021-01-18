const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

let corsOptions = {     origin:'http://localhost:8081' }

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))


const db = require("./app/models");
const Role = db.role;

/*
db.sequelize.sync({force:true})
    .then(()=>{ 
        console.log("Drop and Resync Db");        
        initial()
    });
*/

app.get('/',(req,res)=>{ res.json({messsage:'Welcome to abcdatoz app'}) })

require('./app/routes/authRoutes')(app);
require('./app/routes/userRoutes')(app);


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