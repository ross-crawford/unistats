<?php

/** DB connection **/
$server = "localhost";
$user = "root";
$pass = "";
$name = "uni_stats";

// Create connection
$conn = mysqli_connect($server, $user, $pass, $name);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

// SQL script to select top 5 search results
$sql = 'SELECT query FROM careers ORDER BY count DESC LIMIT 5';
$result = mysqli_query($conn, $sql);
echo json_encode($result);
// Close connection when finished
$conn->close();

?>