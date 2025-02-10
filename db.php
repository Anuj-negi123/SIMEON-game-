<?php
// Database connection settings
$host = "localhost"; // Hostname (localhost for local server)
$username = "root";  // MySQL username
$password = "";      // MySQL password (default is empty for XAMPP/WAMP)
$database = "simon_says_db"; // Name of your database

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error); // Error message if connection fails
} else {
    echo "✅ Database connected successfully!";
}

// Close the connection (optional)
$conn->close();
?>
