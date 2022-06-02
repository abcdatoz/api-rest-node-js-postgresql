const db = require('../models')
const Preorden = db.preorden




const { isEmpty } = require('../helpers/validations')
const {status, errorMessage} = require('../helpers/status')


const getPreordenes = async (req,res,next ) => {

    const result = await Preorden.findAll({}).catch(next)
  
    return res.status(status.success).send(result)    

}


const getPreordenesByRestaurant = async (req,res,next) => {

    const result = await Preorden.findAll({
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

const getPreordenById = async (req,res,next)=>{

    const result = await Preorden.findByPk(req.params.id).catch(next)

    if (result){
        
        return res.status(status.success).send(result)

    }else{
        errorMessage.error = 'El registro no fue localizado'
        return res.status(status.bad).send(errorMessage)
    }
}


const createPreorden = async(req,res,next)=> {
    const {restaurant, nombreCliente}  = req.body
      
    if( isEmpty(restaurant) 
        || isEmpty(nombreCliente)        
        ){
        errorMessage.error ='Todos los campos son requeridos'
        return res.status(status.bad).send(errorMessage)
    }

    const result =  await Preorden.create({        
        fecha: '',
        hora: '',
        nombreCliente: nombreCliente,
        estatus: 1,
        restaurantId: restaurant,        
    }).catch(next)

    
    return res.status(status.success).send(result)
}


const updatePreorden = async(req,res,next)=>{
    const {estatus}  = req.body

    const registro = await Preorden.findByPk(req.params.id).catch(next)

 

    if (registro){
          
        const result = await registro.update({            
            estatus: estatus        
        }).catch(next)

        return res.status(status.success).send(result)
    }else{
        return res.status(status.nocontent)
    }
}

 
const removePreorden = async(req,res,next)=> {

    
    const result = await Preorden.destroy({
        where: {
            id : req.params.id
        }
    }).catch(next)



 
    return res.status(200).send('El registro ha sido eliminado');    

   

}




module.exports = {
    getPreordenes: getPreordenes,
    getPreordenById: getPreordenById,
    getPreordenesByRestaurant: getPreordenesByRestaurant,
    createPreorden: createPreorden,
    updatePreorden: updatePreorden,
    removePreorden: removePreorden
}