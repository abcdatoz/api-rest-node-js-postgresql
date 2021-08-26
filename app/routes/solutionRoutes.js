const { authJwt } = require('../middleware')
const x = require('../controllers/solutionController')



let multer = require('multer')


//var upload = multer({ dest: 'public/uploads/'});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.jpg') //Appending .jpg
    }
  })

var upload = multer({ storage: storage });





module.exports = function(app) {
    app.get('/api/solutions',[authJwt.verifyToken], x.getSolutions)
    app.get('/api/solutions/:id',[authJwt.verifyToken], x.getSolutionById)
    app.post('/api/solutions/',[authJwt.verifyToken, upload.single('image') ], x.createSolution)
    app.put('/api/solutions/:id',[authJwt.verifyToken , upload.single('image')], x.updateSolution)
    app.delete('/api/solutions/:id',[authJwt.verifyToken], x.deleteSolution)
}