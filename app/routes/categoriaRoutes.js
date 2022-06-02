const { authJwt } = require('../middleware')
const controller = require('../controllers/categoriaController')


module.exports = function(app){

    app.get('/api/categorias/',[authJwt.verifyToken], controller.getCategorias)    

}


