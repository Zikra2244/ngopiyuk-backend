require('dotenv').config(); // <-- Pastikan ini ada di baris pertama
const express = require('express');
const cors = require('cors');
const db = require('./models'); // Mengimpor manajer model dari ./models/index.js
const path = require('path');
// Impor rute yang akan kita gunakan
const cafeRoutes = require('./routes/cafeRoutes');
const authRoutes = require('./routes/authRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Izinkan semua origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json()); 
app.use('/uploads/images', express.static(path.join('uploads', 'images')));
cafeRoutes.use('/:cafeId/reviews', reviewRoutes);


// Rute dasar untuk pengujian
app.get('/', (req, res) => {
  res.send('Selamat datang di API NgopiYuk!');
});

// Gunakan rute-rute yang sudah dibuat
// Semua rute di dalam cafeRoutes akan diawali dengan prefix /api/cafes
app.use('/api/auth', authRoutes);
app.use('/api/cafes', cafeRoutes);

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes')); 

// Sinkronisasi database dan jalankan server
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
    console.log('Database berhasil tersinkronisasi.');
  });
}).catch(err => {
    console.error('Gagal sinkronisasi database:', err);
});