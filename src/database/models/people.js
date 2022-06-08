import bcrypt from "bcryptjs";

module.exports = (sequelize, DataTypes) => {
  const people = sequelize.define(
    "people",
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      birthday: DataTypes.DATE,
      phone: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: async function (people) {
          if (people.password) {
            people.password = await bcrypt.hash(people.password, 8);
          }
        },
      },
    }
  );

  return people;
};
