module.exports = (sequelize, Sequelize)=>{
    const Comment = sequelize.define("comments",{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true
        },

        message:{
            type:Sequelize.STRING
        }

    });

    return Comment;
}