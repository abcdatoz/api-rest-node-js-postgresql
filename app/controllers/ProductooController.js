const db = require('../models')
const Producto = db.troductos




const { isEmpty } = require('../helpers/validations')
const {status, successMessage, errorMessage} = require('../helpers/status')


const get_Productos = async (req,res,next ) => {

    const result = await Producto.findAll({}).catch(next)
  
    return res.status(status.success).send(result)    

}


const get_ProductosByRestaurant = async (req,res,next) => {

    const result = await Producto.findAll({
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

const get_ProductoById = async (req,res,next)=>{

    const result = await Producto.findByPk(req.params.id).catch(next)

    if (result){
        
        //return res.status(status.success).send(result)
        errorMessage.error = 'El registro no fue localizado'
        return res.status(status.bad).send(errorMessage)

    }else{
        errorMessage.error = 'El registro no fue localizado'
        return res.status(status.bad).send(errorMessage)
    }
}


const create_Producto = async(req,res,next)=> {
    const {clave, nombre, categoria, descripcionA,descripcionB,descripcionC, precio, calorias,tiempoPreparacion}  = req.body
      
    if( isEmpty(clave) 
        || isEmpty(nombre)
        || isEmpty(descripcionA)
        || isEmpty(precio)
        || isEmpty(calorias)
        || isEmpty(tiempoPreparacion)
        || isEmpty(categoria)
        ){
        errorMessage.error ='Todos los campos son requeridos'
        return res.status(status.bad).send(errorMessage)
    }

    const result =  await Producto.create({
        clave: clave,
        nombre: nombre,
        descripcionA: descripcionA,
        descripcionB: descripcionB,
        descripcionC: descripcionC,
        precio: precio,
        calorias: calorias,
        tiempoPreparacion: tiempoPreparacion,
        estatus: 1,
        categoriaId: categoria
    }).catch(next)

    
    return res.status(status.success).send(result)
}


const update_Producto = async(req,res,next)=>{
    const {clave, nombre, categoria, descripcionA,descripcionB,descripcionC, precio, calorias,tiempoPreparacion}  = req.body

    const registro = await Producto.findByPk(req.params.id).catch(next)

 

    if (registro){
          
        const result = await registro.update({
            clave: clave,
            nombre: nombre,
            descripcionA: descripcionA,
            descripcionB: descripcionB,
            descripcionC: descripcionC,
            precio: precio,
            calorias: calorias,
            tiempoPreparacion: tiempoPreparacion            
        }).catch(next)

        return res.status(status.success).send(result)
    }else{
        return res.status(status.nocontent)
    }
}

 
const remove_Producto = async(req,res,next)=> {

    
    const result = await Producto.destroy({
        where: {
            id : req.params.id
        }
    }).catch(next)



 
    return res.status(200).send('El registro ha sido eliminado');    

   

}




module.exports = {
    get_Productos: get_Productos,
    get_ProductoById: get_ProductoById,
    get_ProductosByRestaurant: get_ProductosByRestaurant,
    create_Producto: create_Producto,
    update_Producto: update_Producto,
    remove_Producto: remove_Producto
}