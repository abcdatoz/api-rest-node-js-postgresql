module.exports = (sequelize, Sequelize)=>{
    const Producto = sequelize.define("productos",{
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

    return Producto;
}