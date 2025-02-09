
<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $player_name = $_POST['player_name'] ?? '';

    if (!empty($player_name)) {
        $stmt = $conn->prepare("INSERT INTO scores (player_name, score) VALUES (?, ?) ON DUPLICATE KEY UPDATE score=VALUES(score)");
        $stmt->bind_param("s", $player_name);

        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["error" => "Database insertion failed"]);
        }
    } else {
        echo json_encode(["error" => "Invalid player name"]);
    }
}
?>