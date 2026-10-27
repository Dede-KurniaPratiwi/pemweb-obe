<?php
declare(strict_types=1);

// 1. Fungsi Middleware Sederhana (Sesuai Poin 9 Modul)
function jsonHeaderMiddleware(): void {
    header('Content-Type: application/json; charset=utf-8');
}

// Jalankan middleware paling awal sebelum logika utama diproses
jsonHeaderMiddleware();

$method = $_SERVER['REQUEST_METHOD'];

// Data inventaris aset warisan keluarga yang disinkronkan dengan app.js
if ($method === 'GET') {
    http_response_code(200);
    echo json_encode([
        'status' => 'success',
        'data' => [
            ['id' => 1, 'nama' => 'Sertifikat Tanah', 'kategori' => 'Legal', 'jumlah' => 2, 'kondisi' => 'Baik', 'lokasi' => 'Brankas Utama Notaris'],
            ['id' => 2, 'nama' => 'Arsip Surat Berharga Keluarga', 'kategori' => 'Dokumen', 'jumlah' => 15, 'kondisi' => 'Baik', 'lokasi' => 'Ruang Arsip Khusus'],
            ['id' => 3, 'nama' => 'Perhiasan Emas Warisan', 'kategori' => 'Berharga', 'jumlah' => 5, 'kondisi' => 'Perlu Cek', 'lokasi' => 'Kotak Deposit Bank'],
            ['id' => 4, 'nama' => 'Properti Ruko Komersial', 'kategori' => 'Properti', 'jumlah' => 1, 'kondisi' => 'Baik', 'lokasi' => 'Kantor Pengelola'],
            ['id' => 5, 'nama' => 'Saham Perusahaan Keluarga', 'kategori' => 'Saham', 'jumlah' => 1000, 'kondisi' => 'Baik', 'lokasi' => 'Portofolio Digital'],
            ['id' => 6, 'nama' => 'Barang Peninggalan Keluarga', 'kategori' => 'Pusaka', 'jumlah' => 8, 'kondisi' => 'Perlu Cek', 'lokasi' => 'Ruang Khusus Pusaka']
        ]
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($method === 'POST') {
    try {
        $payload = json_decode(
            file_get_contents('php://input'),
            true,
            512,
            JSON_THROW_ON_ERROR
        );
    } catch (JsonException $e) {
        http_response_code(400);
        echo json_encode(['error' => 'Format JSON tidak valid'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if (!is_array($payload)) {
        http_response_code(400);
        echo json_encode(['error' => 'Body JSON harus berupa object'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $nama = trim((string)($payload['nama'] ?? ''));
    $kategori = trim((string)($payload['kategori'] ?? ''));
    $jumlah = filter_var($payload['jumlah'] ?? null, FILTER_VALIDATE_INT);
    $kondisi = trim((string)($payload['kondisi'] ?? ''));

    // Validasi aturan bisnis (Sesuai validasi di form app.js)
    $kategoriValid = ['Legal', 'Dokumen', 'Berharga', 'Properti', 'Saham', 'Pusaka'];
    $kondisiValid = ['Baik', 'Perlu Cek'];

    if ($nama === '' || strlen($nama) > 100 || !in_array($kategori, $kategoriValid, true) || $jumlah === false || $jumlah < 0 || !in_array($kondisi, $kondisiValid, true)) {
        http_response_code(422);
        echo json_encode(['error' => 'Data tidak valid atau melanggar aturan bisnis.'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    http_response_code(201);
    echo json_encode([
        'message' => 'Data aset pusaka berhasil diterima & divalidasi', 
        'data' => compact('nama', 'kategori', 'jumlah', 'kondisi')
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

header('Allow: GET, POST');
http_response_code(405);
echo json_encode(['error' => 'Method tidak diizinkan'], JSON_UNESCAPED_UNICODE);
exit;