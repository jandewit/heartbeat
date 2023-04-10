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

    $result = $item->getSingleParticipantTotal();
    echo '{"current_day": "' . $result['current_day'] . '", "current_step": "' . $result['current_step'] . '", "exp_condition": "' . $result['exp_condition'] . '", "gender_profiles": "' . $result['gender_profiles'] . '", "pref_distance": "' . $result['pref_distance'] . '", "pref_min_age": "' . $result['pref_min_age'] . '", "pref_max_age": "' . $result['pref_max_age'] . '"}';
?>
