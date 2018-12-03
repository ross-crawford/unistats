<?php

// Database connection variables
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

?>