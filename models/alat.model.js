const db = require('../config/database');

const AlatModel = {
    // Menguji koneksi database
    testConnection: async () => {
        await db.query('SELECT 1');
        return true;
    },

    // Mengambil seluruh data alat
    getAll: async () => {
        const [rows] = await db.query(
            'SELECT * FROM alat_laboratorium ORDER BY id DESC'
        );
        return rows;
    },

    // Menambahkan data alat
    create: async (data) => {
        const sql = `
            INSERT INTO alat_laboratorium
            (kode_alat, nama_alat, kategori, deskripsi, jumlah, kondisi, tanggal_pengadaan)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await db.query(sql, [
            data.kode_alat,
            data.nama_alat,
            data.kategori,
            data.deskripsi,
            data.jumlah,
            data.kondisi,
            data.tanggal_pengadaan
        ]);

        return result;
    },

    // Mengambil satu data berdasarkan ID
    getById: async (id) => {
        const [rows] = await db.query(
            'SELECT * FROM alat_laboratorium WHERE id = ?',
            [id]
        );
        return rows[0];
    },

    // Memperbarui data alat
    update: async (id, data) => {
        const sql = `
            UPDATE alat_laboratorium
            SET kode_alat = ?, nama_alat = ?, kategori = ?,
                deskripsi = ?, jumlah = ?, kondisi = ?, tanggal_pengadaan = ?
            WHERE id = ?
        `;

        const [result] = await db.query(sql, [
            data.kode_alat,
            data.nama_alat,
            data.kategori,
            data.deskripsi,
            data.jumlah,
            data.kondisi,
            data.tanggal_pengadaan,
            id
        ]);

        return result;
    },

    // Menghapus data alat
    delete: async (id) => {
        const [result] = await db.query(
            'DELETE FROM alat_laboratorium WHERE id = ?',
            [id]
        );
        return result;
    },

    // Pengujian keamanan SQL Injection
    testSqlInjection: async (input) => {
    const [rows] = await db.query(
        'SELECT * FROM alat_laboratorium WHERE kode_alat = ?',
        [input]
    );

    return rows;
    }
};

module.exports = AlatModel;