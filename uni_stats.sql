-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 04, 2018 at 04:22 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `uni_stats`
--

-- --------------------------------------------------------

--
-- Table structure for table `careers`
--

CREATE TABLE `careers` (
  `id` int(10) NOT NULL,
  `query` varchar(64) NOT NULL,
  `date_searched` datetime DEFAULT CURRENT_TIMESTAMP,
  `counter` int(11) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `careers`
--

INSERT INTO `careers` (`id`, `query`, `date_searched`, `counter`) VALUES
(1, 'computing', '2018-12-04 14:19:15', 22),
(2, 'science', '2018-12-03 12:33:28', 10),
(3, 'mathematics', '2018-12-03 12:34:14', 8),
(4, 'law', '2018-12-03 12:34:30', 13),
(5, 'education', '2018-12-03 12:35:03', 15),
(6, 'journalism', '2018-12-03 12:35:22', 6),
(7, 'business', '2018-12-03 12:35:34', 3),
(8, 'art', '2018-12-03 14:38:42', 30),
(9, 'architecture', '2018-12-04 15:22:26', 18),
(10, 'butcher', '2018-12-04 15:22:26', 4),
(11, 'english', '2018-12-04 15:22:26', 12),
(12, 'sports', '2018-12-04 15:22:26', 18);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `careers`
--
ALTER TABLE `careers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `careers`
--
ALTER TABLE `careers`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
