-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 13, 2026 at 11:27 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sell`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `price` varchar(300) NOT NULL,
  `image` varchar(500) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `title`, `price`, `image`, `id_user`) VALUES
(1, 'Ngyễn Quang Móm', '900', 'LPH_9445.jpg', 28),
(3, 'Áo thi đấu Argentina', '700', 'shopping.webp', 28),
(4, 'Áo Manchester United', '700', 'download.webp', 29);

-- --------------------------------------------------------

--
-- Table structure for table `register`
--

CREATE TABLE `register` (
  `id` int(11) NOT NULL,
  `email` varchar(500) NOT NULL,
  `name` varchar(200) NOT NULL,
  `password` varchar(1000) NOT NULL,
  `avatar` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `register`
--

INSERT INTO `register` (`id`, `email`, `name`, `password`, `avatar`) VALUES
(19, 'duy@gmail.com', 'duy', 'scrypt:32768:8:1$HEUoyV33L0a0IvPK$766c9fac52dfc31f9a9310ea472dc3da6b6ee81743b1b8fb7e25737e1f127b2d3d05cf31716bed30aa2f3e4680645526351001f0ed94bf8b59eae6219d32d612', 'LPH_9517.jpg'),
(21, 'me@gmail.com', 'me', 'scrypt:32768:8:1$qCSK7YRvwFGmsKGs$8be46b3d59ed2cec947f6d3ca332977abd22971b324402f15ffe519515eaec9c650afe4e698eab7213dc623358c2a072e84b8c2793bc89c53bd2d735c326aa90', 'LPH_9445.jpg'),
(22, 'trang@gmail.com', 'Nguyễn Thị Huế ', 'scrypt:32768:8:1$T3lknyxkFrq9w0QB$75f7a0c685a8fcc6858fb4a455d8bc2e0dc0db699e7b027346e0e4fea90e8909a3577e174450eca7a5da9331d3e2c8d1eae633da2ab61e427e5263fb6375abf8', 'LPH_9501.jpg'),
(23, 'chang@gmail.com', 'chang', 'scrypt:32768:8:1$OEdH9JOvz8Fe49bv$944d9a784229dd1acf00008215a2556fbc450653bd55403f8aca65c2a98cc87d1c5b1bb08c06b3ee0a0a66ebc83d3560771c07fcc1568f1ba6bfc37e14acba09', 'LPH_9501.jpg'),
(24, 'dung@gmail.com', 'dung', 'scrypt:32768:8:1$6S7zhekUa7OYR3aL$72eb5cb169bcbc55a1bdb5914c65fbec24cf92583699856f530dde9018de48208770926b668ed1981d100c27ffb7765bd05bf2e463e128e8ab5ed46a048fd126', 'LPH_9441.jpg'),
(26, 'phanhoang@gmail.com', 'phan', 'scrypt:32768:8:1$Lh5Zsc8U66dkLVJo$d4b550d473ad48445a862dea57063004150fc704e8522c6c9e8855a2f69d152e94c6ebf4e7d63ea8b5714c21377f4e43f32b040d845768aedee45788e4085e19', 'LPH_9517.jpg'),
(27, 'nguyenquanghuy110605@gmail.com', 'Nguyễn Quang Huy', 'scrypt:32768:8:1$GS4SIDOTrD8vBXKf$6a9796c71a83c27e9ce398012ab7625361b38026b006d3d9a5972b4ffede1c1d9bee1ab99b13875c31e11116bfb9fd75e6bd0178882f1a5d5c5aca066e369c7c', 'LPH_9445.jpg'),
(28, 'cho@gmail.com', 'Huy', 'scrypt:32768:8:1$t32BPbo8ijYSx45e$04d23a2eb69cb9c0880533e131d6fd5af411366865c0fa30227fd3f9ea8fd6597c3814d9392b0f7c7a515cdb1e6d21751da58754b3d1ac3667f95709dcebec77', 'LPH_9517.jpg'),
(29, 'huynq2.23itb@vku.udn.vn', 'Nguyễn Quang Huy', 'scrypt:32768:8:1$vbZpANGbyxuvfPCb$05057a244f8e3aa8ccc0650c64118ed49502e8bdbe9150215ba5aeff114d8c3a99d63e2b5039375543dcb1f9d565ead703e7420721a38377e49b8a4e31a088d4', 'rplidar-framewalking.gif');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_product_user` (`id_user`);

--
-- Indexes for table `register`
--
ALTER TABLE `register`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `register`
--
ALTER TABLE `register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `fk_product_user` FOREIGN KEY (`id_user`) REFERENCES `register` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
