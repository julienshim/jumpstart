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
            type: DataTypes.DATEONLY,
            allowNull: true
            // Possible moment integration if validating?
            // get: function() {
            //     return moment.utc(this.getDataValue('regDate')).format('YYYY-MM-DD');
            //   }
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
                len: [1]
                }
            }

        });

        Lead.associate = function(models) {

            Lead.hasMany(models.Todo, {
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
  







