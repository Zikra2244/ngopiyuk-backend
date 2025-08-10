
const express = require('express');
const cors = require('cors');
const db = require('./models'); // Mengimpor manajer model dari ./models/index.js

// Impor rute yang akan kita gunakan
const cafeRoutes = require('./routes/cafeRoutes');

const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Mengizinkan permintaan dari origin lain (frontend React kita)
app.use(express.json()); // Memungkinkan server membaca body request dalam format JSON



// Rute dasar untuk pengujian
app.get('/', (req, res) => {
  res.send('Selamat datang di API NgopiYuk!');
});

// Gunakan rute-rute yang sudah dibuat
// Semua rute di dalam cafeRoutes akan diawali dengan prefix /api/cafes
app.use('/api/auth', authRoutes);
app.use('/api/cafes', cafeRoutes);

// Sinkronisasi database dan jalankan server
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
    console.log('Database berhasil tersinkronisasi.');
  });
}).catch(err => {
    console.error('Gagal sinkronisasi database:', err);
});