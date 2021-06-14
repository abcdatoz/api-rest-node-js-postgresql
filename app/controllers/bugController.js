const db = require('../models')
const Bug = db.bug



const { isEmpty } = require('../helpers/validations')
const {status, successMessage, errorMessage} = require('../helpers/status')


const getBugs = async (req,res,next ) => {

    const result = await Bug.findAll({}).catch(next)
  
    return res.status(status.success).send(result)    

}

const getBugById = async (req,res,next)=>{

    const result = await Bug.findByPk(req.params.id).catch(next)

    if (result){
        
        return res.status(status.success).send(result)

    }else{
        errorMessage.error = 'El registro no fue localizado'
        return res.status(status.bad).send(errorMessage)
    }

}


const createBug = async(req,res,next)=> {
    const {bug_address, bug_description, bug_image, bug_date}  = req.body

    
    console.log(bug_address)
    console.log(bug_description)
    console.log(bug_date)
    console.log(req.file.filename)

 
     
    if( isEmpty(bug_address) 
        || isEmpty(bug_description)
        || isEmpty(req.file.filename)
        || isEmpty(bug_date)
        ){
        errorMessage.error ='Todos los campos son requeridos'
        return res.status(status.bad).send(errorMessage)
    }

    const result =  await Bug.create({
        bug_address: bug_address,
        bug_description: bug_description,
        bug_image: req.file.filename,
        bug_date: bug_date,
        bug_status: 1,
        userId: req.userId
    }).catch(next)

    
    return res.status(status.success).send(result)
}


const updateBug = async(req,res,next)=>{
    const {bug_address, bug_description, bug_image}  = req.body

    const registro = await Bug.findByPk(req.params.id).catch(next)

    if (registro){
        const result = await registro.update({
            bug_address: bug_address,
            bug_description: bug_description,
            bug_image: bug_image,
        }).catch(next)
        

        return res.status(status.success).send(result)
    }else{
        return res.status(status.nocontent)
    }
}


const removeBug = async(req,res,next)=> {



    const result = await Bug.destroy({
        where: {
            id : req.params.id
        }
    }).catch(next)
        
    return res.status(status.success).send(result)


}




module.exports = {
    getBugs: getBugs,
    getBugById: getBugById,
    createBug: createBug,
    updateBug: updateBug,
    removeBug: removeBug
}