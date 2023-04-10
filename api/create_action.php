<?php
    //ini_set('display_errors', 1);
    //header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    include_once 'db.php';
    include_once 'action.php';
    include_once 'participant.php';
    $database = new Database();
    $db = $database->getConnection();
    $p = new Participant($db);
    $item = new Action($db);
    $data = $_POST;

    $p->random_id = $data['random_id'];
    $part_id = $p->getSingleParticipant();

    $item->participant_id = $part_id;
    $item->day_nr = $data['day_nr'];
    $item->picture_id = $data['picture_id'];
    $item->name = $data['name'];
    $item->order_id = $data['order_id'];
    $item->is_liked = $data['is_liked'];
    $item->is_engaged_with = $data['is_engaged_with'];
    $item->time_shown = $data['time_shown'];
    $item->was_match = $data['was_match'];
    $item->num_profile_items = $data['num_profile_items'];

    if($item->createAction()){
        echo '{"status": "OK"}';
    } else{
        echo 'Error';
    }
?>
