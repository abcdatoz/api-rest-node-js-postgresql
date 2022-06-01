module.exports = (sequelize, Sequelize) => {
    const PreOrdenDetalle = sequelize.define("preordenesDetalles",{

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        cantidad:    { type: Sequelize.INTEGER},
        precio:      { type: Sequelize.FLOAT},        
        subtotal:    { type: Sequelize.FLOAT },                 
        preordenId:   { type: Sequelize.UUID, allowNull: false },        
        productoId:   { type: Sequelize.UUID, allowNull: false },        
    });

    return PreOrdenDetalle;
    
}