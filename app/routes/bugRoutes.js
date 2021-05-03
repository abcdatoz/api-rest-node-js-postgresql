const { authJwt } = require('../middleware')
const x = require('../controllers/bugController')



module.exports = function (app){
    app.get('/api/bugs/',[authJwt.verifyToken], x.getBugs)
    app.get('/api/bugs/:id',[authJwt.verifyToken], x.getBugById)
    app.post('/api/bugs/',[authJwt.verifyToken], x.createBug)
    app.put('/api/bugs/:id',[authJwt.verifyToken], x.updateBug)
    app.delete('/api/bugs/:id',[authJwt.verifyToken],x.removeBug)
}