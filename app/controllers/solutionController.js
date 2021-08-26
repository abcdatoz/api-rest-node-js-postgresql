const db = require('../models')
const Solution = db.solution

const fs = require('fs')
const path = require ('path')

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
    const {description, query, image, bugId} = req.body

    
    if (isEmpty(description) ){
            errorMessage.error = 'El campo de descripción es requerido'
            return res.status(status.bad).send(errorMessage)
    }


    if ( isEmpty(bugId) ){
            errorMessage.error = 'No se envio el id del bug al que se va a relacionar'
            return res.status(status.bad).send(errorMessage)
    }


    const result = await Solution.create({
        description: description,
        query: query,
        image: req.file.filename,        
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

        let ruta = path.resolve()
        ruta = ruta + '\\public\\uploads\\' + registro.image


        

        const result =  await registro.update({
            description: description,
            query: query,
            image: req.file.filename        
        }).catch(next)

        

        try {
            fs.unlinkSync(ruta);
        } catch (e) {}

        
        return res.status(status.success).send(result)


    }else{
        errorMessage.error = 'El registro no fue localizado'
        return res.status(status.bad).send(errorMessage)
    }
}


const deleteSolution = async(req,res,next)=>{

    const registro = await Solution.findByPk(req.params.id).catch(next)

    let ruta = path.resolve()
    ruta = ruta + '\\public\\uploads\\' + registro.image

    
    const result = await Solution.destroy({
        where: {
            id: req.params.id
        }
    }).catch(next)

    try {
        fs.unlinkSync(ruta);
    } catch (e) {}

    
    
    return res.status(200).send('se elimino la solucion y su imagen adjunta');    
}


module.exports = {
    getSolutions: getSolutions,
    getSolutionById: getSolutionById,
    createSolution: createSolution,
    updateSolution: updateSolution,
    deleteSolution: deleteSolution    
}