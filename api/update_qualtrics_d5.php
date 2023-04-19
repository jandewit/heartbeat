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
    $item->qualtrics_id_d5 = $data['qualtrics_id_d5'];

    if($item->updateParticipantQualtricsD5()){
        echo 'OK';
    } else{
        echo 'Error';
    }
?>
