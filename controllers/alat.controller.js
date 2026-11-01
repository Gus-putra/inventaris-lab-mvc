
const AlatModel = require('../models/alat.model');

// Menampilkan seluruh data alat
exports.getAll = async (req, res) => {
    try {
        const alatList = await AlatModel.getAll();

        res.render('pages/alat-list', {
            pageTitle: 'Data Inventaris Laboratorium',
            alatList
        });
    } catch (error) {
        console.error('[ERROR getAll]:', error);
        res.status(500).send('Gagal mengambil data alat.');
    }
};

// Menampilkan form tambah
exports.getFormTambah = (req, res) => {
    res.render('pages/alat-tambah', {
        pageTitle: 'Tambah Data Alat'
    });
};

// Menyimpan data baru
exports.postTambah = async (req, res) => {
    try {
        const {
            kode_alat,
            nama_alat,
            kategori,
            deskripsi,
            jumlah,
            kondisi,
            tanggal_pengadaan
        } = req.body;

        if (
            !kode_alat || !nama_alat || !kategori ||
            !jumlah || !kondisi || !tanggal_pengadaan
        ) {
            return res.status(400).send('Field wajib harus diisi.');
        }

        await AlatModel.create({
            kode_alat,
            nama_alat,
            kategori,
            deskripsi,
            jumlah,
            kondisi,
            tanggal_pengadaan
        });

        res.redirect('/alat');
    } catch (error) {
        console.error('[ERROR postTambah]:', error);
        res.status(500).send('Gagal menyimpan data alat.');
    }
};

// Menampilkan form edit berdasarkan ID
exports.getFormEdit = async (req, res) => {
    try {
        const { id } = req.params;
        const alat = await AlatModel.getById(id);

        if (!alat) {
            return res.status(404).send('Data alat tidak ditemukan.');
        }

        res.render('pages/alat-edit', {
            pageTitle: 'Edit Data Alat',
            alat
        });
    } catch (error) {
        console.error('[ERROR getFormEdit]:', error);
        res.status(500).send('Gagal memuat form edit.');
    }
};

// Memperbarui data alat
exports.postUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            kode_alat,
            nama_alat,
            kategori,
            deskripsi,
            jumlah,
            kondisi,
            tanggal_pengadaan
        } = req.body;

        await AlatModel.update(id, {
            kode_alat,
            nama_alat,
            kategori,
            deskripsi,
            jumlah,
            kondisi,
            tanggal_pengadaan
        });

        res.redirect('/alat');
    } catch (error) {
        console.error('[ERROR postUpdate]:', error);
        res.status(500).send('Gagal memperbarui data alat.');
    }
};

// Menghapus data alat
exports.postHapus = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await AlatModel.delete(id);

        if (result.affectedRows === 0) {
            return res.status(404).send('Data alat tidak ditemukan.');
        }

        res.redirect('/alat');
    } catch (error) {
        console.error('[ERROR postHapus]:', error);
        res.status(500).send('Gagal menghapus data alat.');
    }
};

// Pengujian keamanan SQL Injection
exports.testSecurity = async (req, res) => {
    try {
        const input = req.query.input || '';

        const rows = await AlatModel.testSqlInjection(input);

        res.json({
            input,
            jumlahHasil: rows.length,
            pesan: rows.length === 0
                ? 'Input dianggap sebagai teks biasa. SQL Injection tidak berhasil.'
                : 'Data ditemukan sebagai pencarian biasa.'
        });
    } catch (error) {
        console.error('[ERROR testSecurity]:', error);
        res.status(500).send('Pengujian keamanan gagal.');
    }
};