module.exports = function(sequelize, DataTypes) {
    var Todo = sequelize.define("Todo", {

        // id: {
        //     type: DataTypes.INTEGER,
        //     primaryKey: true,
        //     autoIncrement: true,
        //     unique: true,
        //     field: 'id',
        //     },
        
        task_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
                },
            },

        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
                },
            },

        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            },
            
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            }

    });

    Todo.associate = function(models) {

        Todo.belongsTo(models.Todolist, {
            foreignKey: {
                allowNull: false
            }
        });

    };

    return Todo;
  };
  