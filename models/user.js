'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('user', {
    username: DataTypes.STRING
  });

  User.associate = function(models) {
    models.User.hasMany(models.Dest);
  };

  return User;
};