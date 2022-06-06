require('dotenv/config')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: 'postgres',
    dialectOptions: {
      multipleStatements: true
    },
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
})

module.exports = sequelize