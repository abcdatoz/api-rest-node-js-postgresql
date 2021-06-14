const { authJwt } = require('../middleware')
const x = require('../controllers/bugController')

let multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.jpg') //Appending .jpg
    }
  })

var upload = multer({ storage: storage });


module.exports = function (app){
    app.get('/api/bugs/',[authJwt.verifyToken], x.getBugs)
    app.get('/api/bugs/:id',[authJwt.verifyToken], x.getBugById)
    app.post('/api/bugs/',[authJwt.verifyToken, upload.single('bug_image')], x.createBug)
    app.put('/api/bugs/:id',[authJwt.verifyToken], x.updateBug)
    app.delete('/api/bugs/:id',[authJwt.verifyToken],x.removeBug)
}