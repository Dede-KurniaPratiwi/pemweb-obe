# Portal Transparansi Warisan & Aset Pusaka Keluarga

Repositori ini dikembangkan sebagai bagian dari Tugas Praktikum Modul 2 Pemrograman Web. Proyek ini berfokus pada perbaikan struktur kode HTML dasar menjadi HTML5 yang semantik, pemenuhan standar aksesibilitas web (*accessibility*), serta penerapan manajemen kontrol versi menggunakan Git.

## Informasi Proyek
* **Nama Proyek**: Portal Transparansi Warisan & Aset Pusaka Keluarga
* **Lingkungan Pengembangan**: Laragon 5 (`C:\laragon\www\pemweb-obe`)
* **Lingkup Modul**: HTML5 Semantik, Atribut Aksesibilitas (*Alt Text* & Label Form), dan Git Version Control

## Fitur Aksesibilitas & Struktur HTML5
1. **Struktur Semantik HTML5**: Menggantikan elemen pembungkus umum `<div>` dengan tag semantik yang deskriptif seperti `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, dan `<footer>`.
2. **Atribut Aksesibilitas (*Alt Text*)**:
   - 2 Gambar Informatif (Deskripsi isi dan fungsi visual secara transparan).
   - 2 Gambar Dekoratif (Atribut `alt=""` kosong untuk mengabaikan elemen hiasan bagi *screen reader*).
   - 1 Gambar Berfungsi Sebagai *Link* (Navigasi ikon menuju tautan eksternal repositori).
3. **Formulir & Navigasi**:
   - Penggunaan atribut `for` dan `id` pada label formulir agar terhubung secara aksesibel dengan elemen input.
   - Penambahan tombol *Skip to Content* (*Lewati ke konten utama*) untuk memudahkan navigasi berbasis papan tik (*keyboard*).

## Panduan Menjalankan Proyek
1. Pastikan aplikasi **Laragon** sudah terpasang dan layanan Apache aktif.
2. Tempatkan atau klon repositori proyek ini ke dalam direktori lokal `C:\laragon\www\pemweb-obe`.
3. Buka peramban (*browser*) dan akses melalui alamat lokal: `http://localhost/pemweb-obe/`

## Catatan Transparansi
Detail interaksi konsultasi dan proses pengembangan menggunakan bantuan kecerdasan buatan tercatat secara transparan di dalam file [`AI_USAGE_LOG.md`](AI_USAGE_LOG.md).