module.exports = (sequelize, Sequelize) => {

    const Comercio = sequelize.define("comercios",{

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },        
        nombre:     { type: Sequelize.STRING },
        telefono:     { type: Sequelize.STRING },
        direccion:     { type: Sequelize.STRING },
        giro:     { type: Sequelize.STRING },
        horario:     { type: Sequelize.STRING },
        entregaADomicilio:     { type: Sequelize.STRING },         
        cobroConTarjeta:     { type: Sequelize.STRING },         
        cobroConTransferencia:     { type: Sequelize.STRING },                 
        
    });

    return Comercio;
    
}