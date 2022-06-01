module.exports = (sequelize, Sequelize) => {
    const ProductoImagenes = sequelize.define("productosImagenes",{

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        clave:      { type: Sequelize.STRING},
        numero:     { type: Sequelize.INTEGER },
        imagen:     { type: Sequelize.STRING },
        estatus:    { type: Sequelize.INTEGER }, 
        restaurantId:       { type: Sequelize.UUID, allowNull: false },
        productoId:         { type: Sequelize.UUID, allowNull: false }        
    });

    return ProductoImagenes;
    
}