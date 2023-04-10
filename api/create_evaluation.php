<?php
    ini_set('display_errors', 1);
    //header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    include_once 'db.php';
    include_once 'evaluation.php';
    include_once 'participant.php';
    $database = new Database();
    $db = $database->getConnection();
    $p = new Participant($db);
    $item = new Evaluation($db);
    $data = $_POST;

    $p->random_id = $data['id'];
    $part_id = $p->getSingleParticipant();

    $item->participant_id = $part_id;
    $item->day_nr = $data['day_nr'];
    $item->q1_value = $data['q1_value'];

    if($item->createEvaluation()){
        echo '{"status": "OK"}';
    } else{
        echo 'Error';
    }
?>
