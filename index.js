require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");

// Impor Rute
const authRoutes = require("./routes/authRoutes");
const cafeRoutes = require("./routes/cafeRoutes");
const userRoutes = require("./routes/userRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

const app = express();

// 1. Middleware Global
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  }),
);
app.use(express.json());

// 2. Rute Dasar & Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    message: "API NgopiYuk Berjalan!",
    status: "Connected to Vercel Serverless",
  });
});

// 3. Implementasi Rute API
app.use("/api/auth", authRoutes);
app.use("/api/cafes", cafeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/favorites", favoriteRoutes);

// 4. Koneksi Database (authenticate saja, jangan sync)
db.sequelize
  .authenticate()
  .then(() => {
    console.log(">>> Database Supabase Terhubung <<<");
  })
  .catch((err) => {
    console.error("!!! Gagal Koneksi Database:", err);
  });
// 5. Kondisi Environment
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server Lokal berjalan di http://localhost:${port}`);
  });
}

// 6. WAJIB: Ekspor app untuk Vercel
module.exports = app;
