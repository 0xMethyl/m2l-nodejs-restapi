-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 01 mars 2022 à 16:36
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `m2l`
--

-- --------------------------------------------------------

--
-- Structure de la table `t_categorie`
--

DROP TABLE IF EXISTS `t_categorie`;
CREATE TABLE IF NOT EXISTS `t_categorie` (
  `categorie_id` int(11) NOT NULL,
  `categorie_nom` text NOT NULL,
  PRIMARY KEY (`categorie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `t_categorie`
--

INSERT INTO `t_categorie` (`categorie_id`, `categorie_nom`) VALUES
(1, 'Football Américain'),
(2, 'Football'),
(3, 'Basketball'),
(4, 'Tennis'),
(5, 'Handball');

-- --------------------------------------------------------

--
-- Structure de la table `t_client`
--

DROP TABLE IF EXISTS `t_client`;
CREATE TABLE IF NOT EXISTS `t_client` (
  `client_id` int(11) NOT NULL AUTO_INCREMENT,
  `client_genre` text NOT NULL,
  `client_nom` varchar(100) NOT NULL,
  `client_prenom` text NOT NULL,
  `client_email` text NOT NULL,
  `client_password` text NOT NULL,
  `client_phone` int(11) NOT NULL,
  `client_adresse` varchar(100) NOT NULL,
  `client_ville` text NOT NULL,
  `client_codepostal` text NOT NULL,
  `client_datenaissance` text NOT NULL,
  `isAdmin` int(1) NOT NULL,
  PRIMARY KEY (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `t_client`
--

INSERT INTO `t_client` (`client_id`, `client_genre`, `client_nom`, `client_prenom`, `client_email`, `client_password`, `client_phone`, `client_adresse`, `client_ville`, `client_codepostal`, `client_datenaissance`, `isAdmin`) VALUES
(10, '', 'test', 'test', 'test@gmail.com', '$2b$11$hG3K9Ey/kCx3Ftim0G2mG.UfnZvFqEAsirvHYE1QSUhkIfQ0fS52a', 745621236, '1 rue de la ville', 'Paris', '75000', '2022-03-01', 0);

-- --------------------------------------------------------

--
-- Structure de la table `t_commande`
--

DROP TABLE IF EXISTS `t_commande`;
CREATE TABLE IF NOT EXISTS `t_commande` (
  `commande_id` int(11) NOT NULL AUTO_INCREMENT,
  `commande_produit` varchar(100) NOT NULL,
  `commande_idclient` varchar(100) NOT NULL,
  `commande_date` datetime NOT NULL,
  PRIMARY KEY (`commande_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `t_livraison`
--

DROP TABLE IF EXISTS `t_livraison`;
CREATE TABLE IF NOT EXISTS `t_livraison` (
  `livraison_id` int(11) NOT NULL AUTO_INCREMENT,
  `livraison_preparation` varchar(100) DEFAULT NULL,
  `livraison_transport` varchar(100) DEFAULT NULL,
  `livraison_terminee` varchar(100) DEFAULT NULL,
  `livraison_date` datetime DEFAULT NULL,
  PRIMARY KEY (`livraison_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `t_panier`
--

DROP TABLE IF EXISTS `t_panier`;
CREATE TABLE IF NOT EXISTS `t_panier` (
  `panier_id` int(11) NOT NULL AUTO_INCREMENT,
  `panier_idclient` varchar(100) NOT NULL,
  `panier_produit` varchar(100) NOT NULL,
  `panier_nbproduit` varchar(100) NOT NULL,
  PRIMARY KEY (`panier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `t_prestataire`
--

DROP TABLE IF EXISTS `t_prestataire`;
CREATE TABLE IF NOT EXISTS `t_prestataire` (
  `prestataire_id` int(11) NOT NULL AUTO_INCREMENT,
  `prestataire_nom` varchar(100) NOT NULL,
  `prestataire_produit` varchar(100) NOT NULL,
  PRIMARY KEY (`prestataire_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `t_produit`
--

DROP TABLE IF EXISTS `t_produit`;
CREATE TABLE IF NOT EXISTS `t_produit` (
  `produit_id` int(11) NOT NULL AUTO_INCREMENT,
  `produit_nom` varchar(100) NOT NULL,
  `produit_marque` varchar(100) NOT NULL,
  `produit_poids` varchar(100) NOT NULL,
  `produit_taille` varchar(100) NOT NULL,
  `produit_quantite` varchar(100) NOT NULL,
  `produit_prix` int(5) NOT NULL,
  `produit_categories` int(4) DEFAULT NULL,
  PRIMARY KEY (`produit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `t_produit`
--

INSERT INTO `t_produit` (`produit_id`, `produit_nom`, `produit_marque`, `produit_poids`, `produit_taille`, `produit_quantite`, `produit_prix`, `produit_categories`) VALUES
(1, 'Ballon de football américain', 'MINZI INDUSTRIES', '420', '28.6', '5', 9, 1),
(2, 'Ballon de football', '', '400', '', '15', 10, 2),
(3, 'Ballon de basketball', 'Wilson', '', '', '4', 60, 3),
(4, 'Balles de tennis [x10]', '', '', '', '20', 10, 4),
(5, 'Ballon de handball', '', '', '', '8', 35, 5);

-- --------------------------------------------------------

--
-- Structure de la table `t_stockage`
--

DROP TABLE IF EXISTS `t_stockage`;
CREATE TABLE IF NOT EXISTS `t_stockage` (
  `stockage_id` int(11) NOT NULL AUTO_INCREMENT,
  `stockage_localisation` varchar(100) NOT NULL,
  `stockage_taille` varchar(100) NOT NULL,
  `stockage_nom` varchar(100) NOT NULL,
  `stockage_produit` varchar(100) NOT NULL,
  PRIMARY KEY (`stockage_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
