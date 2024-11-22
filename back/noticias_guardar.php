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

$requestBody = file_get_contents('php://input');
$body = json_decode($requestBody, true);

$id_noticia = isset($_GET['id_noticia']) ? $_GET['id_noticia'] : null;
$id_noticia = filter_var($id_noticia, FILTER_VALIDATE_INT);

$titulo = isset($body['titulo']) ? $body['titulo'] : null;
$copete = isset($body['copete']) ? $body['copete'] : null;
$cuerpo = isset($body['cuerpo']) ? $body['cuerpo'] : null;
$categoria = isset($body['categoria']) ? $body['categoria'] : null;
$imagen = isset($body['imagen']) ? $body['imagen'] : null;

$errors = [];

if (empty($titulo)) {
    $errors[] = 'titulo es requerido.';
}
if (empty($copete)) {
    $errors[] = 'copete es requerido.';
}
if (empty($cuerpo)) {
    $errors[] = 'cuerpo es requerido.';
}
if (empty($categoria)) {
    $errors[] = 'categoria es requerido.';
}
if (empty($imagen)) {
    $errors[] = 'imagen es requerido.';
}

http_response_code(400);
if (!empty($errors)) {
    echo json_encode(['errores' => $errors]);
    return;
}

$mysqli = new mysqli('localhost', 'root', '', 'diariodb');

if($method == 'PUT') {
    if(!$id_noticia) {
        $errors[] = 'id_noticia es requerido para editar una noticia.';
        echo json_encode(['errores' => $errors]);
        $mysqli->close();
        return;
    }

    $stmt = editarNoticia();
    http_response_code(200);
} else if($method == 'POST') {
    $stmt = crearNoticia();
    http_response_code(201);
} else {
    http_response_code(405);
    exit();
}

$stmt->execute();

function editarNoticia() {
    global $mysqli, $titulo, $copete, $cuerpo, $categoria, $imagen, $id_noticia;

    $query = "UPDATE noticias SET titulo=?, copete=?, cuerpo=?, categoria=?, imagen=?, fecha=? WHERE id_noticia=?";
    $stmt = $mysqli->prepare($query);

    $fecha = date('Y-m-d');
    $stmt->bind_param('ssssssi', $titulo, $copete, $cuerpo, $categoria, $imagen, $fecha, $id_noticia);
    return $stmt;
}

function crearNoticia() {
    global $mysqli, $titulo, $copete, $cuerpo, $imagen, $fecha, $categoria;

    $query = "INSERT INTO noticias (titulo, copete, cuerpo, imagen, fecha, categoria) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $mysqli->prepare($query);
    
    $fecha = date('Y-m-d');
    $stmt->bind_param('ssssss', $titulo, $copete, $cuerpo, $imagen, $fecha, $categoria);
    return $stmt;
}

$mysqli->close();

//http://localhost/api/ver_noticia.php?id_noticia=19

?>