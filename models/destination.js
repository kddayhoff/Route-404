module.exports = function(sequelize, DataTypes) {
  var destNotes = sequelize.define("notes", {
    title:{
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len:[1]
      }
    },
    body:{
      type:DataTypes.TEXT,
      allowNull: false,
      len:[1]
    }
  });

  destNotes.associate = function(models){
    destNotes.belongsTo(models.User), {
      foreignKey:{allowNull:false}
      //preventing a destination note being made without an user association
    }
  }
  return destNotes;
};

// destinations will be associated with users, associate notes with destinations. 