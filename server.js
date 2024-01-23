const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
 

// app.use(express.static('public'))
app.use(express.static('public'))

let corsOptions = { origin: false }
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const db = require("./app/models");
const Role = db.role;





    // db.sequelize.sync({force:true})
    // db.sequelize.sync({force:true})
    //  .then(()=>{ 
    //      console.log("Drop and Resync Db");        
    //        initial()
    //  });




// const cron = require('node-cron');
// const moment = require('moment')
// const fs = require('fs')

// //const spawn = require('child_process').spawn
// //console.log(spawn)


// const { spawn } = require('child_process');

// let file = "backups/" + moment().format('YYYY-MM-DD_hh_mm_ss_a') + '.sql'
//  const wstream = fs.createWriteStream(file)



// let DATABASE_NAME = 'atwa'
// let mysqldump = spawn('mysqldump', [
//             `--host=localhost`,
//             `--port=3306`,
//             `--user=root`,
//             `--password=W3st3rn`,
//             DATABASE_NAME
//         ])

//         mysqldump
//             .stdout
//             .pipe(wstream)
//             .on('finish', function () {
//                 console.log('Completed')
//             })
//             .on('error', function (err) {
//                 console.error(err)
//             })



// cron.schedule('*/1 * * * *',() => {

//     let file = "backups/" + moment().format('YYYY-MM-DD_hh_mm_ss_a') + '.sql'
//     const wstream = fs.createWriteStream(file)
    
//     const mysqldump  = spawn('mysqldump',['-u','root','-pW3st3rn', 'atwa'])

//     const dump = spawn('mysqldump', [
//     '-u',
//     'root',
//     '-pW3st3rn',
//     'atwa',
// ])




    // dump
    //     .stdout
    //     .pipe(wstream)
    //     .on('finish', function () {
    //         console.log('Completed')
    //     })
    //     .on('error', function (err) {
    //         console.log(err)
    //     })

 


    // fs.appendFile(file, 'holamundo', (err) => {
    //     if (err) {
    //         console.log(err)
    //     }else{   
    //         console.log('todo ok')
    //     }
    // })
    
//}) 


app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token");
    next();   
});

 


app.use('/api/resources',express.static(__dirname + '/public/uploads'));

app.get('/',(req,res)=>{ res.json({messsage:'Welcome to the jungle...'}) })

require('./app/routes/authRoutes')(app)
require('./app/routes/userRoutes')(app)

require('./app/routes/grupoRoutes')(app)
require('./app/routes/productoRoutes')(app)
require('./app/routes/articuloRoutes')(app)

require('./app/routes/bugRoutes')(app)
require('./app/routes/solutionRoutes')(app)
require('./app/routes/commentRoutes')(app)

require('./app/routes/comercioRoutes')(app)

require('./app/routes/categoriaPlatilloRoutes')(app)
require('./app/routes/platilloRoutes')(app)

 


//images
//https://stackoverflow.com/questions/31530200/node-multer-unexpected-field


//server files
//https://www.tutorialsteacher.com/nodejs/serving-static-files-in-nodejs







app.use( (error, req, res, next) => {
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