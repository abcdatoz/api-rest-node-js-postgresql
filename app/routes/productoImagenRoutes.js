const { authJwt } = require('../middleware')
const x = require('../controllers/productoImagenController')

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
    app.get('/api/productoImagen/', x.getProductoImagenes)    
    app.get('/api/productoImagen/:id', x.getProductoImagenById)
    app.post('/api/productoImagen/',[authJwt.verifyToken, upload.single('imagen')], x.createProductoImagen)    
    app.delete('/api/productoImagen/:id',[authJwt.verifyToken],x.removeProductoImagen)
}

