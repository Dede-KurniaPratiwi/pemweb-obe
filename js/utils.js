
// Fungsi untuk meringkas data aset dan menangani error dasar
export function ringkasInventaris(data) {
  if (!Array.isArray(data)) {
    throw new TypeError('Data harus berupa array of objects');
  }
  return {
    totalJenisAset: data.length,
    totalUnitAset: data.reduce((sum, item) => sum + item.jumlah, 0),
    perluPerbaikan: data.filter(item => item.kondisi !== 'Baik').length
  };
}