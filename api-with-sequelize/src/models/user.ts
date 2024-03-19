import { Sequelize, Model, DataTypes } from "sequelize";
import db from "../database/db";

class User extends Model {
  declare id: string;
  declare name: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize: db, modelName: "User", tableName: "users" }
);

export { User };
