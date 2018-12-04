<?php

// DB connection variables
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
$sql = 'SELECT query, date_searched FROM careers ORDER BY date_searched DESC LIMIT 5';
// Query to db with connection
$result = mysqli_query($conn, $sql)
or die('Error retreiving database query');
// Initialise array to store the results
$data = array();
// Loop through results and store each row as an array entry
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}
// convert array to json
$json_result = json_encode($data);
// echo json results
echo $json_result;
// Close connection when finished
$conn->close();

?>