module.exports = (sequelize, Sequelize) => {

    const ComercioPedido = sequelize.define("comerciosPedidos",{

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },        
        cliente:     { type: Sequelize.STRING },
        pedido:     { type: Sequelize.STRING },
        telefono:     { type: Sequelize.STRING },
        domicilio:     { type: Sequelize.STRING },        
        
    });

    return ComercioPedido;
    
}