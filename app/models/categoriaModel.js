module.exports = (sequelize, Sequelize) => {
    const Categoria = sequelize.define("categorias",{

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        clave:      { type: Sequelize.STRING},
        nombre:     { type: Sequelize.STRING },
        estatus:    { type: Sequelize.INTEGER }, 
        restaurantId:   { type: Sequelize.UUID, allowNull: false },
        owner:          { type: Sequelize.UUID, allowNull: false }        
    });

    return Categoria;
    
}