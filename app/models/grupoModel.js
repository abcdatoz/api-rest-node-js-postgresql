module.exports = (sequelize, Sequelize)=>{
    const Grupo = sequelize.define("grupos",{
        clave:{
            type: Sequelize.STRING
        },
        nombre:{
            type: Sequelize.STRING
        }
    });

    return Grupo;
}

 