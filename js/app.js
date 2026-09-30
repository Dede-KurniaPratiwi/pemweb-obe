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

function cariAsetBerdasarkanId(idCari) {
  const hasilCari = inventaris.find(item => item.id === idCari);
  return hasilCari ? hasilCari : "Aset dengan ID tersebut tidak ditemukan.";
}

function buatRingkasanAset(dataInventaris) {
  return dataInventaris.map(item => {
    const { nama, kategori, jumlah, kondisi } = item;
    return `Aset "${nama}" masuk dalam kategori [${kategori}], total ${jumlah} unit, dengan kondisi saat ini: ${kondisi}.`;
  });
}

// --- BAGIAN UJI COBA KE CONSOLE ---
console.log(`=== PENCARIAN ASET BERDASARKAN LOKASI (Akses: ${penggunaAktif.peran}) ===`);
console.table(getAsetAman(penggunaAktif, 'Brankas Utama Notaris'));

console.log('=== PENCARIAN ASET BERDASARKAN ID ===');
console.log(cariAsetBerdasarkanId(3));

console.log('=== RINGKASAN STRING SETIAP ASET (SOAL 3) ===');
const hasilRingkasan = buatRingkasanAset(inventaris);
hasilRingkasan.forEach(ringkasan => console.log(ringkasan));

console.log('=== RINGKASAN INVENTARIS DARI UTILS ===');
console.log(ringkasInventaris(inventaris));


