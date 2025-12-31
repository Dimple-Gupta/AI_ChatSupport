import { sequelize } from "./database";

export async function testDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ DB connection failed:", error);
  }
}
