module.exports = (sequelize, Sequelize) => {
    const Estado = sequelize.define("estados",{

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        clave:      { type: Sequelize.STRING},
        nombre:     { type: Sequelize.STRING },
        activo :    { type: Sequelize.INTEGER }, 
        userId:        { type: Sequelize.UUID, allowNull: false }
        
    });

    return Estado;
    
}