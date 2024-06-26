<?php
    class InformationSharing {
        // Connection
        private $conn;
        // Table
        private $db_table = "infosharing";
        // Columns
        public $day_nr;
        public $is_initial;
        public $is_age;
        public $is_distance;
        public $is_traits;
        public $is_intentions;
        public $is_interests;

        // Db connection
        public function __construct($db){
            $this->conn = $db;
        }

        public function getInformationSharing(){
            $this->random_id=htmlspecialchars(strip_tags($this->random_id));

              $sqlQuery = "SELECT
                          is_age,
                          is_distance,
                          is_traits,
                          is_intentions,
                          is_interests,
                          is_music,
                          is_holiday
                        FROM
                          ". $this->db_table ."
                      WHERE
                         participant_id = ? AND is_initial = ? AND day_nr = ?
                      LIMIT 0,1";
              $stmt = $this->conn->prepare($sqlQuery);
              $stmt->bindParam(1, $this->participant_id);
              $stmt->bindParam(2, $this->is_initial);
              $stmt->bindParam(3, $this->day_nr);
              $stmt->execute();
              $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);

              return $dataRow;
        }        

        public function createInfoSharing(){
            $sqlQuery = "INSERT INTO
                        ". $this->db_table ."
                    SET
                        participant_id = :participant_id,
                        day_nr = :day_nr,
                        is_initial = :is_initial,
                        is_age = :is_age,
                        is_distance = :is_distance,
                        is_traits = :is_traits,
                        is_intentions = :is_intentions,
                        is_interests = :is_interests,
                        is_music = :is_music,
                        is_holiday = :is_holiday";

            $stmt = $this->conn->prepare($sqlQuery);

            // sanitize
            $this->day_nr=htmlspecialchars(strip_tags($this->day_nr));
            $this->is_initial=htmlspecialchars(strip_tags($this->is_initial));
            $this->is_age=htmlspecialchars(strip_tags($this->is_age));
            $this->is_distance=htmlspecialchars(strip_tags($this->is_distance));
            $this->is_traits=htmlspecialchars(strip_tags($this->is_traits));
            $this->is_intentions=htmlspecialchars(strip_tags($this->is_intentions));
            $this->is_interests=htmlspecialchars(strip_tags($this->is_interests));
            $this->is_music=htmlspecialchars(strip_tags($this->is_music));
            $this->is_holiday=htmlspecialchars(strip_tags($this->is_holiday));

            // bind data
            $stmt->bindParam(":participant_id", $this->participant_id);
            $stmt->bindParam(":day_nr", $this->day_nr);
            $stmt->bindParam(":is_initial", $this->is_initial);
            $stmt->bindParam(":is_age", $this->is_age);
            $stmt->bindParam(":is_distance", $this->is_distance);
            $stmt->bindParam(":is_traits", $this->is_traits);
            $stmt->bindParam(":is_intentions", $this->is_intentions);
            $stmt->bindParam(":is_interests", $this->is_interests);
            $stmt->bindParam(":is_music", $this->is_music);
            $stmt->bindParam(":is_holiday", $this->is_holiday);

            if($stmt->execute()){
               return true;
            }
            return false;
        }
    }
?>
