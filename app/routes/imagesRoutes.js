
const helpers = require('../helpers/helpers')
const multer =require('multer')
const path = require('path')



const storage = multer.diskStorage({
    destination: function (req,file, cb){
        cb(null, '/uploads/')
    }, 

    filename: function(req,file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }

})




module.exports = function(app){


	


	app.post('/api/upload-image', (req,res) => {

     let upload = multer({ storage: storage }).single('profile_pic');



    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        console.log(req.file)

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
    });
	})
}

