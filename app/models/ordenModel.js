module.exports = (sequelize, Sequelize) => {
    const Orden = sequelize.define("ordenes",{

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        fecha:      { type: Sequelize.DATE},
        hora:       { type: Sequelize.TIME},        
        estatus:    { type: Sequelize.INTEGER }, 
        restaurantId:   { type: Sequelize.UUID, allowNull: false },
        meseroId:       { type: Sequelize.UUID, allowNull: false },        
        mesaId:         { type: Sequelize.UUID, allowNull: false }        
    });

    return Orden;
    
}