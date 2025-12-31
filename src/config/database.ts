import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "chatsupport",     // DB NAME
  "root",             // USER
  "1234",    // PASSWORD
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);