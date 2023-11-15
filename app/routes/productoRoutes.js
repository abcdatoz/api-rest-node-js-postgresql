const { authJwt } = require('../middleware')
const controller = require('../controllers/productoController')


module.exports = function(app){

    // app.get('/api/productos/',[authJwt.verifyToken], controller.getProductos)
    // app.get('/api/productos/:id',[authJwt.verifyToken], controller.getProductoById)
    // app.post('/api/productos/',[authJwt.verifyToken], controller.createProducto)    
    // app.put('/api/productos/:id', [authJwt.verifyToken], controller.updateProducto)
    // app.delete('/api/productos/:id',[authJwt.verifyToken], controller.deleteProducto)

    app.get('/api/productos/', controller.getProductos)
    app.get('/api/productos/:id', controller.getProductoById)
    app.post('/api/productos/',  controller.createProducto)    
    app.put('/api/productos/:id',  controller.updateProducto)
    app.delete('/api/productos/:id',  controller.deleteProducto)

}


