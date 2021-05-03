const db = require('../models')
const Solution = db.solution


const { isEmpty } = require('../helpers/validations')
const { status, successMessage, errorMessage } = require('../helpers/status')

const getSolutions = async(req,res,next) => {
    const result = await Solution.findAll({}).catch(next)

    
    return res.status(status.success).send(result)
}


const getSolutionById = async(req,res,next) => {
    const result = await Solution.findByPk(req.params.id).catch(next)

    if (result){
        
        return res.status(status.success).send(result )
    }else{
        errorMessage.error = 'El registro no fue localizado en la base de datos'
        return res.status(status.bad).send(errorMessage)
    }

}

const createSolution = async (req,res,next) =>{
    const {description, query, image, file, bugId} = req.body

    if (isEmpty(description) ){
            errorMessage.error = 'El campo de descripcion es requerido'
            return res.status(status.bad).send(errorMessage)
    }


    if ( isEmpty(bugId) ){
            errorMessage.error = 'No se envio el id del bug al que se va a relacionar'
            return res.status(status.bad).send(errorMessage)
    }


    const result = await Solution.create({
        description: description,
        query: query,
        image: image,
        file: file,
        bugId: bugId,
        userId: req.userId
    }).catch(next)

    
    return res.status(status.success).send(result)
}


const updateSolution = async (req,res,next) => {
    const {description, query, image, file, bugId} = req.body

    if (isEmpty(description)
        || isEmpty(bugId) ){
            errorMessage.error = 'El campo de descripcion es requerido'
            return res.status(status.bad).send(errorMessage)
    }

    const registro = await Solution.findByPk(req.params.id).catch(next)

    if (registro) {
        const result =  await Solution.update({
            description: description,
            query: query,
            image: image,
            file: file
        }).catch(next)

        
        return res.status(status.success).send(result)
    }else{
        errorMessage.error = 'El registro no fue localizado'
        return res.status(status.bad).send(errorMessage)
    }
}


const deleteSolution = async(req,res,next)=>{
    
    const result = await Solution.destroy({
        where: {
            id: req.params.id
        }
    }).catch(next)

    
    return res.status(status.success).send(result)
}


module.exports = {
    getSolutions: getSolutions,
    getSolutionById: getSolutionById,
    createSolution: createSolution,
    updateSolution: updateSolution,
    deleteSolution: deleteSolution    
}