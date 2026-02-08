require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./models");

// Impor semua file rute
const authRoutes = require("./routes/authRoutes");
const cafeRoutes = require("./routes/cafeRoutes");
const userRoutes = require("./routes/userRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  }),
);
app.use(express.json());

// Rute dasar untuk pengujian
app.get("/", (req, res) => {
  res.send("Selamat datang di API NgopiYuk! (Vercel Serverless)");
});

// Gunakan rute-rute utama dengan prefix API
app.use("/api/auth", authRoutes);
app.use("/api/cafes", cafeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/favorites", favoriteRoutes);

// KONEKSI DATABASE
// Di Vercel, kita sebaiknya tidak melakukan .sync() di setiap request.
// Namun untuk tahap awal, kita pastikan koneksi terjalin.
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Koneksi database ke Supabase berhasil.");
  })
  .catch((err) => {
    console.error("Gagal koneksi database:", err);
  });

// HANYA JALANKAN APP.LISTEN DI LOKAL
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
  });
}

// WAJIB UNTUK VERCEL: Ekspor app
module.exports = app;
