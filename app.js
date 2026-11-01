
const express = require('express');
const path = require('path');
require('dotenv').config();

const AlatModel = require('./models/alat.model');
const alatRoutes = require('./routes/alat.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Konfigurasi EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', alatRoutes);

// Halaman 404
app.use((req, res) => {
    res.status(404).send('Halaman tidak ditemukan.');
});

// Tes koneksi dan jalankan server
AlatModel.testConnection()
    .then(() => {
        console.log('[DATABASE] Koneksi MySQL berhasil.');

        app.listen(PORT, () => {
            console.log(`[SERVER] Aktif di http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('[DATABASE] Koneksi gagal:', error.message);
    });
