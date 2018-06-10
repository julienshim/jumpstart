module.exports = function(sequelize, DataTypes) {

    var User = sequelize.define("User", {

        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: ["^[a-z]+$",'i'],
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
            }

        });

        User.associate = function(models) {

            User.hasMany(models.Lead, {
                onDelete: "cascade"
            });

        };

    return User;
};
  







