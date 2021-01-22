module.exports = (sequelize, Sequelize) => {
    const Bug = sequelize.define("bugs",{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true
        },

        name:{
            type: Sequelize.STRING
        },

        image:{
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.DATE
        }
    });

 

    return Bug;
}