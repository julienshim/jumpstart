module.exports = function(sequelize, DataTypes) {
    var Todolist = sequelize.define("Todolist", {
        // id: {
        //     type: DataTypes.INTEGER,
        //     primaryKey: true,
        //     autoIncrement: true,
        //     unique: true,
        //     field: 'id',
        //   },
        
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
          },
          
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
          }
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
  