module.exports = (sequelize, Sequelize) => {
    const PreOrden = sequelize.define("preordenes",{

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        fecha:      { type: Sequelize.DATE},
        hora:       { type: Sequelize.TIME},        
        estatus:    { type: Sequelize.INTEGER }, 
        folio:      { type: Sequelize.STRING }, 
        nombreCliente:  { type: Sequelize.STRING },         
        restaurantId:   { type: Sequelize.UUID, allowNull: false },        
    });

    return PreOrden;
    
}