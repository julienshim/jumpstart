module.exports = function(sequelize, DataTypes) {
    var Todo = sequelize.define("Todo", {

        task_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            },
        },

        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

        content: {
            type: DataTypes.STRING,
            validate: {
                len: [1]
            },
        }

    });

    Todo.associate = function(models) {

        Todo.belongsTo(models.Lead, {
            foreignKey: {
                allowNull: false
            }
        });

    };

    return Todo;
  };
  