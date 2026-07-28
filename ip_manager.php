<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$ipFile = 'ip.txt';
$action = isset($_GET['action']) ? $_GET['action'] : '';

// Đọc dữ liệu
if ($action === 'get') {
    if (file_exists($ipFile)) {
        $content = file_get_contents($ipFile);
        $data = json_decode($content, true);
        if ($data && is_array($data)) {
            echo json_encode(['success' => true, 'data' => $data]);
        } else {
            echo json_encode(['success' => true, 'data' => []]);
        }
    } else {
        echo json_encode(['success' => true, 'data' => []]);
    }
}
// Lưu dữ liệu
elseif ($action === 'save') {
    $input = json_decode(file_get_contents('php://input'), true);
    if ($input && isset($input['data'])) {
        file_put_contents($ipFile, json_encode($input['data'], JSON_PRETTY_PRINT));
        echo json_encode(['success' => true, 'message' => 'Đã lưu IP']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Dữ liệu không hợp lệ']);
    }
}
// Reset dữ liệu
elseif ($action === 'reset') {
    file_put_contents($ipFile, json_encode([], JSON_PRETTY_PRINT));
    echo json_encode(['success' => true, 'message' => 'Đã reset IP']);
}
else {
    echo json_encode(['success' => false, 'message' => 'Action không hợp lệ']);
}
?>
