const { authJwt } = require('../middleware')
const controller = require('../controllers/ProductooController')


module.exports = function(app){

    app.get('/api/productoss/',[authJwt.verifyToken], controller.get_Productos)
    app.get('/api/productoss/:id',[authJwt.verifyToken], controller.get_ProductoById)
    app.get('/api/productosRestaurant/:id',[authJwt.verifyToken], controller.get_ProductosByRestaurant)
    app.post('/api/productoss/',[authJwt.verifyToken], controller.create_Producto)    
    app.put('/api/productoss/:id', [authJwt.verifyToken], controller.update_Producto)
    app.delete('/api/productoss/:id',[authJwt.verifyToken], controller.remove_Producto)

}


