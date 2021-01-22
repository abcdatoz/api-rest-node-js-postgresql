module.exports = (sequelize, Sequelize) => {
    const Solution = sequelize.define("solutions", {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        description:{
            type: Sequelize.STRING
        },
        query:{
            type: Sequelize.TEXT
        },
        image:{
            type:Sequelize.STRING
        },
        file:{
            type:Sequelize.STRING
        }
    });

    return Solution;
}