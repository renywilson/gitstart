const Sequelize = require('sequelize');
const sequelize = require('../util/database');


const Download = sequelize.define('Download', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fileUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  downloadDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});



module.exports = Download;
