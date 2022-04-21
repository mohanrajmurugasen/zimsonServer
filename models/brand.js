module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("brand", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return user;
};
