import app from "./app";
import { sequelize } from "./config/database";

const PORT = 4000;
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Tables synced");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on ${PORT}`)
    );
  } catch (err) {
    console.error("❌ Startup failed:", err);
  }
})();
