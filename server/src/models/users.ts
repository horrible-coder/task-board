import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/index";

class Users extends Model {
  id: any;
  password: any;
  fullname: any;
}
Users.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: true },
    password: { type: DataTypes.STRING, allowNull: true },
    fullname: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    modelName: "users",
    timestamps: false,
  }
);

export default Users;
