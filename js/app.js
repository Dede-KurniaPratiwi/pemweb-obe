import { ringkasInventaris } from './utils.js';

const inventaris = [
  { id: 1, nama: 'Sertifikat Tanah', kategori: 'Legal', jumlah: 2, kondisi: 'Baik', lokasi: 'Brankas Utama Notaris' },
  { id: 2, nama: 'Arsip Surat Berharga Keluarga', kategori: 'Dokumen', jumlah: 15, kondisi: 'Baik', lokasi: 'Ruang Arsip Khusus' },
  { id: 3, nama: 'Perhiasan Emas Warisan', kategori: 'Berharga', jumlah: 5, kondisi: 'Perlu Cek', lokasi: 'Kotak Deposit Bank' },
  { id: 4, nama: 'Properti Ruko Komersial', kategori: 'Properti', jumlah: 1, kondisi: 'Baik', lokasi: 'Kantor Pengelola' },
  { id: 5, nama: 'Saham Perusahaan Keluarga', kategori: 'Saham', jumlah: 1000, kondisi: 'Baik', lokasi: 'Portofolio Digital' },
  { id: 6, nama: 'Barang Peninggalan Keluarga', kategori: 'Pusaka', jumlah: 8, kondisi: 'Perlu Cek', lokasi: 'Ruang Khusus Pusaka' }
];

// Simulasi hak akses pengguna
const penggunaAktif = {
  nama: "David Bloemhard",
  peran: "Kepala Keluarga"
};

function getAsetAman(user, targetLokasi) {
  const hasilFilter = inventaris.filter(item => item.lokasi === targetLokasi);
  return hasilFilter.map(item => {
    if (user.peran !== "Kepala Keluarga") {
      return {
        ...item,
        lokasi: "[DISEMBUNYIKAN - HAK AKSES TERBATAS]"
      };
    }
    return item;
  });
}

// PERBAIKAN: Dibungkus ke dalam fungsi yang benar
function cariAsetBerdasarkanId(idCari) {
  const hasilCari = inventaris.find(item => item.id === idCari);
  return hasilCari ? hasilCari : "Aset dengan ID tersebut tidak ditemukan.";
}

function buatRingkasanAset(dataInventaris) {
  return dataInventaris.map(item => {
    // Destructuring object mengambil properti secara langsung
    const { nama, kategori, jumlah, kondisi } = item;
    
    // Template literal untuk menghasilkan string ringkasan yang rapi
    return `Aset "${nama}" masuk dalam kategori [${kategori}], total ${jumlah} unit, dengan kondisi saat ini: ${kondisi}.`;
  });
}

// --- BAGIAN UJI COBA KE CONSOLE ---
console.log(`=== PENCARIAN ASET BERDASARKAN LOKASI (Akses: ${penggunaAktif.peran}) ===`);
console.table(getAsetAman(penggunaAktif, 'Brankas Utama Notaris'));

console.log('=== PENCARIAN ASET BERDASARKAN ID ===');
console.log(cariAsetBerdasarkanId(3)); // Contoh mencari aset dengan ID 3

console.log('=== RINGKASAN STRING SETIAP ASET (SOAL 3) ===');
const hasilRingkasan = buatRingkasanAset(inventaris);
hasilRingkasan.forEach(ringkasan => console.log(ringkasan));

// --- EVENT LISTENER FORM SANGGAHAN ---
document.addEventListener('DOMContentLoaded', () => {
    const formSanggah = document.getElementById('form-sanggahan');
    if (formSanggah) {
        formSanggah.addEventListener('submit', (e) => {
            e.preventDefault();
            const nama = document.getElementById('nama-sanggah').value;
            const alasan = document.getElementById('alasan-sanggah').value;

            alert(`Terima kasih ${nama}, sanggahan Anda terkait "${alasan}" telah dicatat.`);
            formSanggah.reset();
        });
    }
});