const db = require('../models')
const Comercio = db.comercio




const { isEmpty } = require('../helpers/validations')
const {status, successMessage, errorMessage} = require('../helpers/status')


const getComercios = async (req,res,next ) => {

    const result = await Comercio.findAll({}).catch(next)
  
    return res.status(status.success).send(result)    

}

 




module.exports = {
    getComercios: getComercios,
    
}