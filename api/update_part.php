<?php
    //header("Access-Control-Allow-Origin: *");
    //header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    include_once 'db.php';
    include_once 'participant.php';
    $database = new Database();
    $db = $database->getConnection();
    $item = new Participant($db);
    $data = $_POST;

    $item->random_id = $data['id'];
    $item->current_day = $data['current_day'];
    $item->current_step = $data['current_step'];

    if($item->updateParticipantProgress()){
        echo 'OK';
    } else{
        echo 'Error';
    }
?>
