const db = require('../models');
const Grupo = db.grupo;

const {isEmpty} = require('../helpers/validations');
const  {status, successMessage, errorMessage } = require('../helpers/status');


const getGrupos = async (req, res, next) => {
    
    
    const results = await Grupo.findAll({}).catch(next)

    
    return res.status(status.success).send(results)

}


const getGrupoById = async (req, res, next) => {
    
        const results = await Grupo.findByPk(req.params.id).catch(next)

        if (results){            
            return res.status(status.success).send(results)
        }else{            
            errorMessage.error = 'el registro no fue localizado'
            return res.status(status.bad).send(errorMessage)
        }        


}



const createGrupo = async (req,res, next) => {

        const {clave, nombre} = req.body;

        if( isEmpty(clave) || isEmpty(nombre)){
            errorMessage.error ='Todos los campos son requeridos'
            return res.status(status.bad).send(errorMessage)
        }

        const results = await Grupo.create({
            clave: clave,
            nombre: nombre,
            userId: req.userId
        }).catch(next)

        
        successMessage.data = results
        return res.status(status.created).send(successMessage)

}

const updateGrupo = async (req,res, next)=>{
    
        const {clave, nombre} = req.body

        const registro = await Grupo.findByPk(req.params.id).catch(next)
        
        if(registro){
            const results = await registro.update({
                clave: clave,
                nombre: nombre,
            }).catch(next)

            
            return res.status(status.success).send(results)

        }else{
            return res.status(status.nocontent)
        }
        
    
}

const deleteGrupo = async (req,res, next)=> {

    const results = await Grupo.destroy({
        where: {
            id: req.params.id
        }
    }).catch(next)

    
    return res.status(status.success).send(results)


}


module.exports = {
    getGrupos: getGrupos,
    getGrupoById: getGrupoById,
    createGrupo: createGrupo,
    updateGrupo: updateGrupo,
    deleteGrupo: deleteGrupo
}


