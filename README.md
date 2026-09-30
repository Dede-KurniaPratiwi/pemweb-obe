###Proyek Sistem Inventaris - Modul 6 (Form, Validasi, & Aksesibilitas)###


***Lingkungan Pengembangan (Environment)***
* *Server Lokal: Laragon 5 (Apache)***
* Akses URL: http://localhost/pemweb-obe**
* Lingkungan Kerja: Sistem operasi lokal dengan integrasi server Apache standar praktikum.

###Fitur & Implementasi Teknis (Modul 6)###
1. Struktur Form Semantik: Menggunakan elemen HTML standar (form, label, input) dengan tipe data yang presisi (number, date, dll.).
2. Validasi JavaScript Kustom (validateForm):
    * Validasi Nama: Memastikan panjang karakter minimal memenuhi standar sistem.
    * Validasi Jumlah: Memastikan nilai berupa angka bulat positif.
    * Validasi Tanggal (Latihan 1): Mencegah pemilihan tanggal perolehan yang melebihi hari ini (inputDate > today).
    * Validasi Kategori (Latihan 2): Mencocokkan nilai input dengan array master data kategoriValid.
    * Pesan Error Spesifik (Latihan 3): Memisahkan pesan kesalahan antara field kosong (wajib diisi) dan format salah.

**Aksesibilitas & UX:**
    * Penyematan atribut aria-invalid="true" secara dinamis pada elemen yang mengalami kesalahan input.
    * Pemindahan fokus kursor secara otomatis (focus()) ke elemen error pertama demi kemudahan navigasi pengguna.

**Pengujian & Skenario**
    * Skenario Invalid: Sistem mendeteksi field kosong atau format salah, menampilkan pesan error spesifik, dan mengunci fokus ke input bermasalah.
    * Skenario Valid: Seluruh aturan validasi terpenuhi, error dibersihkan, dan status form mengonfirmasi kesiapan data untuk dikirim.