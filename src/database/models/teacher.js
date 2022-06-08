module.exports = (sequelize, DataTypes) => {
  const teacher = sequelize.define("teacher");
  teacher.associate = (models) => {
    teacher.belongsTo(models.people, {
      foreignKey: "people_id",
      as: "people",
    });
  };

  return teacher;
};
