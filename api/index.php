<?php
declare(strict_types=1);

// Terapkan header JSON juga untuk index
header('Content-Type: application/json; charset=utf-8');
http_response_code(200);

echo json_encode([
    'status' => 'success',
    'message' => 'Selamat datang di REST API Portal Transparansi Warisan & Aset Pusaka Keluarga',
    'version' => '1.0.0',
    'server_time' => date('Y-m-d H:i:s')
], JSON_UNESCAPED_UNICODE);

exit;