# NgopiYuk! - Backend API

API untuk aplikasi **NgopiYuk!**, sebuah platform rekomendasi *coffee shop*. Dibangun dengan Node.js, Express.js, dan PostgreSQL.

## Fitur Utama

- API RESTful untuk operasi CRUD pada data User, Kafe, dan Ulasan.
- Otentikasi aman menggunakan JWT & `bcryptjs`.
- Hak akses berbasis peran (User vs. Admin).
- Endpoint untuk unggah file gambar (avatar & foto kafe).

## Teknologi Utama

- **Framework**: Node.js, Express.js
- **Database**: PostgreSQL & Sequelize ORM
- **Otentikasi**: `jsonwebtoken`, `bcryptjs`
- **File Upload**: `multer`
- **Deployment**: Docker

## 🚀 Menjalankan Lokal

1.  Buat file `.env` dari `.env.example` dan sesuaikan koneksi database Anda.
2.  Jalankan `npm install`.
3.  Jalankan `npx sequelize-cli db:migrate`.
4.  Jalankan `npx sequelize-cli db:seed:all` (opsional, untuk mengisi data awal).
5.  Jalankan `npm run dev`.
