-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 30, 2024 at 10:29 AM
-- Server version: 5.7.44
-- PHP Version: 8.1.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mayabnax_aats`
--

-- --------------------------------------------------------

--
-- Table structure for table `a`
--

CREATE TABLE `a_qr` (
  `id` int(255) NOT NULL,
  `user_id` varchar(200) NOT NULL,
  `scan_from` varchar(100) DEFAULT NULL,
  `scan_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `scan_year` varchar(4) NOT NULL,
  `scan_month` varchar(2) NOT NULL,
  `scan_time` time NOT NULL,
  `scan_date` date NOT NULL,
  `scan_lat` varchar(100) DEFAULT NULL,
  `scan_long` varchar(100) DEFAULT NULL,
  `device` varchar(50) DEFAULT NULL,
  `ip` varchar(20) NOT NULL,
  `account_login_from` varchar(111) DEFAULT NULL COMMENT 'device login id',
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `a`
--

INSERT INTO `a` (`id`, `user_id`, `scan_from`, `scan_timestamp`, `scan_year`, `scan_month`, `scan_time`, `scan_date`, `scan_lat`, `scan_long`, `device`, `ip`, `account_login_from`, `status`) VALUES
(14, 'https://maps.app.goo.gl/cX94bUJQdLAMbePP6?g_st=iw', 'exampleScanFrom', '2024-07-30 14:28:11', '2024', '07', '19:58:11', '2024-07-30', '22.5790261', '88.4429625', '21091116I', '115.96.113.102', 'exampleAccount', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `a`
--
ALTER TABLE `a`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `a`
--
ALTER TABLE `a`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
