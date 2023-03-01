module.exports = (sequelize, Sequelize) => {

    const Cliente = sequelize.define("clientes",{

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },        
        nombre:     { type: Sequelize.STRING },
        apellidos:     { type: Sequelize.STRING },
        razonSocial:     { type: Sequelize.STRING },
        rfc:     { type: Sequelize.STRING },
        status:     { type: Sequelize.INTEGER },         
        userId:        { type: Sequelize.UUID, allowNull: false }        
    });

    return Cliente;
    
}