module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    destinations: DataTypes.STRING,
  });


//   User.associate = function(models) {
//     User.hasMany(models.destNotes, {
//       onDelete: "cascade"
// //handling deletions of notes associated with users

//     })
    //associating notes with user destinations from destination.js

  

  return User;
};