<?php
    //ini_set('display_errors', 1);
    //header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    include_once 'db.php';
    include_once 'participant.php';
    $database = new Database();
    $db = $database->getConnection();
    $item = new Participant($db);
    $data = $_GET;

    $item->random_id = $data['id'];

    echo $item->getSingleParticipantActualDay();
?>
