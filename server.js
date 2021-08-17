const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

 

app.use(express.static('public'))

let corsOptions = { origin: false }
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const db = require("./app/models");
const Role = db.role;


/*
 db.sequelize.sync({force:true})
     .then(()=>{ 
         console.log("Drop and Resync Db");        
          initial()
     });
*/


 


app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token");
    next();   
});

 


app.use('/resources',express.static(__dirname + '/public/uploads'));

app.get('/',(req,res)=>{ res.json({messsage:'Welcome to the jungle...'}) })

require('./app/routes/authRoutes')(app)
require('./app/routes/userRoutes')(app)

require('./app/routes/grupoRoutes')(app)
require('./app/routes/productoRoutes')(app)
require('./app/routes/articuloRoutes')(app)

require('./app/routes/bugRoutes')(app)
require('./app/routes/solutionRoutes')(app)
require('./app/routes/commentRoutes')(app)





// https://www.w3jar.com/node-file-upload-with-express-js/       this  works for images
//const fs = require('fs');
//const fileupload =require('express-fileupload')
//const path = require ('path')

// app.use(fileupload({
//     useTempFiles: true,
//     tempFileDir: path.join(__dirname,'tmp')
// }))



// app.post('/api/upload', (req,res) => {

//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).send('No files were uploaded.');
//     }

//     let targetFile = req.files.target_file;
//     let extName = path.extname(targetFile.name);
//     let baseName = path.basename(targetFile.name, extName);
//     let uploadDir = path.join(__dirname, 'uploads', targetFile.name);

    
//     let imgList = ['.png','.jpg','.jpeg','.gif'];
//     // Checking the file type
//     if(!imgList.includes(extName)){
//         fs.unlinkSync(targetFile.tempFilePath);
//         return res.status(422).send("Invalid Image");
//     }
    
    
//     if(targetFile.size > 1048576){
//         fs.unlinkSync(targetFile.tempFilePath);
//         return res.status(413).send("File is too Large");
//     }

//     // Renaming the file
//     let num = 1;
//     while(fs.existsSync(uploadDir)){
//         uploadDir = path.join(__dirname, 'uploads', baseName + '-' + num + extName);
//         num++;
//     }

//     targetFile.mv(uploadDir, (err) => {
//         if (err)
//             return res.status(500).send(err);
//         res.send('File uploaded!');
//     });

// })


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