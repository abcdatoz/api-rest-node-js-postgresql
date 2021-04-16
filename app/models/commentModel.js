module.exports = (sequelize, Sequelize)=>{
    const Comment = sequelize.define("comments",{

        message:{
            type:Sequelize.STRING
        }

    });

    return Comment;
}