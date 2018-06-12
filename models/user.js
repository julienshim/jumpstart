module.exports = function(sequelize, DataTypes) {

    var User = sequelize.define("User", {

        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
                len: [1]
            }
        },

        idtoken: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1205]
            }
        }

    });

    User.associate = function(models) {

        User.hasMany(models.Lead, {
            onDelete: "cascade"
        });

    };

    return User;
};
