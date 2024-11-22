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

if($method != "DELETE") {
    http_response_code(405);
    exit();
}

extract($_REQUEST);
$mysqli = new mysqli('localhost', 'root', '', 'diariodb');

if(isset($_REQUEST['id_noticia'])) {
    $mysqli->query("DELETE FROM noticias where id_noticia=$id_noticia");
}

$mysqli->close();

//http://localhost/api/ver_noticia.php?id_noticia=19

?>