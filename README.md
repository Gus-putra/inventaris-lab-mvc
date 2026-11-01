# Sistem Manajemen Inventaris Alat Laboratorium

Aplikasi berbasis web untuk mengelola data inventaris alat laboratorium menggunakan Node.js, Express, EJS, dan MySQL.

## Fitur Aplikasi

- Menampilkan daftar alat laboratorium.
- Menambahkan data alat laboratorium.
- Mengedit data alat berdasarkan ID.
- Menghapus data dengan konfirmasi.
- Menggunakan arsitektur Model-View-Controller (MVC).
- Menggunakan Prepared Statements untuk keamanan query SQL.
- Menggunakan konfigurasi database melalui file `.env`.

## Teknologi yang Digunakan

- Node.js
- Express.js
- EJS
- MySQL
- MySQL2
- dotenv
- Nodemon

## Struktur Proyek

```text
inventaris-lab-mvc/
├── config/
│   └── database.js
├── controllers/
│   └── alat.controller.js
├── docs/
│   └── screenshots/
├── models/
│   └── alat.model.js
├── routes/
│   └── alat.routes.js
├── views/
│   ├── pages/
│   │   ├── alat-list.ejs
│   │   ├── alat-tambah.ejs
│   │   └── alat-edit.ejs
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
├── public/
│   └── css/
│       └── style.css
├── .env.example
├── .gitignore
├── app.js
├── package.json
└── README.md
```

## Instalasi dan Menjalankan Aplikasi

1. Clone repository.
2. Jalankan `npm install`.
3. Buat database MySQL dengan nama `db_inventaris_lab`.
4. Buat tabel `alat_laboratorium` sesuai struktur database proyek.
5. Salin file `.env.example` menjadi `.env`.
6. Sesuaikan konfigurasi koneksi database di `.env`.
7. Jalankan aplikasi menggunakan `npm run dev`.
8. Buka `http://localhost:3000/alat` melalui browser.

## Logbook Pengujian dan Integritas Kode

### Traceability Matrix

| ID | Fitur / Operasi | Target Endpoint URL | HTTP Method | Hasil |
|---|---|---|---|---|
| TC-01 | Koneksi MySQL Pool | App Startup | - | Pass |
| TC-02 | Read (Select & Render) | `/alat` | GET | Pass |
| TC-03 | Create (Insert & PRG) | `/alat/tambah` | POST | Pass |
| TC-04 | Update (Edit berdasarkan ID) | `/alat/edit/:id` | POST | Pass |
| TC-05 | Delete (Konfirmasi) | `/alat/hapus/:id` | POST | Pass |
| TC-06 | SQL Injection Mitigation | `/uji-keamanan` | GET | Pass |

### Bukti Pengujian

1. **TC-01 – Koneksi MySQL Pool:** `docs/screenshots/01-db-pool-connection.png`
2. **TC-02 – Read (Select & Render):** `docs/screenshots/02-read-select-render.png`
3. **TC-03 – Create (Insert & PRG):** `docs/screenshots/03-create-insert-prg.png`
4. **TC-04 – Update:** `docs/screenshots/04-update-param-redirect.png`
5. **TC-05 – Delete:** `docs/screenshots/05-delete-feedback.png`
6. **TC-06 – SQL Injection Mitigation:** `docs/screenshots/06-sql-injection-mitigation.png`

## Keamanan

- Kredensial database disimpan dalam file `.env`.
- File `.env` tidak disertakan dalam repository.
- File `.env.example` disediakan sebagai contoh konfigurasi.
- Query database menggunakan parameter placeholder (`?`) untuk mencegah SQL Injection.
- Operasi database dipisahkan ke dalam folder Models sesuai arsitektur MVC.