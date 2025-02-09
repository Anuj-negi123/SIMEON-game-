
<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $player_name = $data['player_name'] ?? '';
    $score = $data['score'] ?? 0;

    if (!empty($player_name)) {
        $stmt = $conn->prepare("INSERT INTO scores (player_name, score) VALUES (?, ?)");
        $stmt->bind_param("si", $player_name, $score);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Score saved successfully"]);
        } else {
            echo json_encode(["error" => "Database error"]);
        }
    } else {
        echo json_encode(["error" => "Invalid player name"]);
    }
}
?>

