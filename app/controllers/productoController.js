const db = require('../models')
const Producto = db.producto

const { isEmpty } = require('../helpers/validations')
const {status, successMessage, errorMessage} = require('../helpers/status')




const getProductos = async(req,res) => {
    try{
        const result = await Producto.findAll({})

        successMessage.data = result
        return res.status(status.success).send(successMessage)

    }
    catch(e){
        console.log(e)
        errorMessage.error = e 
        res.status(status.bad).send(errorMessage)
    }
}


const getProductoById = async(req,res)=>{
    try{

        const results = await Producto.findByPk(req.params.id)

        if (results){
            successMessage.data = results 
            res.status(status.success).send(successMessage)

        }else{
            errorMessage.error = 'El registro no fue localizado en la BD'
            res.status(status.bad).send(errorMessage)
        }

    }catch(e){
        console.log(e)
        errorMessage.error = e 
        res.status(status.bad).send(errorMessage)
    }
}


const createProducto = async(req,res) => {
    try{

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
        })

        successMessage.data = result
        res.status(status.created).send(successMessage)



    }catch(e){
        console.log(e)
        errorMessage.error = e 
        res.status(res.bad).send(errorMessage)

    }
}


const updateProducto = async(req,res) => {
    try{

        const {clave, nombre, grupo} = req.body 
        const registro = await Producto.findByPk(req.params.id)

        if (registro){

            const result = await registro.update({
                clave: clave,
                nombre: nombre,
                grupo: grupo
            })

            successMessage.data = result 
            res.status(status.success).send(successMessage)

        }else{
            errorMessage.error = 'El registro no fue localizado en la BD'
            res.status(status.bad).send(errorMessage)
        }


    }catch(e){
        console.log(e)
        errorMessage.error = e 
        res.status(status.bad).send(errorMessage)
    }
}

const deleteProducto = async(req,res) => {
    try {

        const result = await Producto.destroy({
            where: {
                id: req.params.id
            }
        })

        successMessage.data = result
        res.status(status.success).send(successMessage)

    }
    catch(e){
        console.log(e)
        errorMessage.error = e 
        res.status(status.bad).send(errorMessage)
    }
}

module.exports = {
    getProductos: getProductos,
    getProductoById: getProductoById,
    createProducto: createProducto,
    updateProducto: updateProducto,
    deleteProducto: deleteProducto
}