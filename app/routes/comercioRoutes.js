const controller = require('../controllers/comercioController')


module.exports = function(app){
    app.get('/api/comercios/', controller.getComercios)        
}


