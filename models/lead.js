module.exports = function(sequelize, DataTypes) {

    var Lead = sequelize.define("Lead", {

        company: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
                }
            },

        position: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
                }
            },

        leadLink: {
            type: DataTypes.STRING,
            allowNull: true, // Not all job applications are found online. Could have been referral.
            validate: {
                isUrl: true,
                len: [1]
                }
            },

        dateApplied: {
            type: DataTypes.STRING,
            allowNull: true, //It could be useful for being mindful about a job position.
            validate: {
                isEmail: true,
                len: [1]
                }
            },

        documents: {
            type: DataTypes.STRING,
            allowNull: true, 
            validate: {
                isUrl: true, // If multiple documents, then they should link to their folder.
                len: [1]
                }
            },

        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                isEmail: true,
                len: [1]
                }
            }

        });

        Lead.associate = function(models) {

            Lead.hasOne(models.Todolist, {
                onDelete: "cascade"
            });

            Lead.belongsTo(models.User, {
                foreignKey: {
                    allowNull: false
                }
            });

        };

    return Lead;
};
  







