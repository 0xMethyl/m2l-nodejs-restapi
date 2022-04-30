-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: localhost    Database: m2l
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `t_categorie`
--

DROP TABLE IF EXISTS `t_categorie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_categorie` (
  `categorie_id` int NOT NULL,
  `categorie_nom` text NOT NULL,
  PRIMARY KEY (`categorie_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_categorie`
--

LOCK TABLES `t_categorie` WRITE;
/*!40000 ALTER TABLE `t_categorie` DISABLE KEYS */;
INSERT INTO `t_categorie` VALUES (1,'Football Américain'),(2,'Football'),(3,'Basketball'),(4,'Tennis'),(5,'Handball');
/*!40000 ALTER TABLE `t_categorie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_client`
--

DROP TABLE IF EXISTS `t_client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_client` (
  `client_id` int NOT NULL AUTO_INCREMENT,
  `client_genre` text NOT NULL,
  `client_nom` varchar(100) NOT NULL,
  `client_prenom` text NOT NULL,
  `client_email` text NOT NULL,
  `client_password` text NOT NULL,
  `client_phone` int NOT NULL,
  `client_adresse` varchar(100) NOT NULL,
  `client_ville` text NOT NULL,
  `client_codepostal` text NOT NULL,
  `client_datenaissance` text NOT NULL,
  `isAdmin` int NOT NULL,
  PRIMARY KEY (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_client`
--

LOCK TABLES `t_client` WRITE;
/*!40000 ALTER TABLE `t_client` DISABLE KEYS */;
INSERT INTO `t_client` VALUES (10,'monsieur','test','test','test@gmail.com','$2b$11$hG3K9Ey/kCx3Ftim0G2mG.UfnZvFqEAsirvHYE1QSUhkIfQ0fS52a',745621236,'1 rue de la ville','Paris','75000','2022-03-01',0),(12,'madame','test','test','user@gmail.com','$2b$11$4MamRmV8TgI1aS1Jqw20ju5d6K.gMWM2uzhOGnlYXKmeZRIDZpOjG',672646652,'44 rue de lorient','Paris','75012','1991-01-01',0);
/*!40000 ALTER TABLE `t_client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_commande`
--

DROP TABLE IF EXISTS `t_commande`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_commande` (
  `commande_id` int NOT NULL AUTO_INCREMENT,
  `commande_produit` varchar(100) NOT NULL,
  `commande_idclient` varchar(100) NOT NULL,
  `commande_date` datetime NOT NULL,
  PRIMARY KEY (`commande_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_commande`
--

LOCK TABLES `t_commande` WRITE;
/*!40000 ALTER TABLE `t_commande` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_commande` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_livraison`
--

DROP TABLE IF EXISTS `t_livraison`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_livraison` (
  `livraison_id` int NOT NULL AUTO_INCREMENT,
  `livraison_preparation` varchar(100) DEFAULT NULL,
  `livraison_transport` varchar(100) DEFAULT NULL,
  `livraison_terminee` varchar(100) DEFAULT NULL,
  `livraison_date` datetime DEFAULT NULL,
  PRIMARY KEY (`livraison_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_livraison`
--

LOCK TABLES `t_livraison` WRITE;
/*!40000 ALTER TABLE `t_livraison` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_livraison` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_panier`
--

DROP TABLE IF EXISTS `t_panier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_panier` (
  `panier_id` int NOT NULL AUTO_INCREMENT,
  `panier_idclient` varchar(100) NOT NULL,
  `panier_produit` varchar(100) NOT NULL,
  `panier_nbproduit` varchar(100) NOT NULL,
  PRIMARY KEY (`panier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_panier`
--

LOCK TABLES `t_panier` WRITE;
/*!40000 ALTER TABLE `t_panier` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_panier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_prestataire`
--

DROP TABLE IF EXISTS `t_prestataire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_prestataire` (
  `prestataire_id` int NOT NULL AUTO_INCREMENT,
  `prestataire_nom` varchar(100) NOT NULL,
  `prestataire_produit` varchar(100) NOT NULL,
  PRIMARY KEY (`prestataire_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_prestataire`
--

LOCK TABLES `t_prestataire` WRITE;
/*!40000 ALTER TABLE `t_prestataire` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_prestataire` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_produit`
--

DROP TABLE IF EXISTS `t_produit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_produit` (
  `produit_id` int NOT NULL AUTO_INCREMENT,
  `produit_nom` varchar(100) NOT NULL,
  `produit_marque` varchar(100) NOT NULL,
  `produit_poids` varchar(100) NOT NULL,
  `produit_taille` varchar(100) NOT NULL,
  `produit_quantite` varchar(100) NOT NULL,
  `produit_prix` int NOT NULL,
  `produit_categories` int DEFAULT NULL,
  PRIMARY KEY (`produit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_produit`
--

LOCK TABLES `t_produit` WRITE;
/*!40000 ALTER TABLE `t_produit` DISABLE KEYS */;
INSERT INTO `t_produit` VALUES (1,'Ballon de football américain','MINZI INDUSTRIES','420','28.6','11',9,1),(2,'Ballon de football','Adidas','400','71','15',10,2),(3,'Ballon de basketball','Wilson','650 ','24,8','4',60,3),(4,'Balles de tennis (lot de 10)','Dunlop','58','7','20',10,4),(5,'Ballon de handball','Molten IHF','475 ','60 ','8',35,5);
/*!40000 ALTER TABLE `t_produit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_stockage`
--

DROP TABLE IF EXISTS `t_stockage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_stockage` (
  `stockage_id` int NOT NULL AUTO_INCREMENT,
  `stockage_localisation` varchar(100) NOT NULL,
  `stockage_taille` varchar(100) NOT NULL,
  `stockage_nom` varchar(100) NOT NULL,
  `stockage_produit` varchar(100) NOT NULL,
  PRIMARY KEY (`stockage_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_stockage`
--

LOCK TABLES `t_stockage` WRITE;
/*!40000 ALTER TABLE `t_stockage` DISABLE KEYS */;
/*!40000 ALTER TABLE `t_stockage` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-30 13:46:14
