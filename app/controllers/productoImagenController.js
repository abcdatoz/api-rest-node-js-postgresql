const db = require('../models')
const ProductoImagen = db.ProductoImagen


const fs = require('fs')
const path = require ('path')




const { isEmpty } = require('../helpers/validations')
const {status, successMessage, errorMessage} = require('../helpers/status')


const getProductoImagenes = async (req,res,next ) => {

    const result = await ProductoImagen.findAll({}).catch(next)
  
    return res.status(status.success).send(result)    

}


const getImagenesByProducto = async (req,res,next) => {

    const result = await ProductoImagen.findAll({
        where: {
            productoId: req.params.id
        }
    });

    if (result){
        return res.status(status.success).send(result)
    }else{
        errorMessage.error = 'El registro no fue lozalizado'
        return res.status(status.bad).send(errorMessage)
    }
}

const getProductoImagenById = async (req,res,next)=>{

    const result = await ProductoImagen.findByPk(req.params.id).catch(next)

    if (result){
        
        return res.status(status.success).send(result)

    }else{
        errorMessage.error = 'El registro no fue localizado'
        return res.status(status.bad).send(errorMessage)
    }
}


const createProductoImagen = async(req,res,next)=> {
    const {numero, producto}  = req.body
      
    if( isEmpty(numero) 
        || isEmpty(imagen)        
        || isEmpty(producto)
        ){
        errorMessage.error ='Todos los campos son requeridos'
        return res.status(status.bad).send(errorMessage)
    }

    const result =  await ProductoImagen.create({
        numero: numero,
        imagen: req.file.filename,        
        estatus: 1,
        productoId: producto
    }).catch(next)

    
    return res.status(status.success).send(result)
}


 
const removeProductoImagen = async(req,res,next)=> {

    
    const registro = await ProductoImagen.findByPk(req.params.id).catch(next)

    let ruta = path.resolve()
    ruta = ruta + '\\public\\uploads\\' + registro.imagen


    const result = await ProductoImagen.destroy({
        where: {
            id : req.params.id
        }
    }).catch(next)



    try {
        fs.unlinkSync(ruta);
    } catch (e) {}


 
    return res.status(200).send('la imagen se borro');      

   

}


module.exports = {
    getProductoImagenes: getProductoImagenes,
    getImagenesByProducto: getImagenesByProducto,
    getProductoImagenById: getProductoImagenById,    
    removeProductoImagen: removeProductoImagen
}