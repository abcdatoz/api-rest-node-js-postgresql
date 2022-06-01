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


db.categoria = require('../models/categoriaModel')(sequelize,Sequelize);
db.troductos = require('../models/troductoModel')(sequelize,Sequelize);
db.mesero = require('../models/meseroModel')(sequelize,Sequelize);
db.orden = require('../models/ordenModel')(sequelize,Sequelize);
db.ordenDetalle = require('../models/ordenDetalleModel')(sequelize,Sequelize);
db.preorden = require('../models/preordenModel')(sequelize,Sequelize);
db.preordenDetalle = require('../models/preordenDetalleModel')(sequelize,Sequelize);


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

db.user.hasMany(db.bug,     { onDelete: 'RESTRICT',    onUpdate: 'RESTRICT' });
db.user.hasMany(db.solution,{ onDelete: 'RESTRICT',    onUpdate: 'RESTRICT' });
db.user.hasMany(db.comment, { onDelete: 'RESTRICT',    onUpdate: 'RESTRICT' });
db.user.hasMany(db.grupo,   { onDelete: 'RESTRICT',    onUpdate: 'RESTRICT' });
db.user.hasMany(db.producto,{ onDelete: 'RESTRICT',    onUpdate: 'RESTRICT' });

db.bug.belongsTo(db.user);
db.solution.belongsTo(db.user);
db.comment.belongsTo(db.user);
db.grupo.belongsTo(db.user);
db.producto.belongsTo(db.user);


db.bug.hasMany(db.solution,     { onDelete: 'RESTRICT',    onUpdate: 'RESTRICT' });
db.solution.hasMany(db.comment, { onDelete: 'RESTRICT',    onUpdate: 'RESTRICT' });

db.solution.belongsTo(db.bug);
db.comment.belongsTo(db.solution);

db.grupo.hasMany(db.producto,   { onDelete: 'RESTRICT',    onUpdate: 'RESTRICT' });
db.producto.belongsTo(db.grupo);


db.producto.hasMany(db.articulo, { onDelete: 'RESTRICT',    onUpdate: 'RESTRICT' })
db.articulo.belongsTo(db.producto)



db.ROLES= ["user","admin","moderator"];

module.exports = db;