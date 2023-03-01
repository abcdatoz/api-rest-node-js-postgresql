module.exports = (sequelize, Sequelize) => {
    const Municipio = sequelize.define("municipios",{

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },        
        nombre:     { type: Sequelize.STRING },
        activo:     { type: Sequelize.INTEGER }, 
        estadoId:   { type: Sequelize.UUID, allowNull: false },
        userId:        { type: Sequelize.UUID, allowNull: false }        
    });

    return Municipio;
    
}