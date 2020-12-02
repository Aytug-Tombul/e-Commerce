-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1:3306
-- Üretim Zamanı: 02 Ara 2020, 12:59:03
-- Sunucu sürümü: 8.0.21
-- PHP Sürümü: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `commerce`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `carts`
--

DROP TABLE IF EXISTS `carts`;
CREATE TABLE IF NOT EXISTS `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `select_products` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `description` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Tablo döküm verisi `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`) VALUES
(5, 'Games', 'Games Stuff'),
(3, 'Example', '1');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `user_id` int NOT NULL,
  `post` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Tablo döküm verisi `comments`
--

INSERT INTO `comments` (`id`, `product_id`, `user_id`, `post`) VALUES
(4, 2, 36, 'Cute'),
(5, 2, 36, 'Very Cute');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `payed`
--

DROP TABLE IF EXISTS `payed`;
CREATE TABLE IF NOT EXISTS `payed` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `total_price` int NOT NULL,
  `buyed_products` text NOT NULL,
  `purchase_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Tablo döküm verisi `payed`
--

INSERT INTO `payed` (`id`, `user_id`, `total_price`, `buyed_products`, `purchase_date`) VALUES
(1, 36, 115, '[{\"product_id\":\"1\",\"product_name\":\"Tetris\",\"product_total\":\"17.59\",\"product_quantity\":\"1\"},{\"product_id\":\"2\",\"product_name\":\"erD\",\"product_total\":\"97.43\",\"product_quantity\":\"1\"}]', '2020-12-02 10:19:53');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `stock` int NOT NULL,
  `sale` int NOT NULL,
  `category_ID` int NOT NULL,
  `offer` int NOT NULL,
  `offer_quantity` int NOT NULL,
  `profile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Tablo döküm verisi `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `stock`, `sale`, `category_ID`, `offer`, `offer_quantity`, `profile`) VALUES
(1, 'Tetris', 'Best game ever !', 21.99, 84, 20, 3, 20, 3, 'ttris.png'),
(2, 'erD', 'Not Buy', 111.99, 87, 13, 3, 30, 4, 'panda.jpg'),
(22, 'Supra', 'adasdsadsa', 4000, 3, 0, 5, 20, 2, 'ssss.jpg');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `rates`
--

DROP TABLE IF EXISTS `rates`;
CREATE TABLE IF NOT EXISTS `rates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `category_id` int NOT NULL,
  `rate` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Tablo döküm verisi `rates`
--

INSERT INTO `rates` (`id`, `product_id`, `category_id`, `rate`) VALUES
(1, 1, 1, 1.5),
(2, 2, 1, 5),
(11, 22, 5, 0);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(80) NOT NULL,
  `role` varchar(15) NOT NULL,
  `profile` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `role`, `profile`) VALUES
(44, 'omer', '$2y$10$SPcZMqOCEXAySSPjwvJuNOD9MHySR/1PvFqrvveMVhDNO4mgAyVJW', 'adasdsad@gmail.com', 'user', 'panda.jpg'),
(39, 'aytuggggg', '$2y$10$SCAqDcPBMM.PgeGWt6vvduXMC5.KDdmd4Ioz2TjUv/10zsBCMySV6', 'aytugtombul88@gmail.com', 'user', 'cvphoto.jpeg'),
(42, 'aytugcccc', '$2y$10$wcHPIozBZ6ZwKhbBrfDiw.N8GRV/WDo2R.dN/eNtVw84CCoroNzlO', 'aytugtombulvvvvv8488@gmail.com', 'user', 'cvphoto.jpeg'),
(36, 'aytug', '$2y$10$F3CrG4Ro1NrAC5E0HfzdHubxs1ZmI8F.V0tMt8yB0LXAN7eFAdh66', 'aytugtombul@gmail.com', 'admin', 'Cv photo.jpeg'),
(35, 'aytugttttt', '$2y$10$Yp3y11At4xi4FkQUQl4tXOhxgTA60K.uVhiX9S3b0EYiADHZr4uMC', 'aytugtomrrbul8488@gmail.com', 'user', 'Cv photo.jpeg');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `votes`
--

DROP TABLE IF EXISTS `votes`;
CREATE TABLE IF NOT EXISTS `votes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `value` int NOT NULL,
  `product_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Tablo döküm verisi `votes`
--

INSERT INTO `votes` (`id`, `value`, `product_id`, `user_id`) VALUES
(19, 1, 1, 36),
(20, 5, 21, 36),
(13, 2, 1, 44);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
