const db = require('../models')
const Mesero = db.mesero




const { isEmpty } = require('../helpers/validations')
const {status, successMessage, errorMessage} = require('../helpers/status')


const getMeseros = async (req,res,next ) => {

    const result = await Mesero.findAll({}).catch(next)
  
    return res.status(status.success).send(result)    

}


const getMeserosByRestaurant = async (req,res,next) => {

    const result = await Mesero.findAll({
        where: {
            restaurantId: req.params.id
        }
    });

    if (result){
        return res.status(status.success).send(result)
    }else{
        errorMessage.error = 'El registro no fue lozalizado'
        return res.status(status.bad).send(errorMessage)
    }
}

const getMeseroById = async (req,res,next)=>{

    const result = await Mesero.findByPk(req.params.id).catch(next)

    if (result){
        
        return res.status(status.success).send(result)

    }else{
        errorMessage.error = 'El registro no fue localizado'
        return res.status(status.bad).send(errorMessage)
    }
}


const createMesero = async(req,res,next)=> {
    const { nombre,password, nombre_completo,restaurant}  = req.body
      
    if( isEmpty(nombre) 
        || isEmpty(password)
        || isEmpty(nombre_completo)        
        || isEmpty(restaurant)
        ){
        errorMessage.error ='Todos los campos son requeridos'
        return res.status(status.bad).send(errorMessage)
    }

    const result =  await Mesero.create({        
        nombre: nombre,
        password: password,
        nombre_completo: nombre_completo,        
        estatus: 1,
        restaurantId: restaurant
    }).catch(next)

    
    return res.status(status.success).send(result)
}


const updateMesero = async(req,res,next)=>{
    const {nombre, password, nombre_completo}  = req.body

    const registro = await Mesero.findByPk(req.params.id).catch(next)

 

    if (registro){
          
        const result = await registro.update({            
            nombre: nombre,
            password: password,
            nombre_completo: nombre_completo            
        }).catch(next)

        return res.status(status.success).send(result)
    }else{
        return res.status(status.nocontent)
    }
}

 
const removeMesero = async(req,res,next)=> {

    
    const result = await Mesero.destroy({
        where: {
            id : req.params.id
        }
    }).catch(next)



 
    return res.status(200).send('El registro ha sido eliminado');    

   

}




module.exports = {
    getMeseros: getMeseros,
    getMeseroById: getMeseroById,
    getMeserosByRestaurant: getMeserosByRestaurant,
    createMesero: createMesero,
    updateMesero: updateMesero,
    removeMesero: removeMesero
}