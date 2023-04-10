<?php
    class Action {
        // Connection
        private $conn;
        // Table
        private $db_table = "action";
        // Columns
        public $participant_id;
        public $picture_id;
        public $name;
        public $order_id;
        public $is_liked;
        public $is_engaged_with;
        //public $timestamp;
        public $time_shown;
        public $was_match;
        public $num_profile_items;

        // Db connection
        public function __construct($db){
            $this->conn = $db;
        }

        public function createAction(){
            $sqlQuery = "INSERT INTO
                        ". $this->db_table ."
                    SET
                        participant_id = :participant_id,
                        day_nr = :day_nr,
                        picture_id = :picture_id,
                        name = :name,
                        order_id = :order_id,
                        is_liked = :is_liked,
                        is_engaged_with = :is_engaged_with,
                        time_shown = :time_shown,
                        was_match = :was_match,
                        num_profile_items = :num_profile_items";

            $stmt = $this->conn->prepare($sqlQuery);

            // sanitize
            $this->participant_id=htmlspecialchars(strip_tags($this->participant_id));
            $this->day_nr=htmlspecialchars(strip_tags($this->day_nr));
            $this->picture_id=htmlspecialchars(strip_tags($this->picture_id));
            $this->name=htmlspecialchars(strip_tags($this->name));
            $this->order_id=htmlspecialchars(strip_tags($this->order_id));
            $this->is_liked=htmlspecialchars(strip_tags($this->is_liked));
            $this->is_engaged_with=htmlspecialchars(strip_tags($this->is_engaged_with));
            $this->time_shown=htmlspecialchars(strip_tags($this->time_shown));
            $this->was_match=htmlspecialchars(strip_tags($this->was_match));
            $this->num_profile_items=htmlspecialchars(strip_tags($this->num_profile_items));

            // bind data
            $stmt->bindParam(":participant_id", $this->participant_id);
            $stmt->bindParam(":day_nr", $this->day_nr);
            $stmt->bindParam(":picture_id", $this->picture_id);
            $stmt->bindParam(":name", $this->name);
            $stmt->bindParam(":order_id", $this->order_id);
            $stmt->bindParam(":is_liked", $this->is_liked);
            $stmt->bindParam(":is_engaged_with", $this->is_engaged_with);
            $stmt->bindParam(":time_shown", $this->time_shown);
            $stmt->bindParam(":was_match", $this->was_match);
            $stmt->bindParam(":num_profile_items", $this->num_profile_items);

            if($stmt->execute()){
               return true;
            }
            return false;
        }

    }
?>
