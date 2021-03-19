module.exports = (sequelize, Sequelize)=>{
    const Producto = sequelize.define("productos",{
        clave:{
            type: Sequelize.STRING
        },
        nombre:{
            type: Sequelize.STRING
        }
    });

    return Producto;
}