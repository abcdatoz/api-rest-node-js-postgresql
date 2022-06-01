const db = require('../models')
const Categoria = db.categoria




const { isEmpty } = require('../helpers/validations')
const {status, successMessage, errorMessage} = require('../helpers/status')


const getCategorias = async (req,res,next ) => {

    const result = await Categoria.findAll({}).catch(next)
  
    return res.status(status.success).send(result)    

}

 




module.exports = {
    getCategorias: getCategorias,
    
}