module.exports = function (sequelize, DataTypes) {
  var UserDest = sequelize.define("UserDest", {
    destination_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    destination_lat: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    destination_lon: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: false,
    },
    // indexes: [
    //   {
    //     unique: false,
    //     fields: ["destination_id", "destination_lat", "destination_lon"]
    //   },
    //   {
    //     unique: true,
    //     fields: ['user_id']
    //   }
    // ]
  });
//   userDest.associate = models => {
//     userDest.belongsTo(models.user);
//     userDest.hasMany(models.destination);
//   }
  return UserDest;
};
