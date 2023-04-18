<?php
    class Participant {
        // Connection
        private $conn;
        // Table
        private $db_table = "participant";
        // Columns
        public $random_id;
        public $qualtrics_id_d1;
        public $qualtrics_id_d5;
        public $exp_condition;
        public $gender_profiles;
        public $pref_distance;
        public $pref_min_age;
        public $pref_max_age;
        public $current_day;
        public $current_step;
        public $created;

        // Db connection
        public function __construct($db){
            $this->conn = $db;
        }

        public function createParticipant(){
            $sqlQuery = "INSERT INTO
                        ". $this->db_table ."
                    SET
                        random_id = :random_id,
                        qualtrics_id_d1 = :qualtrics_id_d1,
                        qualtrics_id_d5 = :qualtrics_id_d5,
                        exp_condition = :exp_condition,
                        gender_profiles = :gender_profiles,
                        pref_distance = :pref_distance,
                        pref_min_age = :pref_min_age,
                        pref_max_age = :pref_max_age,
                        current_day = :current_day,
                        current_step = :current_step,
                        created = :created";

            $stmt = $this->conn->prepare($sqlQuery);

            // sanitize
            $this->random_id=htmlspecialchars(strip_tags($this->random_id));
            $this->qualtrics_id_d1=htmlspecialchars(strip_tags($this->qualtrics_id_d1));
            $this->qualtrics_id_d5=htmlspecialchars(strip_tags($this->qualtrics_id_d5));
            $this->exp_condition=htmlspecialchars(strip_tags($this->exp_condition));
            $this->gender_profiles=htmlspecialchars(strip_tags($this->gender_profiles));
            $this->pref_distance=htmlspecialchars(strip_tags($this->pref_distance));
            $this->pref_min_age=htmlspecialchars(strip_tags($this->pref_min_age));
            $this->pref_max_age=htmlspecialchars(strip_tags($this->pref_max_age));
            $this->current_day=htmlspecialchars(strip_tags($this->current_day));
            $this->current_step=htmlspecialchars(strip_tags($this->current_step));
            $this->created=htmlspecialchars(strip_tags($this->created));

            // bind data
            $stmt->bindParam(":random_id", $this->random_id);
            $stmt->bindParam(":qualtrics_id_d1", $this->qualtrics_id_d1);
            $stmt->bindParam(":qualtrics_id_d5", $this->qualtrics_id_d5);
            $stmt->bindParam(":exp_condition", $this->exp_condition);
            $stmt->bindParam(":gender_profiles", $this->gender_profiles);
            $stmt->bindParam(":pref_distance", $this->pref_distance);
            $stmt->bindParam(":pref_min_age", $this->pref_min_age);
            $stmt->bindParam(":pref_max_age", $this->pref_max_age);
            $stmt->bindParam(":current_day", $this->current_day);
            $stmt->bindParam(":current_step", $this->current_step);
            $stmt->bindParam(":created", $this->created);

            if($stmt->execute()){
               return true;
            }
            return false;
        }

        public function getSingleParticipant(){
            $this->random_id=htmlspecialchars(strip_tags($this->random_id));

              $sqlQuery = "SELECT
                          participant_id
                        FROM
                          ". $this->db_table ."
                      WHERE
                         random_id = ?
                      LIMIT 0,1";
              $stmt = $this->conn->prepare($sqlQuery);
              $stmt->bindParam(1, $this->random_id);
              $stmt->execute();
              $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);

              return $dataRow['participant_id'];
        }

        public function getSingleParticipantTotal() {
            $this->random_id=htmlspecialchars(strip_tags($this->random_id));

              $sqlQuery = "SELECT
                          current_day,
                          current_step,
                          exp_condition,
                          gender_profiles,
                          pref_distance,
                          pref_min_age,
                          pref_max_age
                        FROM
                          ". $this->db_table ."
                      WHERE
                         random_id = ?
                      LIMIT 0,1";
              $stmt = $this->conn->prepare($sqlQuery);
              $stmt->bindParam(1, $this->random_id);
              $stmt->execute();
              $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);

              return $dataRow;
        }
        
        public function getSingleParticipantActualDay() {
            $this->random_id=htmlspecialchars(strip_tags($this->random_id));

              $sqlQuery = "SELECT
                          DATEDIFF(NOW(), created)+1 AS day
                        FROM
                          ". $this->db_table ."
                      WHERE
                         random_id = ?";
              $stmt = $this->conn->prepare($sqlQuery);
              $stmt->bindParam(1, $this->random_id);
              $stmt->execute();
              $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);

              return $dataRow['day'];
        }

        public function updateParticipantProgress(){
            $sqlQuery = "UPDATE ". $this->db_table ."
                    SET
                        current_day = :current_day,
                        current_step = :current_step 
                    WHERE random_id = :random_id";

            $stmt = $this->conn->prepare($sqlQuery);

            // sanitize
            $this->random_id=htmlspecialchars(strip_tags($this->random_id));
            $this->current_day=htmlspecialchars(strip_tags($this->current_day));
            $this->current_step=htmlspecialchars(strip_tags($this->current_step));

            // bind data
            $stmt->bindParam(":random_id", $this->random_id);
            $stmt->bindParam(":current_day", $this->current_day);
            $stmt->bindParam(":current_step", $this->current_step);

            if($stmt->execute()){
               return true;
            }
            return false;
        }
    }
?>
