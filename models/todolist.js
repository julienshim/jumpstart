module.exports = function(sequelize, DataTypes) {
    var Todolist = sequelize.define("Todolist", {
        // This is just a container of todolists, so doesn't need properties.
        // Just the ID that's automatically generated.
    });

    Todolist.associate = function(models) {

        Todolist.hasMany(models.Todo, {
            onDelete: "cascade"
        });

        Todolist.belongsTo(models.Lead, {
            foreignKey: {
                allowNull: false
            }
        });

    };

    return Todolist;
  };
  