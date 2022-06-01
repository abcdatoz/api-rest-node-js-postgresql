const db = require('../models')
const Orden = db.orden




const { isEmpty } = require('../helpers/validations')
const {status, errorMessage} = require('../helpers/status')


const getOrdenes = async (req,res,next ) => {

    const result = await Orden.findAll({}).catch(next)
  
    return res.status(status.success).send(result)    

}


const getOrdenesByRestaurant = async (req,res,next) => {

    const result = await Orden.findAll({
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

const getOrdenById = async (req,res,next)=>{

    const result = await Orden.findByPk(req.params.id).catch(next)

    if (result){
        
        return res.status(status.success).send(result)

    }else{
        errorMessage.error = 'El registro no fue localizado'
        return res.status(status.bad).send(errorMessage)
    }
}


const createOrden = async(req,res,next)=> {
    const {restaurant, mesero, mesa}  = req.body
      
    if( isEmpty(restaurant) 
        || isEmpty(mesero)
        || isEmpty(mesa)                
        ){
        errorMessage.error ='Todos los campos son requeridos'
        return res.status(status.bad).send(errorMessage)
    }

    const result =  await Orden.create({        
        fecha: '',
        hora: '',
        estatus: 1,
        restaurantId: restaurant,
        meseroId: mesero,
        mesaId: mesa
    }).catch(next)

    
    return res.status(status.success).send(result)
}


const updateOrden = async(req,res,next)=>{
    const {estatus, mesa}  = req.body

    const registro = await Orden.findByPk(req.params.id).catch(next)

 

    if (registro){
          
        const result = await registro.update({            
            estatus: estatus,
            mesaId: mesa            
        }).catch(next)

        return res.status(status.success).send(result)
    }else{
        return res.status(status.nocontent)
    }
}

 
const removeOrden = async(req,res,next)=> {

    
    const result = await Orden.destroy({
        where: {
            id : req.params.id
        }
    }).catch(next)



 
    return res.status(200).send('El registro ha sido eliminado');    

   

}




module.exports = {
    getOrdenes: getOrdenes,
    getOrdenById: getOrdenById,
    getOrdenesByRestaurant: getOrdenesByRestaurant,
    createOrden: createOrden,
    updateOrden: updateOrden,
    removeOrden: removeOrden
}