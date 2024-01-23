const db = require('../models');
const Grupo = db.grupo;

const {isEmpty} = require('../helpers/validations');
const  {status, successMessage, errorMessage } = require('../helpers/status');


const getGrupos = async (req, res, next) => {
    
    
    const results = await Grupo.findAll({}).catch(next)

    
    return res.status(status.success).send(results)

}


const getGrupoById = async (req, res, next) => {
    
        const results = await Grupo.findByPk(req.params.id).catch(next)

        if (results){            
            return res.status(status.success).send(results)
        }else{            
            errorMessage.error = 'el registro no fue localizado'
            return res.status(status.bad).send(errorMessage)
        }        


}

/**
 * 
 * Ventas.max('folio', { where: { estado: 'activo' } })
  .then((maxFolio) => {
    const nuevoFolio = maxFolio + 1;
    return Ventas.create({ folio: nuevoFolio, estado: 'activo' });
  })
  .then((nuevoRegistro) => {
    console.log('Folio creado:', nuevoRegistro.folio);
  })
  .catch((error) => {
    console.error('Error al obtener el siguiente folio:', error);
  });
 * 

  const ultimoFolio = await Ventas.findOne({
  where: {
    folio: {
      [Op.like]: 'GP-%' // Utiliza el operador "like" para buscar folios que empiecen con "GP"
    }
  },
  order: [
    ['folio', 'DESC'] // Ordena de forma descendente para obtener el último folio
  ]
});



let siguienteConsecutivo = 1;
if (ultimoFolio) {
  const ultimoNumero = parseInt(ultimoFolio.folio.substr(-4), 10);
  siguienteConsecutivo = ultimoNumero + 1;
}

const nuevoFolio = `GP-2024-${String(siguienteConsecutivo).padStart(4, '0')}`;
console.log('Siguiente folio:', nuevoFolio);

*/


const getFolio = async() => {

    const ultimoFolio = await Grupo.findOne({order: [['folio','DESC']]})

    let siguienteConsecutivo = 1;

    if(ultimoFolio){
        const ultimonumero = parseInt(ultimoFolio.folio.substr(-5),10)
        siguienteConsecutivo = ultimonumero + 1;
    }

    const nuevoFolio = `GP-2024-${String(siguienteConsecutivo).padStart(5,'0')}`
    
    return nuevoFolio

}


const createGrupo = async (req,res, next) => {

        const {clave, nombre} = req.body;

        if( isEmpty(clave) || isEmpty(nombre)  ){
            errorMessage.error ='Todos los campos son requeridos'
            return res.status(status.bad).send(errorMessage)
        }

        

        
        let newFolio = await getFolio()


        const results = await Grupo.create({
            clave: clave,
            nombre: nombre,
            folio: newFolio,
            userId: req.userId
        }).catch(next)

        
        successMessage.data = results
        return res.status(status.created).send(successMessage)

}

const updateGrupo = async (req,res, next)=>{
    
        const {clave, nombre} = req.body

        const registro = await Grupo.findByPk(req.params.id).catch(next)
        
        if(registro){
            const results = await registro.update({
                clave: clave,
                nombre: nombre,
            }).catch(next)

            
            return res.status(status.success).send(results)

        }else{
            return res.status(status.nocontent)
        }
        
    
}

const deleteGrupo = async (req,res, next)=> {

    const results = await Grupo.destroy({
        where: {
            id: req.params.id
        }
    }).catch(next)

    
    return res.status(status.success).send(results)


}


module.exports = {
    getGrupos: getGrupos,
    getGrupoById: getGrupoById,
    createGrupo: createGrupo,
    updateGrupo: updateGrupo,
    deleteGrupo: deleteGrupo
}


