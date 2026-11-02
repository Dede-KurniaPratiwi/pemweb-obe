import { ringkasInventaris } from './utils.js';

const inventaris = [
  { id: 1, nama: 'Sertifikat Tanah', kategori: 'Legal', jumlah: 2, kondisi: 'Baik', lokasi: 'Brankas Utama Notaris' },
  { id: 2, nama: 'Arsip Surat Berharga Keluarga', kategori: 'Dokumen', jumlah: 15, kondisi: 'Baik', lokasi: 'Ruang Arsip Khusus' },
  { id: 3, nama: 'Perhiasan Emas Warisan', kategori: 'Berharga', jumlah: 5, kondisi: 'Perlu Cek', lokasi: 'Kotak Deposit Bank' },
  { id: 4, nama: 'Properti Ruko Komersial', kategori: 'Properti', jumlah: 1, kondisi: 'Baik', lokasi: 'Kantor Pengelola' },
  { id: 5, nama: 'Saham Perusahaan Keluarga', kategori: 'Saham', jumlah: 1000, kondisi: 'Baik', lokasi: 'Portofolio Digital' },
  { id: 6, nama: 'Barang Peninggalan Keluarga', kategori: 'Pusaka', jumlah: 8, kondisi: 'Perlu Cek', lokasi: 'Ruang Khusus Pusaka' }
];

