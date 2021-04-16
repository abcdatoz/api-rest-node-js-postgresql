const { authJwt } = require('../middleware')
const x = require('../controllers/commentController')



module.exports = function(app) {
    app.get('/api/comments',[authJwt.verifyToken], x.getComments)
    app.get('/api/comments/:id',[authJwt.verifyToken], x.getCommentById)
    app.post('/api/comments/',[authJwt.verifyToken],x.createComment)
    app.put('/api/comments/:id',[authJwt.verifyToken], x.updateComment)
    app.delete('/api/comments/:id',[authJwt.verifyToken],x.deleteComment)
}