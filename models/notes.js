module.exports = function (sequelize, DataTypes) {
 // created the notes object and the notes table with the columns title & body
  var Notes = sequelize.define("Notes", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });
// associates the notes table with the models folder
  Notes.associate = function (models) {
    Notes.belongsTo(models.user), {
      foreignKey: { allowNull: false }
    }
  }
  return Notes;
};
 