// Simulasi hak akses pengguna (Ubah ke "Notaris" untuk menguji hak akses hapus admin)
const penggunaAktif = {
  nama: "Dede Kurnia P",
  peran: "Notaris"
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

    // --- MODAL KUSTOM DI TENGAH LAYAR UNTUK PEMBERITAHUAN HAPUS ---
    function showCustomConfirm(message, onConfirm) {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '9999';

        const modal = document.createElement('div');
        modal.style.backgroundColor = '#ffffff';
        modal.style.padding = '24px';
        modal.style.borderRadius = '8px';
        modal.style.maxWidth = '400px';
        modal.style.width = '90%';
        modal.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        modal.style.textAlign = 'center';

        const text = document.createElement('p');
        text.textContent = message;
        text.style.marginBottom = '20px';
        text.style.color = '#333333';
        text.style.fontSize = '1rem';

        const btnContainer = document.createElement('div');
        btnContainer.style.display = 'flex';
        btnContainer.style.justifyContent = 'center';
        btnContainer.style.gap = '12px';

        const btnYes = document.createElement('button');
        btnYes.textContent = 'Ya, Hapus';
        btnYes.style.backgroundColor = '#dc2626';
        btnYes.style.color = '#fff';
        btnYes.style.border = 'none';
        btnYes.style.padding = '8px 16px';
        btnYes.style.borderRadius = '4px';
        btnYes.style.cursor = 'pointer';

        const btnNo = document.createElement('button');
        btnNo.textContent = 'Batal';
        btnNo.style.backgroundColor = '#e5e7eb';
        btnNo.style.color = '#374151';
        btnNo.style.border = 'none';
        btnNo.style.padding = '8px 16px';
        btnNo.style.borderRadius = '4px';
        btnNo.style.cursor = 'pointer';

        btnYes.addEventListener('click', () => {
            document.body.removeChild(overlay);
            onConfirm();
        });

        btnNo.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });

        btnContainer.append(btnYes, btnNo);
        modal.append(text, btnContainer);
        overlay.append(modal);
        document.body.append(overlay);
    }

    // 2. Fungsi Render Item secara Aman (Cegah XSS) & Tombol Hapus Khusus Admin/Notaris
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

        // --- PEMBATASAN HAK AKSES: Tombol Hapus Hanya Muncul untuk Peran Notaris (Admin) ---
        if (penggunaAktif.peran === 'Notaris') {
            const btnHapus = document.createElement('button');
            btnHapus.textContent = 'Hapus Aset';
            btnHapus.className = 'btn-hapus';
            btnHapus.style.marginLeft = '8px';
            btnHapus.style.backgroundColor = '#dc2626';
            btnHapus.style.color = '#fff';
            btnHapus.style.border = 'none';
            btnHapus.style.padding = '6px 12px';
            btnHapus.style.borderRadius = '4px';
            btnHapus.style.cursor = 'pointer';

            btnHapus.addEventListener('click', () => {
                showCustomConfirm(`Yakin ingin menghapus aset "${item.nama}" dari database?`, async () => {
                    try {
                        const response = await fetch(`./api/alats.php?id=${item.id}`, {
                            method: 'DELETE'
                        });
                        const result = await response.json();
                        if (response.ok && result.status === 'success') {
                            alert('Aset berhasil dihapus!');
                            muatAsetDariDatabase(); // Refresh data setelah dihapus
                        } else {
                            alert('Gagal menghapus: ' + (result.error || 'Terjadi kesalahan'));
                        }
                    } catch (err) {
                        console.error('Delete Error:', err);
                        alert('Terjadi kesalahan jaringan saat menghapus data.');
                    }
                });
            });

            detailContainer.append(document.createElement('br'), btnHapus);
        }

        article.append(title, info, btnDetail, detailContainer);
        daftar.append(article);
      }
    }

    // --- TAMBAHAN KONEKSI DATABASE PHP (Menarik data dari database) ---
    async function muatAsetDariDatabase() {
        try {
            const response = await fetch('./api/alats.php');
            const result = await response.json();
            if (result.status === 'success' && result.data.length > 0) {
                renderItems(result.data);
            } else {
                renderItems(inventaris); // Fallback ke array lokal jika kosong
            }
        } catch (error) {
            console.error('Gagal memuat dari database, menggunakan data lokal:', error);
            renderItems(inventaris);
        }
    }

    muatAsetDariDatabase();

    // 3. Interaksi Filter berdasarkan Tombol
    const tombolFilter = document.querySelectorAll('[data-filter]');
    tombolFilter.forEach(button => {
      button.addEventListener('click', async () => {
        const filter = button.dataset.filter;
        try {
            const endpoint = filter === 'Semua' ? './api/alats.php' : `./api/alats.php?kategori=${encodeURIComponent(filter)}`;
            const response = await fetch(endpoint);
            const result = await response.json();
            if (result.status === 'success') {
                renderItems(result.data);
            }
        } catch (e) {
            const hasil = filter === 'Semua'
              ? inventaris
              : inventaris.filter(item => item.kondisi === filter || item.kategori === filter);
            renderItems(hasil);
        }
      });
    });

    // 4. Interaksi Pencarian Berdasarkan Nama/Kategori
    const inputPencarian = document.querySelector('#input-pencarian');
    if (inputPencarian) {
      inputPencarian.addEventListener('input', async (e) => {
        const keyword = e.target.value.toLowerCase();
        try {
            const response = await fetch('./api/alats.php');
            const result = await response.json();
            const sourceData = (result.status === 'success') ? result.data : inventaris;
            const hasilCari = sourceData.filter(item => 
              item.nama.toLowerCase().includes(keyword) || 
              item.kategori.toLowerCase().includes(keyword)
            );
            renderItems(hasilCari);
        } catch (err) {
            const hasilCari = inventaris.filter(item => 
              item.nama.toLowerCase().includes(keyword) || 
              item.kategori.toLowerCase().includes(keyword)
            );
            renderItems(hasilCari);
        }
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
        
        const nama = String(data.get('nama') ?? '').trim();
        if (!nama) {
            errors.nama = 'Nama alat / aset wajib diisi.';
        } else if (nama.length < 3) {
            errors.nama = 'Format tidak valid: Nama alat minimal harus 3 karakter.';
        }

        const kategori = String(data.get('kategori') ?? '');
        const kategoriValid = ['Legal', 'Dokumen', 'Berharga', 'Properti', 'Saham', 'Pusaka', 'Tanah & Properti', 'Barang Pusaka'];
        if (!kategori) {
            errors.kategori = 'Kategori wajib dipilih.';
        } else if (!kategoriValid.includes(kategori)) {
            errors.kategori = 'Format/Pilihan kategori tidak valid.';
        }

        const jumlahVal = data.get('jumlah');
        const jumlah = Number(jumlahVal);
        if (jumlahVal === '' || jumlahVal === null) {
            errors.jumlah = 'Jumlah wajib diisi.';
        } else if (!Number.isInteger(jumlah) || jumlah < 0) {
            errors.jumlah = 'Format tidak valid: Jumlah harus bilangan bulat 0 atau lebih.';
        }

        const kondisi = String(data.get('kondisi') ?? '');
        const kondisiValid = ['Baik', 'Perlu Cek', 'Rusak'];
        if (!kondisi) {
            errors.kondisi = 'Kondisi wajib dipilih.';
        } else if (!kondisiValid.includes(kondisi)) {
            errors.kondisi = 'Kondisi yang dipilih tidak valid.';
        }

        const tanggalStr = data.get('tanggal');
        if (tanggalStr) {
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
        formAlat.addEventListener('submit', async event => {
            event.preventDefault();
            
            const data = new FormData(formAlat);
            const errors = validateForm(data);

            document.querySelectorAll('.error').forEach(el => el.textContent = '');
            formAlat.querySelectorAll('[aria-invalid="true"]').forEach(el => el.removeAttribute('aria-invalid'));

            if (Object.keys(errors).length > 0) {
                for (const [field, message] of Object.entries(errors)) {
                    const errorElement = document.querySelector(`#error-${field}`);
                    if (errorElement) {
                        errorElement.textContent = message;
                    }
                    formAlat.elements[field]?.setAttribute('aria-invalid', 'true');
                }

                const firstField = Object.keys(errors)[0];
                formAlat.elements[firstField]?.focus();
                
                if (formStatus) {
                    formStatus.textContent = 'Periksa kembali data yang belum valid.';
                    formStatus.style.color = '#dc2626';
                }
                return;
            }

            // --- TAMBAHAN PENGIRIMAN DATA KE DATABASE (POST ke alats.php) ---
            const dataObj = Object.fromEntries(data.entries());
            try {
                const response = await fetch('./api/alats.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dataObj)
                });
                const result = await response.json();

                if (!response.ok) throw new Error(result.error || 'Gagal menyimpan.');

                if (formStatus) {
                    formStatus.textContent = 'Data berhasil disimpan ke database!';
                    formStatus.style.color = '#16a34a';
                }
                formAlat.reset();
                muatAsetDariDatabase(); // Refresh daftar aset dari database
            } catch (err) {
                if (formStatus) {
                    formStatus.textContent = 'Data valid dan siap dikirim (simulasi berhasil).';
                    formStatus.style.color = '#16a34a';
                }
            }
        });
    }

    // --- 7. MODUL 7: FETCH API, JSON, & ASYNC/AWAIT ---
    const btnLoadApi = document.querySelector('#btn-load-api');
    const btnRetry = document.querySelector('#btn-retry');
    const apiMessage = document.querySelector('#api-message');
    const apiOutput = document.querySelector('#api-output');

    const USE_LOCAL_DATA = true; 
    const apiEndpoint = USE_LOCAL_DATA 
        ? './data/users.json' 
        : 'https://jsonplaceholder.typicode.com/users';

    async function loadUsers() {
        if (!apiMessage || !apiOutput) return;

        apiMessage.textContent = 'Memuat data dari server...';
        apiMessage.style.color = '#2563eb';
        apiOutput.replaceChildren();
        if (btnRetry) btnRetry.style.display = 'none';

        try {
            const response = await fetch(apiEndpoint);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status} Gagal mengambil data.`);
            }

            const users = await response.json();
            users.slice(0, 5).forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.name} (${user.email}) - Kota: ${user.address?.city || 'N/A'}`;
                apiOutput.append(li);
            });

            apiMessage.textContent = `Berhasil memuat ${users.length} data lokal.`;
            apiMessage.style.color = '#16a34a';

        } catch (error) {
            console.error('Fetch Error:', error);
            apiMessage.textContent = 'Data belum dapat dimuat. Periksa koneksi internet Anda.';
            apiMessage.style.color = '#dc2626';
            if (btnRetry) btnRetry.style.display = 'inline-block';
        }
    }

    if (btnLoadApi) {
        btnLoadApi.addEventListener('click', loadUsers);
    }
    if (btnRetry) {
        btnRetry.addEventListener('click', loadUsers);
    }
});