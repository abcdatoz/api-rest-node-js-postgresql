
module.exports = (sequelize, Sequelize) => {
    const Platillo = sequelize.define ("platillos", {
        clave:          { type: Sequelize.STRING},
        nombre:         { type: Sequelize.STRING},
        descripcion:    { type: Sequelize.STRING},
        calorias:       { type: Sequelize.STRING},
        minutospreparacion:    { type: Sequelize.STRING},
        imagen:     { type: Sequelize.STRING },
    });

    return Platillo
}