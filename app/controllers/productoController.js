const db = require('../models')
const Producto = db.producto

const { isEmpty } = require('../helpers/validations')
const {status, successMessage, errorMessage} = require('../helpers/status')




const getProductos = async(req,res, next) => {

    const result = await Producto.findAll({}).catch(next)

    successMessage.data = result
    return res.status(status.success).send(successMessage)

}


const getProductoById = async(req,res, next)=>{

    const results = await Producto.findByPk(req.params.id).catch(next)

    if (results){
        successMessage.data = results 
        res.status(status.success).send(successMessage)

    }else{
        errorMessage.error = 'El registro no fue localizado en la BD'
        res.status(status.bad).send(errorMessage)
    }

}


const createProducto = async(req,res,next) => {
     

    const {clave, nombre, grupo} = req.body

    if (isEmpty(clave) || isEmpty(nombre) || isEmpty(grupo)){
        errorMessage.error = 'Todos los campos son requeridos'
        res.status(status.bad)            
    }

    const result = await Producto.create({
        clave: clave,
        nombre: nombre,
        grupoId: grupo,
        userId: req.userId
    }).catch(next)

    successMessage.data = result
    res.status(status.created).send(successMessage) 
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

        successMessage.data = result 
        res.status(status.success).send(successMessage)

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

        successMessage.data = result
        res.status(status.success).send(successMessage)

}

module.exports = {
    getProductos: getProductos,
    getProductoById: getProductoById,
    createProducto: createProducto,
    updateProducto: updateProducto,
    deleteProducto: deleteProducto
}