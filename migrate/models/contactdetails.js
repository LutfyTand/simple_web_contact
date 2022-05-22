'use strict';
module.exports = function(sequelize, DataTypes) {
  var contact = sequelize.define('contactdetails', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.CHAR(13)
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return books;
};