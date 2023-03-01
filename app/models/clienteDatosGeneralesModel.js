module.exports = (sequelize, Sequelize) => {

    const ClienteDatosGenerales = sequelize.define("clientesDatosGenerales",{

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },        
        calle:     { type: Sequelize.STRING },
        numeroExterior:     { type: Sequelize.STRING },
        referencia:     { type: Sequelize.STRING },
        colonia:     { type: Sequelize.STRING },
        localidad:     { type: Sequelize.STRING },
        cp:     { type: Sequelize.STRING },
        whatsapp:     { type: Sequelize.STRING },
        telefono:     { type: Sequelize.STRING },
        email:     { type: Sequelize.STRING },
        clienteId:        { type: Sequelize.UUID, allowNull: false },        
        estadoId:        { type: Sequelize.UUID, allowNull: false },       
        municipioId:        { type: Sequelize.UUID, allowNull: false }        
    });

    return ClienteDatosGenerales;
    
}

