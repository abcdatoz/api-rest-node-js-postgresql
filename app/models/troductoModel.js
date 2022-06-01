module.exports = (sequelize, Sequelize) => {
    const Troducto = sequelize.define("troductos",{

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        clave:              { type: Sequelize.STRING},
        nombre:             { type: Sequelize.STRING },
        descripcionA:       { type: Sequelize.STRING },
        descripcionB:       { type: Sequelize.STRING },
        descripcionC:       { type: Sequelize.STRING },
        precio:             { type: Sequelize.FLOAT },
        calorias:           { type: Sequelize.INTEGER },
        tiempoPreparacion:  { type: Sequelize.STRING },
        estatus:            { type: Sequelize.INTEGER }, 
        restaurantId:       { type: Sequelize.UUID, allowNull: false },
        categoriaId:        { type: Sequelize.UUID, allowNull: false }        
    });

    return Troductos;
    
}