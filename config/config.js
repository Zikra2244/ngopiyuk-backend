require("dotenv").config();

const sslOptions = {
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
};

module.exports = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: String(process.env.DB_PASSWORD || ""),
    database: process.env.DB_NAME || "postgres",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 6543,
    dialect: "postgres",
    dialectOptions: sslOptions,
  },
  // ... test sama seperti development ...
  production: {
    // UTAMA: Gunakan variabel tunggal yang sudah ada di Vercel
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: sslOptions,
    // Tambahkan ini jika menggunakan pooler Supabase
    prepareThreshold: 0,
  },
};
