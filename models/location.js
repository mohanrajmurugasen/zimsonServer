module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("location", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return user;
};
