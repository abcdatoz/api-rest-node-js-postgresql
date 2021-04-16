const { authJwt } = require('../middleware')
const x = require('../controllers/solutionController')



module.exports = function(app) {
    app.get('/api/solutions',[authJwt.verifyToken], x.getSolutions)
    app.get('/api/solutions/:id',[authJwt.verifyToken], x.getSolutionById)
    app.post('/api/solutions/',[authJwt.verifyToken],x.createSolution)
    app.put('/api/solutions/:id',[authJwt.verifyToken], x.updateSolution)
    app.delete('/api/solutions/:id',[authJwt.verifyToken],x.deleteSolution)
}