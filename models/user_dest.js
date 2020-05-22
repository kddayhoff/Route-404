module.exports = function (sequelize, DataTypes) {
  //userdest model and table with columns for latitude and longitude to capture from user search
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
});
  
  return UserDest;
};


