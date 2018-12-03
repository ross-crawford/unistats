<?php 

require_once 'db.php';

$query = mysqli_real_escape_string($conn, $POST_['search']);
// $dateTime = date('Y-m-d H:i:s');
$sql = "INSERT INTO careers (query) VALUES ($query)";
mysqli_query($conn, $sql);
// Close connection when finished
$conn->close();
?>