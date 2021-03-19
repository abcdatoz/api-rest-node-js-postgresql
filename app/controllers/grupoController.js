const db = require('../models');
const Grupo = db.grupo;

const {isEmpty} = require('../helpers/validations');
const  {status, successMessage, errorMessage } = require('../helpers/status');


const getGrupos = async (req, res) => {
    
    try{
        const results = await Grupo.findAll({})

        successMessage.data = results
        return res.status(status.success).send(successMessage)
    }
    catch(e){      
        console.log(e) 
        errorMessage.error = e
        return res.status(status.bad).send(errorMessage)
    }
}


const getGrupoById = async (req, res) => {
    
    try{

        const results = await Grupo.findByPk(req.params.id)

        if (results){
            successMessage.data = results
            return res.status(status.success).send(successMessage)
        }else{            
            errorMessage.error = 'el registro no fue localizado'
            return res.status(status.bad).send(errorMessage)
        }        

    }
    catch(e){      
        console.log(e) 
        errorMessage.error = e
        return res.status(status.bad).send(errorMessage)
    }
}



const createGrupo = async (req,res) => {

    try{   

        const {clave, nombre} = req.body;

        if( isEmpty(clave) || isEmpty(nombre)){
            errorMessage.error ='Todos los campos son requeridos'
            return res.status(status.bad).send(errorMessage)
        }

        const results = await Grupo.create({
            clave: clave,
            nombre: nombre,
            userId: req.userId
        })

        
        successMessage.data = results
        return res.status(status.created).send(successMessage)

    }catch(e){       
        errorMessage.error = e
        return res.status(status.bad).send(errorMessage)
    }
}

const updateGrupo = async (req,res)=>{
    try{
        const {clave, nombre} = req.body

        const registro = await Grupo.findByPk(req.params.id)
        
        if(registro){
            const results = await registro.update({
                clave: clave,
                nombre: nombre,
            })

            successMessage.data = results
            return res.status(status.success).send(successMessage)
        }else{
            return res.status(status.nocontent)
        }
        
    }
    catch(e){
        console.log(e)
        errorMessage.error=e
        return res.status(status.bad).send(errorMessage)
        
    }
}

const deleteGrupo = async (req,res)=> {

     try{

            
            const results = await Grupo.destroy({
                where: {
                    id: req.params.id
                }
            })

            successMessage.data = results
            return res.status(status.success).send(successMessage)

    }
    catch(e){
        console.log(e)
        errorMessage.error=e
        return res.status(status.bad).send(errorMessage)
        
    }
}


module.exports = {
    getGrupos: getGrupos,
    getGrupoById: getGrupoById,
    createGrupo: createGrupo,
    updateGrupo: updateGrupo,
    deleteGrupo: deleteGrupo
}


