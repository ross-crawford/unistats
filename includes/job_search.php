<?php 

// DB Connection variables
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
// Obtain the search query input and prevent SQL injection
$query = mysqli_real_escape_string($conn, $_POST['data']);
$defaultDate = date('m-d-Y h:i:s', time());
// SQL query to insert into database
$sqlInsert = "INSERT INTO careers (query) VALUES ('$query')";
// mysqli_query($conn, $sqlInsert);
// SQL query to update table in database
$sqlUpdate = "UPDATE careers 
              SET counter = counter + 1, date_searched = SYSDATE()
              WHERE query = '$query'";
//   SQL query to check table for existing duplicate records
$sqlCheck = "SELECT * FROM careers WHERE query='$query'";

// Query database to find matching results
$result = mysqli_query($conn, $sqlCheck);
// assign resulting row to a variable for comparison with query
$row = mysqli_fetch_assoc($result);
// Check if row query value matches entered value, if so update the row, else, create a new row
if ($row['query'] == $query) {
    mysqli_query($conn, $sqlUpdate);
} else {
    mysqli_query($conn, $sqlInsert);
}

// Close connection when finished
$conn->close();
?>