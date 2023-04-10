<?php
    //ini_set('display_errors', 1);
    //header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    include_once 'db.php';
    include_once 'participant.php';
    include_once 'infosharing.php';
    $database = new Database();
    $db = $database->getConnection();
    $p = new Participant($db);
    $item = new InformationSharing($db);
    $data = $_GET;

    $p->random_id = $data['random_id'];
    $part_id = $p->getSingleParticipant();

    $item->participant_id = $part_id;
    $item->is_initial = $data['is_initial'];
    $item->day_nr = $data['day_nr'];

    $result = $item->getInformationSharing();

    echo '{"is_age": "' . $result['is_age'] . '", "is_distance": "' . $result['is_distance'] . '", "is_traits": "' . $result['is_traits'] . '", "is_intentions": "' . $result['is_intentions'] . '", "is_interests": "' . $result['is_interests'] . '", "is_music": "' . $result['is_music'] . '", "is_holiday": "' . $result['is_holiday'] . '"}';
?>
