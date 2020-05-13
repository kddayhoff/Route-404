'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('Users', {
    username: DataTypes.STRING
  });

  User.associate = function(models) {
    models.User.hasMany(models.User);
  };

  return User;
};