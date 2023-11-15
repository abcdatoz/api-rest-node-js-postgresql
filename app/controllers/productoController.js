const db = require('../models')
const Producto = db.producto

const { isEmpty } = require('../helpers/validations')
const {status, successMessage, errorMessage} = require('../helpers/status')




const getProductos = async(req,res, next) => {

    const result = await Producto.findAll({}).catch(next)

    
    return res.status(status.success).send(result)

}


const getProductoById = async(req,res, next)=>{

    const results = await Producto.findByPk(req.params.id).catch(next)

    if (results){
        
        res.status(status.success).send(results )

    }else{
        errorMessage.error = 'El registro no fue localizado en la BD'
        res.status(status.bad).send(errorMessage)
    }

}


const createProducto = async(req,res,next) => {
     
    console.log('body')
    console.log(req.body)
    const {clave, nombre, grupo} = req.body

    if (isEmpty(clave) || isEmpty(nombre) || isEmpty(grupo)){
        errorMessage.error = 'Todos los campos son requeridos'
        res.status(status.bad)            
    }

    const result = await Producto.create({
        clave: clave,
        nombre: nombre,
        grupoId: grupo,
        userId: '46009f18-881b-4206-885f-aae0c8086234'//req.userId
    }).catch(next)

    
    res.status(status.created).send(result) 
}


const updateProducto = async(req,res,next) => {

    const {clave, nombre, grupo} = req.body 
    const registro = await Producto.findByPk(req.params.id).catch(next)

    if (registro){

        const result = await registro.update({
            clave: clave,
            nombre: nombre,
            grupo: grupo
        }).catch(next)

        
        res.status(status.success).send(result )

    }else{
        errorMessage.error = 'El registro no fue localizado en la BD'
        res.status(status.bad).send(errorMessage)
    }

 
}

const deleteProducto = async(req,res,next) => {
        const result = await Producto.destroy({
            where: {
                id: req.params.id
            }
        }).catch(next)

        
        res.status(status.success).send(result)

}

module.exports = {
    getProductos: getProductos,
    getProductoById: getProductoById,
    createProducto: createProducto,
    updateProducto: updateProducto,
    deleteProducto: deleteProducto
}