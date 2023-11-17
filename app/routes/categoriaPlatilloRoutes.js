const { authJwt } = require('../middleware')
const x = require('../controllers/categoriaPlatilloController')


module.exports = function (app){    
    app.get('/api/catplatillos/', x.getCategorias)    
    app.post('/api/catplatillos/',[authJwt.verifyToken], x.createCategoria)
    app.put('/api/catplatillos/:id',[authJwt.verifyToken], x.updateCategoria)
    app.delete('/api/catplatillos/:id',[authJwt.verifyToken],x.removeCategoria)
}

