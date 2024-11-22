<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Content-Type");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

if($method != "GET") {
    http_response_code(405);
    exit();
}

$mysqli = new mysqli('localhost', 'root', '', 'diariodb');

extract($_REQUEST);
$query = "SELECT * FROM noticias";

if(isset($_REQUEST['categoria'])) {
    $query .= " where categoria = ?";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param('s', $categoria);
} else {
    $stmt = $mysqli->prepare($query);
}

$stmt->execute();

$myArray = array();
if ($result = $stmt->get_result()) {
    $myArray = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($myArray);
}

$result->close();
$mysqli->close();
////http://localhost/api/noticias.php?inicio=0&fin=60
?>

