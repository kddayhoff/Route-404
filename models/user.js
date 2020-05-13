'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('Users', {
    username: DataTypes.STRING
  });

  // User.associate = function (models) {
  //   User.hasMany(models.user);
  // };

  return User;
};