// --- SEMUA INTERAKSI DOM & EVENT LISTENER (MODUL 5 & MODUL 6) ---
document.addEventListener('DOMContentLoaded', () => {
    
    // --- PENGAMAN UTAMA: Mencegah link kosong (href="#") menarik halaman ke atas ---
    const emptyLinks = document.querySelectorAll('a[href="#"]');
    emptyLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });

    // 1. Pemulihan Tema dari localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const themeButton = document.querySelector('#theme-button');
    if (themeButton) {
      themeButton.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('theme', nextTheme);
      });
    }

    // 2. Fungsi Render Item secara Aman (Cegah XSS)
    const daftar = document.querySelector('#daftar-alat');

    function renderItems(items) {
      if (!daftar) return;
      daftar.replaceChildren(); 
      
      if (items.length === 0) {
        const p = document.createElement('p');
        p.textContent = "Aset tidak ditemukan.";
        daftar.append(p);
        return;
      }

      for (const item of items) {
        const article = document.createElement('article');
        article.className = 'inventaris-card';

        const title = document.createElement('h3');
        title.textContent = item.nama;

        const info = document.createElement('p');
        info.textContent = `${item.kategori} | ${item.jumlah} unit - Kondisi: ${item.kondisi} (Lokasi: ${item.lokasi})`;

        const btnDetail = document.createElement('button');
        btnDetail.textContent = 'Detail';
        btnDetail.dataset.id = item.id;
        btnDetail.className = 'btn-detail';

        const detailContainer = document.createElement('div');
        detailContainer.className = 'detail-container';
        detailContainer.style.display = 'none';
        detailContainer.innerHTML = `
          <hr style="border:0; border-top:1px dashed var(--border); margin: 8px 0;">
          <p style="margin: 0; font-size: 0.78rem; color: var(--text-main);">
            <strong>Info Lengkap:</strong><br>
            Lokasi Detail: ${item.lokasi}<br>
            Kondisi Fisik: ${item.kondisi}<br>
            Jumlah Unit: ${item.jumlah}
          </p>
        `;
        article.append(title, info, btnDetail, detailContainer);
        daftar.append(article);
      }
    }

    renderItems(inventaris);

    // 3. Interaksi Filter berdasarkan Tombol
    const tombolFilter = document.querySelectorAll('[data-filter]');
    tombolFilter.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        const hasil = filter === 'Semua'
          ? inventaris
          : inventaris.filter(item => item.kondisi === filter);
        renderItems(hasil);
      });
    });

    // 4. Interaksi Pencarian Berdasarkan Nama/Kategori
    const inputPencarian = document.querySelector('#input-pencarian');
    if (inputPencarian) {
      inputPencarian.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase();
        const hasilCari = inventaris.filter(item => 
          item.nama.toLowerCase().includes(keyword) || 
          item.kategori.toLowerCase().includes(keyword)
        );
        renderItems(hasilCari);
      });
    }

    // 5. Interaksi Event Delegation untuk Tombol Detail
    if (daftar) {
      daftar.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-detail')) {
          const card = e.target.closest('.inventaris-card');
          const detailContainer = card.querySelector('.detail-container');
          
          if (detailContainer.style.display === 'none') {
            detailContainer.style.display = 'block';
            e.target.textContent = 'Tutup';
          } else {
            detailContainer.style.display = 'none';
            e.target.textContent = 'Detail';
          }
        }
      });
    }

    // 6. MODUL 6: VALIDASI FORM PENDATAAN ASET & LATIHAN
    const formAlat = document.querySelector('#form-alat');
    const formStatus = document.querySelector('#form-status');

    function validateForm(data) {
        const errors = {};
        
        // --- 1. LATIHAN: Pesan Error Berbeda untuk Field Kosong & Format Tidak Valid (Nama) ---
        const nama = String(data.get('nama') ?? '').trim();
        if (!nama) {
            errors.nama = 'Nama alat / aset wajib diisi.';
        } else if (nama.length < 3) {
            errors.nama = 'Format tidak valid: Nama alat minimal harus 3 karakter.';
        }

        // --- 2. LATIHAN: Validasi Kategori Hanya Boleh dari Pilihan yang Tersedia ---
        const kategori = String(data.get('kategori') ?? '');
        const kategoriValid = ['Legal', 'Dokumen', 'Berharga', 'Properti', 'Saham', 'Pusaka'];
        if (!kategori) {
            errors.kategori = 'Kategori wajib dipilih.';
        } else if (!kategoriValid.includes(kategori)) {
            errors.kategori = 'Format/Pilihan kategori tidak valid.';
        }

        // --- 3. LATIHAN: Pesan Error Berbeda untuk Field Kosong & Format Tidak Valid (Jumlah) ---
        const jumlahVal = data.get('jumlah');
        const jumlah = Number(jumlahVal);
        if (jumlahVal === '' || jumlahVal === null) {
            errors.jumlah = 'Jumlah wajib diisi.';
        } else if (!Number.isInteger(jumlah) || jumlah < 0) {
            errors.jumlah = 'Format tidak valid: Jumlah harus bilangan bulat 0 atau lebih.';
        }

        // Validasi Kondisi
        const kondisi = String(data.get('kondisi') ?? '');
        const kondisiValid = ['Baik', 'Perlu Cek'];
        if (!kondisi) {
            errors.kondisi = 'Kondisi wajib dipilih.';
        } else if (!kondisiValid.includes(kondisi)) {
            errors.kondisi = 'Kondisi yang dipilih tidak valid.';
        }

        // --- 4. LATIHAN: Validasi Tanggal Perolehan Tidak Melebihi Hari Ini ---
        const tanggalStr = data.get('tanggal');
        if (!tanggalStr) {
            errors.tanggal = 'Tanggal perolehan wajib diisi.';
        } else {
            const inputDate = new Date(tanggalStr);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (inputDate > today) {
                errors.tanggal = 'Format tidak valid: Tanggal perolehan tidak boleh melebihi hari ini.';
            }
        }

        return errors;
    }

    if (formAlat) {
        formAlat.addEventListener('submit', event => {
            event.preventDefault();
            
            const data = new FormData(formAlat);
            const errors = validateForm(data);

            // Bersihkan pesan error dan atribut aksesibilitas sebelumnya
            document.querySelectorAll('.error').forEach(el => el.textContent = '');
            formAlat.querySelectorAll('[aria-invalid="true"]').forEach(el => el.removeAttribute('aria-invalid'));

            // Jika ada error validasi
            if (Object.keys(errors).length > 0) {
                for (const [field, message] of Object.entries(errors)) {
                    const errorElement = document.querySelector(`#error-${field}`);
                    if (errorElement) {
                        errorElement.textContent = message;
                    }
                    formAlat.elements[field]?.setAttribute('aria-invalid', 'true');
                }

                // Fokus ke field error pertama (Aksesibilitas Modul 6)
                const firstField = Object.keys(errors)[0];
                formAlat.elements[firstField]?.focus();
                
                if (formStatus) {
                    formStatus.textContent = 'Periksa kembali data yang belum valid.';
                    formStatus.style.color = '#dc2626';
                }
                return;
            }

            // Jika valid
            if (formStatus) {
                formStatus.textContent = 'Data valid dan siap dikirim (simulasi berhasil).';
                formStatus.style.color = '#16a34a';
            }
        });
    }
});