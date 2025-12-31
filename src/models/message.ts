import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Message extends Model {
  declare id: number;
  declare conversationId: string;
  declare sender: "user" | "ai";
  declare text: string;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    conversationId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    sender: {
      type: DataTypes.ENUM("user", "ai"),
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "messages",
    timestamps: true,
  }
);
