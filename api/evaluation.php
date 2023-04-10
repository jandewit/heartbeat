<?php
    class Evaluation {
        // Connection
        private $conn;
        // Table
        private $db_table = "evaluation";
        // Columns
        public $participant_id;
        public $day_nr;
        public $q1_value;

        // Db connection
        public function __construct($db){
            $this->conn = $db;
        }

        public function createEvaluation(){
            $sqlQuery = "INSERT INTO
                        ". $this->db_table ."
                    SET
                        participant_id = :participant_id,
                        day_nr = :day_nr,
                        q1_value = :q1_value";

            $stmt = $this->conn->prepare($sqlQuery);

            // sanitize
            $this->participant_id=htmlspecialchars(strip_tags($this->participant_id));
            $this->day_nr=htmlspecialchars(strip_tags($this->day_nr));
            $this->q1_value=htmlspecialchars(strip_tags($this->q1_value));

            // bind data
            $stmt->bindParam(":participant_id", $this->participant_id);
            $stmt->bindParam(":day_nr", $this->day_nr);
            $stmt->bindParam(":q1_value", $this->q1_value);

            if($stmt->execute()){
               return true;
            }
            return false;
        }

    }
?>
