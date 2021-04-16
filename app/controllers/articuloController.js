const db = require('../models')
const Articulo = db.articulo

const {isEmpty} = require('../helpers/validations')
const { status, successMessage, errorMessage } = require('../helpers/status')


const getArticulos = async(req,res, next)=>{
    

        const result = await  Articulo.findAll({}).catch(next)

        successMessage.data  = result 
        res.status(status.success).send(successMessage)

    

}


const getArticulosById = async(req,res, next)=>{
    
        const result = await Articulo.findByPk(req.params.id).catch(next)

        if (result){
            successMessage.data = result
            res.status(status.success).send(successMessage)

        }else{
            errorMessage.error = 'El registro no fue localizado en la BD'
            res.status(status.bad).send(errorMessage)
        }
}


const createArticulo = async(req,res,next)=>{        

            const {clave, nombre, partida, precio, firstBuy, lastBuy, producto } = req.body

            if(isEmpty(clave) 
            || isEmpty(nombre) 
            || isEmpty(partida) 
            || isEmpty(precio) 
            || isEmpty(firstBuy) 
            || isEmpty(lastBuy)
            || isEmpty(producto)
            ){
                errorMessage.error = 'todos los campos son requeridos'
                res.status(status.bad).send(errorMessage)
            }

            const result = await Articulo.create({
                clave: clave, 
                nombre: nombre,
                partida: partida,
                precio: precio, 
                firstBuy: firstBuy,
                lastBuy: lastBuy,
                productoId: producto
            }).catch(next)

            successMessage.data = result
            res.status(status.success).send(successMessage)
         
}

const updateArticulo =async (req,res, next)=>{

        const {clave, nombre, partida, precio, firstBuy, lastBuy, producto } = req.body

            if(isEmpty(clave) 
            || isEmpty(nombre) 
            || isEmpty(partida) 
            || isEmpty(precio) 
            || isEmpty(firstBuy) 
            || isEmpty(lastBuy)
            || isEmpty(producto)
            ){
                errorMessage.error = 'todos los campos son requeridos'
                res.status(status.bad).send(errorMessage)
            }

            const registro = await Articulo.findByPk(req.params.id).catch(next)
            if(registro){

                const result = await registro.update({
                                                    clave: clave, 
                                                    nombre: nombre,
                                                    partida: partida,
                                                    precio: precio, 
                                                    firstBuy: firstBuy,
                                                    lastBuy: lastBuy,
                                                    productoId: producto
                                                }).catch(next)

                successMessage.data = result
                res.status(status.success).send(successMessage)

            }else{
                errorMessage.error = 'El registro no fue localizado en la BD'
                res.status(status.bad).send(errorMessage)
            }


   
}


const deleteArticulo = async(req,res,next)=>{
    

        const result = await Articulo.destroy({
            where: {
                id: req.params.id
            }
        }).catch(next)


        successMessage.data =result 
        res.status(status.success).send(successMessage)

    
}


module.exports = {
    getArticulos: getArticulos,
    getArticulosById: getArticulosById,
    createArticulo: createArticulo,
    updateArticulo: updateArticulo,
    deleteArticulo: deleteArticulo

}
