module.exports = (sequelize, Sequelize) => {
    const OrdenDetalle = sequelize.define("ordenesDetalles",{

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        ronda:      { type: Sequelize.INTEGER},
        cantidad:   { type: Sequelize.INTEGER},
        precio:       { type: Sequelize.FLOAT},        
        subtotal:       { type: Sequelize.FLOAT},        
        estatus:    { type: Sequelize.INTEGER }, 
        ordenId:   { type: Sequelize.UUID, allowNull: false },
        productoId:       { type: Sequelize.UUID, allowNull: false }        
    });

    return OrdenDetalle;
    
}