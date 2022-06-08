module.exports = (sequelize, DataTypes) => {
  const responsible = sequelize.define("responsible");
  responsible.associate = (models) => {
    responsible.belongsTo(models.people, {
      foreignKey: "people_id",
      as: "people",
    });
  };

  return responsible;
};
