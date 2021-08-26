module.exports = (sequelize, Sequelize) => {
    const Solution = sequelize.define("solutions", {
        description:{
            type: Sequelize.TEXT
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