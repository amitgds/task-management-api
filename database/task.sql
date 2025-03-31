-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 31, 2025 at 12:03 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `task_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `due_date` datetime NOT NULL,
  `status` enum('pending','in-progress','completed') NOT NULL,
  `assigned_user_name` text DEFAULT NULL,
  `category` text DEFAULT NULL,
  `task_comment` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`task_id`, `title`, `description`, `due_date`, `status`, `assigned_user_name`, `category`, `task_comment`, `created_at`, `updated_at`) VALUES
(8, 'This is my new task', 'This is task description for task id 1', '1999-12-26 00:00:00', 'pending', NULL, NULL, NULL, '2025-03-28 20:27:42', '2025-03-28 20:27:42'),
(9, 'This is my new task', 'This is task description for task id 2', '1999-12-26 00:00:00', 'pending', NULL, NULL, NULL, '2025-03-28 20:28:01', '2025-03-28 20:28:01'),
(10, 'This is my updated task', 'This is task description', '1999-12-26 00:00:00', 'completed', 'Ram', 'Hot', 'good task', '2025-03-28 20:28:09', '2025-03-28 20:36:38'),
(11, 'This is my new task', 'This is task description for task id 4', '1999-12-26 00:00:00', 'pending', NULL, NULL, NULL, '2025-03-28 20:30:20', '2025-03-28 20:30:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`task_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
