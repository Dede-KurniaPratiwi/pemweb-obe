# Praktikum Pemprograman Web - OBE

## Identitas mata kuliah
**Mata Kuliah**: Pemrograman Web
**Nama**: Dede Kurnia Pratiwi
**Repository**: https://github.com/Dede-KurniaPratiwi/pemweb-obe

## deskripsi singkat proyek
Proyek ini berisi latihan dasar penulisan kode HTML, penyusunan struktur halaman web, serta penerapan kontrol versi menggunakan Git untuk keperluan praktikum Pemrograman Web berbasis OBE

## Teknologi
* HTML
* Git & GitHub
* Laragon 5

## cara menjalankan proyek melalui Laragon 5
1. Simpan folder proyek pada direktori `C:\laragon\www\pemweb-obe`.
2. Buka aplikasi Laragon dan klik tombol **Start All** untuk mengaktifkan server lokal.
3. Buka browser dan akses URL lokal proyek.

## URL lokal
http://localhost/pemweb-obe/


## E. Jawaban Latihan 
### 1. Perbedaan status code HTTP 200, 301/302, 404 dan 500
- **Status 200 (OK)**: Menandakan bahwa request dari client (browser) berhasil diproses oleh server, dan server mengirimkan data/resource yang diminta kembali ke client.
- **Status 301 (Moved Permanently)**: Menandakan bahwa alamat URL atau resource yang diminta telah dipindahkan secara permanen ke alamat URL baru.
- **Status 302 (Found / Temporary Redirect)**: Menandakan bahwa resource dipindahkan sementara ke URL lain, sehingga client disarankan tetap memakai URL lama untuk request berikutnya.
- **Status 404 (Not Found)**: Menandakan kesalahan di sisi client (client error), di mana server tidak dapat menemukan resource atau halaman yang diminta.
- **Status 500 (Internal Server Error)**: Menandakan kesalahan di sisi server (server error), di mana server mengalami kegagalan internal saat memproses request dari client.

### 2. Analisis Request & Response Header
Pengamatan request pada tab Network DevTools saat mengakses halaman `http://localhost/pemweb-obe/`:
- **Request Header (dikirim Browser ke Server)**:
  - `Host`: Alamat tujuan yang dipanggil (`localhost`).
  - `User-Agent`: Informasi jenis browser dan OS yang digunakan.
  - `Accept`: Tipe media yang diminta browser (`text/html`).
- **Response Header (dibalas Server Laragon ke Browser)**:
  - `Content-Type`: Format data yang dikirim server (`text/html; charset=UTF-8`).
  - `Server`: Software web server yang aktif (`Apache/2.4.58`).
### 3. Pembaruan Dokumen & Validasi Inkremental 
- **Status Perubahan**: Melakukan pembaruan secara inkremental pada file `README.md` sebagai bentuk penerapan version control berbasis *commit* bertahap.
- **Tujuan Revisi**: Memastikan seluruh jawaban latihan terkait arsitektur web, HTTP status code, dan analisis *header* pada tab Network telah terdokumentasi dengan rapi, valid, serta terhubung langsung dengan repositori proyek semester.
- **Aksi Git**: Menyimpan perubahan, mengeksekusi perintah `git add` dan `git commit` dengan pesan yang menjelaskan revisi, lalu melakukan `git push` ke *remote repository* GitHub.


## F. Jawaban Tugas 1 (Tugas OBE)
## Tugas 1: Analisis Request-Response (Situs: ubt.ac.id)
Pengamatan dilakukan melalui Browser Developer Tools (F12 > Network Tab) pada situs `https://ubt.ac.id/`:

| No | URL / Resource | Method | Status | Content Type | Size | Fungsi Request |
|----|----------------|--------|--------|--------------|------|----------------|
| 1 | `/` (Halaman Utama) | GET | 200 | text/html | ~45 KB | Memuat dokumen HTML utama situs |
| 2 | `style.css` | GET | 200 | text/css | ~12 KB | Mengunduh berkas gaya tata letak visual |
| 3 | `script.js` | GET | 200 | application/javascript | ~20 KB | Menjalankan fungsi interaktif halaman |
| 4 | `logo.png` | GET | 200 | image/png | ~15 KB | Memuat aset gambar logo pada header |
| 5 | `font.woff2` | GET | 304 | font/woff2 | ~18 KB | Memuat berkas kustom huruf/tipografi |


## Refleksi Mahasiswa
1. **Konsep Utama**: Saya jadi memahami bahwa aplikasi web berjalan secara client-server melalui protokol HTTP/HTTPS, di mana browser meminta resource dan server memberikan respons dengan status code tertentu.
2. **Kendala & Solusi**: Tantangan awal adalah menyelaraskan versi PHP 8.4 di Laragon dan memahami struktur *commit* Git yang bertahap. Hal ini diselesaikan dengan memeriksa dokumentasi modul dan menjalankan perintah terminal secara disiplin.
3. **Bukti Kebenaran**: Bukti kebenaran sistem terlihat dari berjalannya server lokal di `http://localhost/pemweb-obe/`, terekamnya log *request* di Network tab, serta riwayat *commit* yang tercatat rapi di repository GitHub.
4. **Penggunaan AI**: AI digunakan untuk membantu menjelaskan konsep arsitektur web dan menyusun format dokumentasi Markdown. Seluruh kode dan hasil analisis diverifikasi ulang secara mandiri sebelum diunggah.


