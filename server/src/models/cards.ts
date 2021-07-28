import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/index";

class Cards extends Model {}
Cards.init(
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		title: { type: DataTypes.TEXT, allowNull: true },
		created_by: { type: DataTypes.STRING, allowNull: true },
		task_column: { type: DataTypes.STRING, allowNull: true },
	},
	{
		sequelize,
		modelName: "cards",
		timestamps: true,
	}
);

export default Cards;
