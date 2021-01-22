module.exports = (sequelize, Sequelize)=>{
    const Grupo = sequelize.define("grupos",{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        clave:{
            type: Sequelize.STRING
        },
        nombre:{
            type: Sequelize.STRING
        }
    });

    return Grupo;
}