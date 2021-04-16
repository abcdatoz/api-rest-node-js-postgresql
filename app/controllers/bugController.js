const db = require('../models')
const Bug = db.bug

const { isEmpty} = require('../helpers/validations')
const {status, successMessage, errorMessage} = require('../helpers/status')


const getBugs = async (req,res,next ) => {

    const result = await Bug.findAll({}).catch(next)
  

    successMessage.data = result
    return res.status(status.success).send(successMessage)    

}

const getBugById = async (req,res,next)=>{

    const result = await Bug.findByPk(req.params.id).catch(next)

    if (result){
        successMessage.data = result
        return res.status(status.success).send(successMessage)

    }else{
        errorMessage.error = 'El registro no fue localizado'
        return res.status(status.bad).send(errorMessage)
    }

}


const createBug = async(req,res,next)=> {
    const {bug_address, bug_description, bug_image, bug_date}  = req.body
    
    
    if( isEmpty(bug_address) 
        || isEmpty(bug_description)
        || isEmpty(bug_image)
        || isEmpty(bug_date)
        ){
        errorMessage.error ='Todos los campos son requeridos'
        return res.status(status.bad).send(errorMessage)
    }

    const result =  await Bug.create({
        bug_address: bug_address,
        bug_description: bug_description,
        bug_image: bug_image,
        bug_date: bug_date,
        bug_status: 1,
        userId: req.userId
    }).catch(next)

    successMessage.data = result 
    return res.status(status.success).send(successMessage)
}

const removeBug = async(req,res,next)=> {

    const registro = await Bug.findByPk(req.params.id).catch(next)

    if(registro){

        const result = registro.update({ bug_status : 0}).catch(next)
        
        successMessage.data = result 
        return res.status(status.success).send(successMessage)


    }else{
        errorMessage.error = 'El registro no fue localizado en la bd'
        return res.status(status.bad).send(errorMessage)
    }

}




module.exports = {
    getBugs: getBugs,
    getBugById: getBugById,
    createBug: createBug,
    removeBug: removeBug
}