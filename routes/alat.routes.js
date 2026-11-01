
const express = require('express');
const router = express.Router();

const alatController = require('../controllers/alat.controller');

// Menampilkan daftar alat
router.get('/alat', alatController.getAll);

// Form tambah dan proses penyimpanan
router.get('/alat/tambah', alatController.getFormTambah);
router.post('/alat/tambah', alatController.postTambah);

// Form edit dan proses pembaruan
router.get('/alat/edit/:id', alatController.getFormEdit);
router.post('/alat/edit/:id', alatController.postUpdate);

// Proses penghapusan
router.post('/alat/hapus/:id', alatController.postHapus);

// Pengujian keamanan SQL Injection
router.get('/uji-keamanan', alatController.testSecurity);

module.exports = router;