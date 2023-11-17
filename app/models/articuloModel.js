module.exports = (sequelize, Sequelize) => {
    const Articulo = sequelize.define("articulos", {
        clave:      { type : Sequelize.STRING},
        nombre:     { type : Sequelize.STRING},
        partida:    { type : Sequelize.STRING},
        precio:     { type : Sequelize.FLOAT},
        firstBuy:   { type : Sequelize.DATE},
        lastBuy:    { type : Sequelize.DATEONLY},
    });

    return Articulo;
}



