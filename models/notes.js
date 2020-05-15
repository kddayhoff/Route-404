module.exports = function(sequelize, DataTypes) {
  var Notes = sequelize.define("Notes", {
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

  Notes.associate = function(models){
    Notes.belongsTo(models.User), {
      foreignKey:{allowNull:false}
      //preventing a destination note being made without an user association
    }
  }
  return Notes;
};

// destinations will be associated with users, associate notes with destinations. 