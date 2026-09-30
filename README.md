# Portal Transparansi Warisan & Aset Pusaka Keluarga

Repositori ini dikembangkan untuk memenuhi penugasan praktikum mata kuliah **Pemrograman Web** (Program Studi Sarjana Teknik Komputer, Fakultas Teknik, Universitas Borneo Tarakan). Proyek ini berfokus pada sistem pengelolaan informasi aset keluarga, perundingan warisan, dan interaktivitas berbasis web modern.

## Identitas Mahasiswa
- **Nama:** Dede Kurnia Pratiwi
- **NPM:** 2440304028
- **Mata Kuliah:** Pemrograman Web (26TJ453127)

## Fitur Utama & Interaktivitas (Modul 5)
1. **Manajemen DOM Dinamis & Aman:** Render data inventaris atau aset secara dinamis menggunakan `createElement` dan `replaceChildren` tanpa celah keamanan XSS (menghindari `innerHTML` mentah untuk data tidak tepercaya)[cite: 4].
2. **Form Sanggahan & Perundingan Interaktif:** Form input dengan validasi dan penanganan *event submit* yang mendeteksi pencegahan perilaku bawaan (`e.preventDefault()`) serta menampilkan modal kustom interaktif secara *real-time*[cite: 4].
3. **Pencarian & Filter Data Dinamis:** Fitur pencarian nama aset secara langsung (*event input*) dan tombol filter berdasarkan kondisi aset (*event click*)[cite: 4].
4. **Manajemen State & Web Storage:** Penyimpanan preferensi tampilan tema (*Dark/Light mode*) secara lokal menggunakan `localStorage` agar tetap persisten saat halaman dimuat ulang[cite: 4].
5. **Struktur Semantik HTML5 & Aksesibilitas:** Penggunaan elemen semantik (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) serta atribut aksesibilitas form (`for` dan `id`).

## Lingkungan Pengembangan
- **Server Lokal:** Laragon 5 (Apache aktif)[cite: 4]
- **Direktori Proyek:** `C:\laragon\www\pemweb-obe`[cite: 4]
- **Version Control:** Git & GitHub[cite: 4]

## Panduan Menjalankan Proyek
1. Pastikan aplikasi **Laragon 5** sudah aktif dengan layanan Apache menyala[cite: 4].
2. Tempatkan folder proyek di direktori lokal `C:\laragon\www\pemweb-obe`[cite: 4].
3. Buka peramban (*browser*) dan akses melalui alamat lokal: `http://localhost/pemweb-obe/`[cite: 4].

## Catatan Transparansi
Detail interaksi konsultasi, bantuan logika pemrograman, serta proses pengembangan menggunakan kecerdasan buatan tercatat secara transparan di dalam file [`AI_USAGE_LOG.md`](AI_USAGE_LOG.md).