-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 13, 2024 at 07:31 PM
-- Server version: 10.3.39-MariaDB-1:10.3.39+maria~ubu1804
-- PHP Version: 8.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db`
--

-- --------------------------------------------------------

--
-- Table structure for table `action`
--

CREATE TABLE `action` (
  `action_id` int(11) NOT NULL,
  `participant_id` int(11) NOT NULL,
  `day_nr` int(11) NOT NULL,
  `picture_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `order_id` int(11) NOT NULL,
  `is_liked` tinyint(1) NOT NULL,
  `is_engaged_with` tinyint(1) NOT NULL,
  `timestamp` timestamp(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3),
  `time_shown` timestamp(3) NULL DEFAULT NULL,
  `was_match` tinyint(1) NOT NULL,
  `num_profile_items` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `evaluation`
--

CREATE TABLE `evaluation` (
  `evaluation_id` int(11) NOT NULL,
  `participant_id` int(11) NOT NULL,
  `day_nr` int(11) NOT NULL,
  `q1_value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `infosharing`
--

CREATE TABLE `infosharing` (
  `sharing_id` int(11) NOT NULL,
  `participant_id` int(11) NOT NULL,
  `day_nr` int(11) NOT NULL,
  `is_initial` tinyint(1) NOT NULL,
  `is_age` tinyint(1) NOT NULL,
  `is_distance` tinyint(1) NOT NULL,
  `is_traits` tinyint(1) NOT NULL,
  `is_intentions` tinyint(1) NOT NULL,
  `is_interests` tinyint(1) NOT NULL,
  `is_music` tinyint(1) NOT NULL,
  `is_holiday` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `participant`
--

CREATE TABLE `participant` (
  `participant_id` int(11) NOT NULL,
  `random_id` varchar(128) NOT NULL,
  `qualtrics_id_d1` varchar(255) NOT NULL,
  `qualtrics_id_d5` varchar(255) NOT NULL,
  `exp_condition` int(11) NOT NULL,
  `gender_profiles` int(11) NOT NULL,
  `pref_distance` int(11) NOT NULL,
  `pref_min_age` int(11) NOT NULL,
  `pref_max_age` int(11) NOT NULL,
  `current_day` int(11) NOT NULL,
  `current_step` int(11) NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `action`
--
ALTER TABLE `action`
  ADD PRIMARY KEY (`action_id`);

--
-- Indexes for table `evaluation`
--
ALTER TABLE `evaluation`
  ADD PRIMARY KEY (`evaluation_id`);

--
-- Indexes for table `infosharing`
--
ALTER TABLE `infosharing`
  ADD PRIMARY KEY (`sharing_id`);

--
-- Indexes for table `participant`
--
ALTER TABLE `participant`
  ADD PRIMARY KEY (`participant_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `action`
--
ALTER TABLE `action`
  MODIFY `action_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `evaluation`
--
ALTER TABLE `evaluation`
  MODIFY `evaluation_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `infosharing`
--
ALTER TABLE `infosharing`
  MODIFY `sharing_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `participant`
--
ALTER TABLE `participant`
  MODIFY `participant_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
