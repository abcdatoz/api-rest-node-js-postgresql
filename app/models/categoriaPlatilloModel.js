module.exports = (sequelize, Sequelize) => {
    const CategoriaPlatillo = sequelize.define ("categoriasPlatillo", {
        clave: { type : Sequelize.STRING},
        nombre: { type : Sequelize.STRING},
        status: {type: Sequelize.INTEGER}
    });

    return CategoriaPlatillo
}
