<?php
$response = [];  

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (isset($input['player_name']) && isset($input['score'])) {
        $playerName = $input['player_name'];
        $score = $input['score'];

     
        $response['success'] = true;
        $response['message'] = "Score saved successfully for player: $playerName with score: $score";
    } else {
        $response['success'] = false;
        $response['message'] = "Missing player_name or score data";
    }

} else {
    $response['error'] = "Invalid request method";
}

header('Content-Type: application/json'); 

echo json_encode($response);
?>


