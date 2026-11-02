// --- METHOD DELETE: Menghapus Aset dari Database ---
if ($method === 'DELETE') {
    $id =$_GET['id'] ?? null;
    
    if (!$id \vert{}\vert{} !filter_var($id, FILTER_VALIDATE_INT)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "error" => "ID aset tidak valid atau tidak disertakan."], JSON_UNESCAPED_UNICODE);
        exit;
    }

    try {
        $stmt = db()->prepare("DELETE FROM alat WHERE id = ?");
        $stmt->execute([$id]);

        if ($stmt->rowCount() > 0) {
            http_response_code(200);
            echo json_encode(["status" => "success", "message" => "Aset pusaka berhasil dihapus."], JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(404);
            echo json_encode(["status" => "error", "error" => "Aset dengan ID tersebut tidak ditemukan."], JSON_UNESCAPED_UNICODE);
        }
        exit;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "error" => "Gagal menghapus data: " . $e->getMessage()], JSON_UNESCAPED_UNICODE);
        exit;
    }
}