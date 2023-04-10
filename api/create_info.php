<?php
    //ini_set('display_errors', 1);
    //header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    include_once 'db.php';
    include_once 'infosharing.php';
    include_once 'participant.php';
    $database = new Database();
    $db = $database->getConnection();
    $p = new Participant($db);
    $item = new InformationSharing($db);
    $data = $_POST;

    $p->random_id = $data['id'];
    $part_id = $p->getSingleParticipant();
    $day_nr = $p->getSingleParticipantActualDay();

    $item->participant_id = $part_id;
    $item->day_nr = $day_nr;
    $item->is_initial = $data['is_initial'];
    $item->is_age = $data['is_age'];
    $item->is_distance = $data['is_distance'];
    $item->is_traits = $data['is_traits'];
    $item->is_intentions = $data['is_intentions'];
    $item->is_interests = $data['is_interests'];
    $item->is_music = $data['is_music'];
    $item->is_holiday = $data['is_holiday'];

    if($item->createInfoSharing()){
        echo '{"status": "OK"}';
    } else{
        echo 'Error';
    }
?>
