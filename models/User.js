module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      profileImage: {
        type: DataTypes.STRING,
        allowNull: true
      },
      score: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      currentIndex: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      role: {
        type: DataTypes.ENUM,
        values: ["guest", "user", "admin"],
        defaultValue: "user"
      }
    },
    { underscored: true }
  );

  return User;
};
