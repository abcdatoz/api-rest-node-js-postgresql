const db = require('../models')
const Bug = db.bug

const fs = require('fs')
const path = require ('path')



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
    const {bug_address, bug_description, bug_date, bug_sistema}  = req.body
      
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
        bug_sistema: bug_sistema,
        userId: req.userId
    }).catch(next)

    
    return res.status(status.success).send(result)
}


const updateBug = async(req,res,next)=>{
    const {bug_address, bug_description}  = req.body

    const registro = await Bug.findByPk(req.params.id).catch(next)

 

    if (registro){
 
        
        let ruta = path.resolve()
        ruta = ruta + '\\public\\uploads\\' + registro.bug_image
         
        const result = await registro.update({
            bug_address: bug_address,
            bug_description: bug_description,            
            bug_image: req.file.filename,
        }).catch(next)

        
        

        try {
            fs.unlinkSync(ruta);
        } catch (e) {}
    


        return res.status(status.success).send(result)
    }else{
        return res.status(status.nocontent)
    }
}

// const  getFilesInDirectory = () => {
//     console.log("\nFiles present in directory:");
//     let files = fs.readdirSync(path.resolve());
//     let filesz = fs.readdirSync(__dirname);
//     files.forEach(file => {
//       console.log(file);
//     });
// }

const removeBug = async(req,res,next)=> {


    const registro = await Bug.findByPk(req.params.id).catch(next)

    let ruta = path.resolve()
    ruta = ruta + '\\public\\uploads\\' + registro.bug_image


    const result = await Bug.destroy({
        where: {
            id : req.params.id
        }
    }).catch(next)



    try {
        fs.unlinkSync(ruta);
    } catch (e) {}


 
    return res.status(200).send('la imagen se borro');    

   

}




module.exports = {
    getBugs: getBugs,
    getBugById: getBugById,
    createBug: createBug,
    updateBug: updateBug,
    removeBug: removeBug
}