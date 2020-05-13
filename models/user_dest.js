module.exports = function(sequelize, DataTypes) {
    var userDest = sequelize.define("user_dests", {
      lat: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      lng: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      dest: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
    return userDest;
  };
  