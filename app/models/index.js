const config = require("../config/dbConfig.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,

        pool:{
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.user = require("../models/userModel.js")(sequelize, Sequelize);
db.role = require("../models/roleModel.js")(sequelize, Sequelize);

db.bug = require("../models/bugModel.js")(sequelize, Sequelize);
db.solution = require("../models/solutionModel.js")(sequelize, Sequelize);
db.comment = require("..//models/commentModel.js")(sequelize, Sequelize);

db.grupo = require("../models/grupoModel.js")(sequelize,Sequelize);
db.producto = require("../models/productoModel.js")(sequelize, Sequelize);
db.articulo = require("../models/articuloModel.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user,{ 
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role,{
    through:"user_roles",
    foreignKey:"userId",
    otherKey:"roleId"
});


console.log(db)

db.user.hasMany(db.bug);
db.user.hasMany(db.solution);
db.user.hasMany(db.comment);
db.user.hasMany(db.grupo);
db.user.hasMany(db.producto);

db.bug.belongsTo(db.user);
db.solution.belongsTo(db.user);
db.comment.belongsTo(db.user);
db.grupo.belongsTo(db.user);
db.producto.belongsTo(db.user);


db.bug.hasMany(db.solution);
db.solution.hasMany(db.comment);

db.solution.belongsTo(db.bug);
db.comment.belongsTo(db.solution);

db.grupo.hasMany(db.producto);
db.producto.belongsTo(db.grupo);


db.producto.hasMany(db.articulo)
db.articulo.belongsTo(db.producto)



db.ROLES= ["user","admin","moderator"];

module.exports = db;