import { Model, Sequelize, DataTypes } from "sequelize";

import db from "../database/db";
import { User } from "./user";

class Post extends Model {
  declare id: string;
  declare title: string;
  declare content: string;
  declare createdAt: Date;
  declare authorId: string;
}

Post.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    authorId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  { sequelize: db, modelName: "Post", tableName: "posts" }
);

User.hasMany(Post, { foreignKey: "authorId", as: "posts" });
Post.belongsTo(User, { foreignKey: "authorId", as: "author" });

export { User, Post };
