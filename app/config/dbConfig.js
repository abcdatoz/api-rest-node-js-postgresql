// module.exports = {
//     HOST: 'localhost',
//     USER: 'postgres',
//     PASSWORD: 'W3st3rn',
//     DB: 'atwa',
//     dialect: 'postgres',
//     pool: {
//         max: 5,
//         min: 0,
//         acquire:30000,
//         idle:1000
//     }
// };


module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "W3st3rn",
    DB: "aerials",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };