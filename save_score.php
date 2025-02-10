<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: http://127.0.0.1:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

header("Content-Type: application/json");

include 'db.php'; 

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["error" => "Invalid request method"]);
    exit();
}

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!isset($data['player_name']) || !isset($data['score'])) {
    echo json_encode(["error" => "Invalid input data", "raw_input" => $input]);
    exit();
}

$player_name = $data['player_name'];
$score = $data['score'];

file_put_contents("debug.log", "Received: player_name=$player_name, score=$score\n", FILE_APPEND);

$stmt = $conn->prepare("INSERT INTO scores (player_name, score) VALUES (?, ?) ON DUPLICATE KEY UPDATE score = GREATEST(score, VALUES(score))");
$stmt->bind_param("si", $player_name, $score);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Score saved successfully"]);
} else {
    echo json_encode(["error" => "Database error: " . $stmt->error]);
}

$stmt->close();
?>
