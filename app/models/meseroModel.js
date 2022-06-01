module.exports = (sequelize, Sequelize) => {
    const Mesero = sequelize.define("meseros",{

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },        
        nombre:         { type: Sequelize.STRING },
        password:       { type: Sequelize.STRING },
        nombre_completo:{ type: Sequelize.STRING },
        estatus:        { type: Sequelize.INTEGER }, 
        restaurantId:   { type: Sequelize.UUID, allowNull: false },
        owner:          { type: Sequelize.UUID, allowNull: false }        
    });

    return Mesero;
    
}