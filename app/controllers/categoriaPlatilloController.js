const db = require('../models')
const CategoriaPlatillo = db.categoriaPlatillo
const Platillo = db.platillo

const fs = require('fs')
const path = require ('path')



const { isEmpty } = require('../helpers/validations')
const {status, successMessage, errorMessage} = require('../helpers/status')


const getCategorias = async (req,res,next ) => {

    const result = await CategoriaPlatillo
                            .findAll({
                                where: {status: 1},
                                order:  [ ['clave', 'ASC'] ]                               
                            })
                            .catch(next)
  
    return res.status(status.success).send(result)    

}


const createCategoria = async(req,res,next)=> {
    const {clave, nombre}  = req.body
      


    if( isEmpty(clave) || isEmpty(nombre)){
        errorMessage.error ='Todos los campos son requeridos'
        return res.status(status.bad).send(errorMessage)
    }

    const result =  await CategoriaPlatillo.create({
        clave: clave,
        nombre: nombre,        
        status: 1        
    }).catch(next)

    
    return res.status(status.success).send(result)
}


const updateCategoria = async(req,res,next)=>{

    const {clave, nombre}  = req.body

    const registro = await CategoriaPlatillo.findByPk(req.params.id).catch(next)
    

    

    if (registro){
          
     
        const result = await registro.update({
            clave:clave,
            nombre: nombre
        }).catch(next)

     

        return res.status(status.success).send(result)

    }else{
        return res.status(status.nocontent)
    }
}



const removeCategoria = async(req,res,next)=> {


    const registro = await CategoriaPlatillo.findByPk(req.params.id).catch(next)

    
    let validacion1 = await tienePlatillos(req.params.id).catch(next)
    
    
    if (validacion1 != ''){
        errorMessage.error = validacion1
        return res.status(status.bad).send(errorMessage)    
    }


     const result = await CategoriaPlatillo.destroy({
         where: {
             id : req.params.id
         }
     }).catch(next)



    return res.status(200).send('la imagen se borro');    


}


const tienePlatillos = async(id) => {

     try {
        const platillos = await Platillo.findOne({ where: { categoriasPlatilloId: id } });

        if (platillos === null) {
            return ''
        } else {
            return 'No se puede eliminar el registro por que tiene platillos relacionados'
        }

    } catch (err) {
        return  err
    }

}
 



module.exports = {
    getCategorias: getCategorias,
    createCategoria: createCategoria,
    updateCategoria: updateCategoria,
    removeCategoria: removeCategoria
}