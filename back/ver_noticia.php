<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
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

extract($_REQUEST);

$mysqli = new mysqli('localhost', 'root', '', 'diariodb');

$myArray = array();
if ($result = $mysqli->query("SELECT * FROM noticias where id_noticia=$id_noticia")) {
    $noticia = $result->fetch_object();
    
    if(!$noticia) {
        $noticia = new stdClass();
    }

    echo json_encode($noticia);
}

$result->close();
$mysqli->close();

//http://localhost/api/ver_noticia.php?id_noticia=19

?>