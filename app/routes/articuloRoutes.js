const { authJwt} = require('../middleware')
const x =  require('../controllers/articuloController')

module.exports = function(app){

    app.get('/api/articulos/',[authJwt.verifyToken], x.getArticulos)
    app.get('/api/articulos/:id',[authJwt.verifyToken], x.getArticulosById)
    app.post('/api/articulos/',[authJwt.verifyToken], x.createArticulo)
    app.put('/api/articulos/:id',[authJwt.verifyToken], x.updateArticulo)
    app.delete('/api/articulos/:id', authJwt.verifyToken, x.deleteArticulo)

}