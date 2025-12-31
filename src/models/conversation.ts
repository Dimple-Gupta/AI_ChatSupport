import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Conversation extends Model {
  declare id: string;
}

Conversation.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: "conversations",
    timestamps: true,
  }
);
