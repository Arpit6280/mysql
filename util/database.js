// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node-complete",
//   password: "12345678",
// });

// module.exports = pool.promise();

//sequelize

const Sequelize = require("sequelize");
// db name      //user     //password
const sequelize = new Sequelize("node-complete", "root", "12345678", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
