module.exports = (sequelize, Sequelize) => {
    const Bug = sequelize.define("bugs",{

        bug_address:    { type: Sequelize.STRING },
        bug_description:{ type: Sequelize.STRING },
        bug_image:      { type: Sequelize.STRING },
        bug_date:       { type: Sequelize.DATE },
        bug_status:     { type: Sequelize.INTEGER},
        bug_sistema:     { type: Sequelize.INTEGER }
    });

    return Bug;
    
}