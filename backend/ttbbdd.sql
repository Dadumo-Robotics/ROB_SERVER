-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-05-2024 a las 21:28:31
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ttbbdd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conexion`
--

CREATE TABLE `conexion` (
  `Owner` varchar(255) DEFAULT NULL,
  `Robot` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `conexion`
--

INSERT INTO `conexion` (`Owner`, `Robot`) VALUES
('user1@gmail.com', 1),
('admin1@gmail.com', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `robots`
--

CREATE TABLE `robots` (
  `ID` int(11) NOT NULL,
  `Nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `robots`
--

INSERT INTO `robots` (`ID`, `Nombre`) VALUES
(1, 'TT00001'),
(2, 'AdminBot');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `Correo` varchar(255) NOT NULL,
  `Nombre` varchar(100) DEFAULT NULL,
  `Apellidos` varchar(100) DEFAULT NULL,
  `Rol` varchar(50) DEFAULT NULL,
  `Contrasenya` varchar(255) DEFAULT NULL,
  `Verificado` tinyint(1) DEFAULT NULL,
  `CodigoV` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`Correo`, `Nombre`, `Apellidos`, `Rol`, `Contrasenya`, `Verificado`, `CodigoV`) VALUES
('admin1@gmail.com', 'admin', 'admin', 'admin', '1234', 0, 1),
('user1@gmail.com', 'Asun', 'Perez', 'user', '1234', 0, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `conexion`
--
ALTER TABLE `conexion`
  ADD KEY `Owner` (`Owner`),
  ADD KEY `Robot` (`Robot`);

--
-- Indices de la tabla `robots`
--
ALTER TABLE `robots`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `robots`
--
ALTER TABLE `robots`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `conexion`
--
ALTER TABLE `conexion`
  ADD CONSTRAINT `conexion_ibfk_1` FOREIGN KEY (`Owner`) REFERENCES `users` (`Correo`),
  ADD CONSTRAINT `conexion_ibfk_2` FOREIGN KEY (`Robot`) REFERENCES `robots` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
