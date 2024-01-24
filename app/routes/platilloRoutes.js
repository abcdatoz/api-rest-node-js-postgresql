const { authJwt } = require('../middleware')
const x = require('../controllers/platilloController')

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





module.exports = function(app) {
    // app.get('/api/platillos',[authJwt.verifyToken], x.getPlatillos)
    app.get('/api/platillos', x.getPlatillos)
    app.get('/api/platillosFromSQL', x.getFromQuery)
    app.get('/api/platillos/:id',[authJwt.verifyToken], x.getPlatilloById)
    app.post('/api/platillos/',[authJwt.verifyToken, upload.single('imagen') ], x.createPlatillo)
    app.put('/api/platillos/:id',[authJwt.verifyToken , upload.single('imagen')], x.updatePlatillo)
    app.delete('/api/platillos/:id',[authJwt.verifyToken], x.deletePlatillo)
}