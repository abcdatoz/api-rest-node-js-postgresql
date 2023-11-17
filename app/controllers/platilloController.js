const db = require('../models')
const Platillo = db.platillo

const fs = require('fs')
const path = require ('path')

const { isEmpty } = require('../helpers/validations')
const { status, successMessage, errorMessage } = require('../helpers/status')

const getPlatillos = async(req,res,next) => {
    const result = await Platillo.findAll({}).catch(next)

    
    return res.status(status.success).send(result)
}


const getPlatilloById = async(req,res,next) => {
    const result = await Platillo.findByPk(req.params.id).catch(next)

    if (result){
        
        return res.status(status.success).send(result )
    }else{
        errorMessage.error = 'El registro no fue localizado en la base de datos'
        return res.status(status.bad).send(errorMessage)
    }

}




const createPlatillo = async (req,res,next) =>{
    const {clave, nombre, descripcion, calorias, minutospreparacion, categoriasPlatilloId} = req.body

    
    if (isEmpty(clave) || isEmpty(nombre) || isEmpty(descripcion) || isEmpty(calorias) || isEmpty(minutospreparacion)){
            errorMessage.error = 'Todos los campos son requeridos'
            return res.status(status.bad).send(errorMessage)
    }

    let image = '' ;    
    
    if (req.file.filename != '')
        image = req.file.filename


    const result = await Platillo.create({
        clave: clave,
        nombre: nombre,        
        descripcion: descripcion,
        calorias: calorias,
        minutospreparacion: minutospreparacion,
        imagen: image,        
        categoriasPlatilloId: categoriasPlatilloId        
    }).catch(next)

    
    
    return res.status(status.success).send(result)
}


const updatePlatillo = async (req,res,next) => {
    const {clave, nombre, descripcion, calorias, minutospreparacion,  categoriasPlatilloId} = req.body

    if (isEmpty(clave) || isEmpty(nombre) || isEmpty(descripcion) || isEmpty(calorias) || isEmpty(minutospreparacion)){
        errorMessage.error = 'Todos los campos son requeridos'
        return res.status(status.bad).send(errorMessage)
    }

    
    const registro = await Platillo.findByPk(req.params.id).catch(next)

    if (registro) {
        
        let image = '' ;    
    
        if (req.file.filename != '')
            image = req.file.filename

        let ruta = path.resolve()
        ruta = ruta + '\\public\\uploads\\' + registro.imagen

        const result =  await registro.update({
            clave: clave,
            nombre: nombre,        
            descripcion: descripcion,
            calorias: calorias,
            minutospreparacion: minutospreparacion,
            imagen: image    

        }).catch(next)

        
        try {
            fs.unlinkSync(ruta);
        } catch (e) {}

        
        return res.status(status.success).send(result)


    }else{
        errorMessage.error = 'El registro no fue localizado'
        return res.status(status.bad).send(errorMessage)
    }
}


const deletePlatillo = async(req,res,next)=>{

    const registro = await Platillo.findByPk(req.params.id).catch(next)

    let ruta = path.resolve()
    ruta = ruta + '\\public\\uploads\\' + registro.imagen
    
    const result = await Platillo.destroy({
        where: {
            id: req.params.id
        }
    }).catch(next)


    try {
        fs.unlinkSync(ruta);
    } catch (e) {}


   
    
    return res.status(200).send('se elimino el platillo y su imagen adjunta');    
}


module.exports = {
    getPlatillos: getPlatillos,
    getPlatilloById: getPlatilloById,
    createPlatillo: createPlatillo,
    updatePlatillo: updatePlatillo,
    deletePlatillo: deletePlatillo    
}