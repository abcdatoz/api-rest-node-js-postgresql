const db = require('../models')
const Comment = db.comment


const { isEmpty } = require('../helpers/validations')
const { status, successMessage, errorMessage } = require('../helpers/status')
const { solution } = require('../models')

const getComments = async(req,res,next) => {
    const result = await Comment.findAll({}).catch(next)

    successMessage.data = result
    return res.status(status.success).send(successMessage)
}


const getCommentById = async(req,res,next) => {
    const result = await Comment.findByPk(req.params.id).catch(next)

    if (result){        
        return res.status(status.success).send(result)
    }else{
        errorMessage.error = 'El registro no fue localizado en la base de datos'
        return res.status(status.bad).send(errorMessage)
    }

}

const createComment = async (req,res,next) =>{
    const {message} = req.body

    if (isEmpty(message) ){
        errorMessage.error = 'El campo de descripcion es requerido'
        return res.status(status.bad).send(errorMessage)
    }


    if ( isEmpty(solutionId) ){
            errorMessage.error = 'No se envio el id de la solución al que se va a relacionar'
            return res.status(status.bad).send(errorMessage)
    }

    const result = await Comment.create({
        message: message,        
        solutionId: solutionId,
        userId: req.userId
    }).catch(next)
    
    return res.status(status.success).send(result)
}


const updateComment = async (req,res,next) => {
    const {message} = req.body

    if (isEmpty(message) ){
        errorMessage.error = 'El campo de descripcion es requerido'
        return res.status(status.bad).send(errorMessage)
    }

    const registro = await Comment.findByPk(req.params.id).catch(next)

    if (registro) {
        const result =  await Solution.update({
            message: message
        }).catch(next)
        
        return res.status(status.success).send(result )
    }else{
        errorMessage.error = 'El registro no fue localizado'
        return res.status(status.bad).send(errorMessage)
    }
}


const deleteComment = async(req,res,next)=>{
    
    const result = await Comment.destroy({
        where: {
            id: req.params.id
        }
    }).catch(next)

    
    return res.status(status.success).send(result )
}


module.exports = {
    getComments: getComments,
    getCommentById: getCommentById,
    createComment: createComment,
    updateComment: updateComment,
    deleteComment: deleteComment    
}