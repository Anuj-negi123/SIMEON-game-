<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allows CORS requests

$host = "localhost";
$username = "root";  
$password = "";     
$database = "simeon_say_db"; 

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]);
    exit();
}

$sql = "SELECT player_name, score FROM scores ORDER BY score DESC LIMIT 10";
$result = $conn->query($sql);

$leaderboard = [];
while ($row = $result->fetch_assoc()) {
    $leaderboard[] = $row;
}

$conn->close();
echo json_encode($leaderboard);
?>
