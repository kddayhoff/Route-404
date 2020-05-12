'use strict';
//This model will populate user name and password into sql database
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },

    // The password cannot be null
    user_pass: {
      type: DataTypes.STRING,
      allowNull: false
     }
    })  
    return User;
  };