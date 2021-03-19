const { authJwt } = require('../middleware')
const controller = require('../controllers/grupoController')



module.exports = function(app){

    app.get('/api/grupos/',[authJwt.verifyToken], controller.getGrupos);    
    app.get('/api/grupos/:id',[authJwt.verifyToken], controller.getGrupoById);    
    app.post('/api/grupos/', [authJwt.verifyToken], controller.createGrupo);    
    app.put('/api/grupos/:id',[authJwt.verifyToken], controller.updateGrupo);
    app.delete('/api/grupos/:id',[authJwt.verifyToken], controller.deleteGrupo);
    
}