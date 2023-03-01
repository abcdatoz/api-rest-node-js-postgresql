const db = require('../models')
const Bug = db.bug
const Solution = db.solution

const fs = require('fs')
const path = require ('path')



const { isEmpty } = require('../helpers/validations')
const {status, successMessage, errorMessage} = require('../helpers/status')


const getBugs = async (req,res,next ) => {

    const result = await Bug
                            .findAll({
                                where: {bug_status: 1},
                                order:  [ ['bug_address', 'ASC'] ],
                                attributes: ['id','bug_address', 'bug_description', 'bug_date', 'bug_sistema', 'bug_status','bug_image' ]

                            })
                            .catch(next)
  
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
        errorMessage.error ='Todos los campos son requeridossssss'
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



const removeBug = async(req,res,next)=> {


    const registro = await Bug.findByPk(req.params.id).catch(next)

    let ruta = path.resolve()
    ruta = ruta + '\\public\\uploads\\' + registro.bug_image

    console.log(1)    
    
    let validacion1 = await tieneSoluciones(req.params.id)
    
    console.log(2)
    let validacion2 = await tieneBugs()

    
    console.log(3)
    

    


    console.log('se va a evaluar validacion1')
    console.log (validacion1)
    if (validacion1 != ''){
        errorMessage.error = validacion1
        return res.status(status.bad).send(errorMessage)    
    }else{

    }


    if (validacion2 != ''){
        errorMessage.error = validacion2
        return res.status(status.bad).send(errorMessage)    
    }

    console.log('vamo a eliminar al sonofabitch ')

    // const result = await Bug.destroy({
    //     where: {
    //         id : req.params.id
    //     }
    // }).catch(next)

    try {
        fs.unlinkSync(ruta);
    } catch (e) {}


    return res.status(200).send('la imagen se borro');    


}


const tieneSoluciones = async(idbug) => {

    console.log('tienesolucionesINIT')
    const {count, rows} = await Solution.findAndCountAll ({
        where : {
            bugId: idbug
        }
    })

    

    console.log('tienesolucionesEND')
    if (count == 0){
        console.log('el valor de count es' + count)
        return ''
    }
    
    console.log('el valor de count (afuera) es' + count)
    return 'No se puede eliminar el registro por x'   

}

const tieneBugs = async () => {


    console.log('tienebugsINIT')
    const {count, rows} = await Bug.findAndCountAll ({
        where : {
            bug_status: 1
        }
    })

    if (count == 0)
        return ''
    
    
    console.log('tienebugsEND')
    return 'No se puede eliminar el registro por x'   

}





module.exports = {
    getBugs: getBugs,
    getBugById: getBugById,
    createBug: createBug,
    updateBug: updateBug,
    removeBug: removeBug
}