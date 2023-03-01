module.exports = (sequelize, Sequelize) => {

    const ClienteDatosEntregas = sequelize.define("clientesDatosEntregas",{

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
        coordenadas:     { type: Sequelize.STRING },        
        telefono:     { type: Sequelize.STRING },
        datosEntregaADomicilio:     { type: Sequelize.STRING },        
        asigacionRuta:     { type: Sequelize.STRING },        
        clienteId:        { type: Sequelize.UUID, allowNull: false },        
        estadoId:        { type: Sequelize.UUID, allowNull: false },       
        municipioId:        { type: Sequelize.UUID, allowNull: false }        
    });

    return ClienteDatosEntregas;
    
}

