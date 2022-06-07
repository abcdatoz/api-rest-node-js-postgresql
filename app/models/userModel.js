module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users",{

        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },

        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password:{
            type: Sequelize.STRING
        }    ,

        owner: {
            type: Sequelize.UUID,            
            allowNull: true            
        },

        passport:{
            type: Sequelize.STRING
        }  
        

    });


    return User;
};