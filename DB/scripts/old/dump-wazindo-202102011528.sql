-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: wazindo
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.16-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actualite`
--

DROP TABLE IF EXISTS `actualite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `actualite` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(250) NOT NULL,
  `description` text NOT NULL,
  `projet_id` int(11) NOT NULL,
  `date_actualite` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `actualite_FK` (`projet_id`),
  CONSTRAINT `actualite_FK` FOREIGN KEY (`projet_id`) REFERENCES `projet` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actualite`
--

LOCK TABLES `actualite` WRITE;
/*!40000 ALTER TABLE `actualite` DISABLE KEYS */;
INSERT INTO `actualite` VALUES (1,'rien','gfdgdfht',2,'2020-12-09 00:00:00','2020-12-02 16:07:20','2020-12-02 16:07:20');
/*!40000 ALTER TABLE `actualite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `reference` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categorie_un` (`nom`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorie`
--

LOCK TABLES `categorie` WRITE;
/*!40000 ALTER TABLE `categorie` DISABLE KEYS */;
INSERT INTO `categorie` VALUES (2,'Technologie','2020-12-02 14:23:26','2020-12-02 14:23:26','CAT002'),(7,'SANTE','2020-12-04 17:36:47','2020-12-04 17:36:47','CAT007'),(19,'simp','2020-12-10 14:41:38','2020-12-10 14:41:38','CAT019');
/*!40000 ALTER TABLE `categorie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commentaire`
--

DROP TABLE IF EXISTS `commentaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `commentaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contenu` text NOT NULL,
  `commente_par_id` int(11) NOT NULL,
  `projet_id` int(11) NOT NULL,
  `date_commentaire` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `commentaire_FK` (`commente_par_id`),
  KEY `commentaire_FK_1` (`projet_id`),
  CONSTRAINT `commentaire_FK` FOREIGN KEY (`commente_par_id`) REFERENCES `profil` (`id`),
  CONSTRAINT `commentaire_FK_1` FOREIGN KEY (`projet_id`) REFERENCES `projet` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentaire`
--

LOCK TABLES `commentaire` WRITE;
/*!40000 ALTER TABLE `commentaire` DISABLE KEYS */;
INSERT INTO `commentaire` VALUES (1,'erghyjfugh',1,2,'2020-12-16 00:00:00','2020-12-02 16:08:02','2020-12-02 16:08:02');
/*!40000 ALTER TABLE `commentaire` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contrepartie`
--

DROP TABLE IF EXISTS `contrepartie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contrepartie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projet_id` int(11) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(250) NOT NULL,
  `qte_totale` int(11) NOT NULL,
  `est_illimite` tinyint(1) NOT NULL,
  `date_liv_est` datetime NOT NULL,
  `qte_cde` int(11) NOT NULL,
  `mt_min` bigint(20) NOT NULL,
  `mt_max` bigint(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `contrepartie_FK` (`projet_id`),
  CONSTRAINT `contrepartie_FK` FOREIGN KEY (`projet_id`) REFERENCES `projet` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contrepartie`
--

LOCK TABLES `contrepartie` WRITE;
/*!40000 ALTER TABLE `contrepartie` DISABLE KEYS */;
INSERT INTO `contrepartie` VALUES (1,2,'tghthj','tuykyi',53,1,'2020-12-02 00:00:00',12,14255,152668,'2020-12-02 16:04:41','2020-12-02 16:04:41');
/*!40000 ALTER TABLE `contrepartie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contribution`
--

DROP TABLE IF EXISTS `contribution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contribution` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contributeur_id` int(11) NOT NULL,
  `projet_id` int(11) NOT NULL,
  `date_contrib` datetime DEFAULT current_timestamp(),
  `montant` int(11) DEFAULT NULL,
  `est_public` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `type_contrib_id` int(11) DEFAULT NULL,
  `video_id` int(11) DEFAULT NULL,
  `paiement_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contribution_FK` (`contributeur_id`),
  KEY `contribution_FK_1` (`projet_id`),
  KEY `contribution_FK_2` (`video_id`),
  KEY `contribution_FK_3` (`paiement_id`),
  CONSTRAINT `contribution_FK` FOREIGN KEY (`contributeur_id`) REFERENCES `profil` (`id`),
  CONSTRAINT `contribution_FK_1` FOREIGN KEY (`projet_id`) REFERENCES `projet` (`id`),
  CONSTRAINT `contribution_FK_2` FOREIGN KEY (`video_id`) REFERENCES `video_projet` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `contribution_FK_3` FOREIGN KEY (`paiement_id`) REFERENCES `mode_paiement` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contribution`
--

LOCK TABLES `contribution` WRITE;
/*!40000 ALTER TABLE `contribution` DISABLE KEYS */;
INSERT INTO `contribution` VALUES (1,1,2,'2020-12-10 00:00:00',2000,1,'2020-12-02 15:21:33','2020-12-02 15:21:33',0,NULL,NULL),(4,2,2,'2020-12-10 20:17:39',NULL,NULL,'2020-12-10 18:17:39','2020-12-10 18:17:39',2,1,NULL),(6,2,2,'2020-12-10 20:18:52',NULL,NULL,'2020-12-10 18:18:52','2020-12-10 18:18:52',2,1,NULL),(7,2,2,'2020-12-10 20:23:35',2000,NULL,'2020-12-10 18:23:35','2020-12-10 18:23:35',1,NULL,1),(8,2,2,'2020-12-10 21:09:21',2000,NULL,'2020-12-10 19:09:21','2020-12-10 19:09:21',1,NULL,8),(9,2,2,'2020-12-10 21:09:27',NULL,NULL,'2020-12-10 19:09:27','2020-12-10 19:09:27',2,1,NULL),(10,2,2,'2020-12-10 21:10:08',NULL,NULL,'2020-12-10 19:10:08','2020-12-10 19:10:08',2,1,NULL),(11,2,2,'2020-12-10 21:11:02',2000,NULL,'2020-12-10 19:11:02','2020-12-10 19:11:02',1,NULL,8),(12,2,2,'2020-12-11 15:41:45',NULL,NULL,'2020-12-11 13:41:45','2020-12-11 13:41:45',2,1,NULL);
/*!40000 ALTER TABLE `contribution` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departement`
--

DROP TABLE IF EXISTS `departement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `departement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `pays_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departement`
--

LOCK TABLES `departement` WRITE;
/*!40000 ALTER TABLE `departement` DISABLE KEYS */;
INSERT INTO `departement` VALUES (1,'Borgou',1,'2020-12-02 15:13:34','2020-12-02 15:13:34');
/*!40000 ALTER TABLE `departement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detail_diffusion`
--

DROP TABLE IF EXISTS `detail_diffusion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detail_diffusion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) DEFAULT NULL,
  `telephone` varchar(100) DEFAULT NULL,
  `diffusion_id` int(11) DEFAULT NULL,
  `adresse_mail` varchar(100) DEFAULT NULL,
  `est_telephone` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `detail_diffusion_FK` (`diffusion_id`),
  CONSTRAINT `detail_diffusion_FK` FOREIGN KEY (`diffusion_id`) REFERENCES `diffusion` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail_diffusion`
--

LOCK TABLES `detail_diffusion` WRITE;
/*!40000 ALTER TABLE `detail_diffusion` DISABLE KEYS */;
/*!40000 ALTER TABLE `detail_diffusion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diffusion`
--

DROP TABLE IF EXISTS `diffusion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diffusion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) DEFAULT NULL,
  `profil_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `diffusion_FK` (`profil_id`),
  CONSTRAINT `diffusion_FK` FOREIGN KEY (`profil_id`) REFERENCES `profil` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diffusion`
--

LOCK TABLES `diffusion` WRITE;
/*!40000 ALTER TABLE `diffusion` DISABLE KEYS */;
/*!40000 ALTER TABLE `diffusion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2016_06_01_000001_create_oauth_auth_codes_table',1),(4,'2016_06_01_000002_create_oauth_access_tokens_table',1),(5,'2016_06_01_000003_create_oauth_refresh_tokens_table',1),(6,'2016_06_01_000004_create_oauth_clients_table',1),(7,'2016_06_01_000005_create_oauth_personal_access_clients_table',1),(8,'2019_08_19_000000_create_failed_jobs_table',1),(9,'2020_12_08_163900_create_jobs_table',2);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mode_paiement`
--

DROP TABLE IF EXISTS `mode_paiement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mode_paiement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) DEFAULT NULL,
  `code` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mode_paiement`
--

LOCK TABLES `mode_paiement` WRITE;
/*!40000 ALTER TABLE `mode_paiement` DISABLE KEYS */;
INSERT INTO `mode_paiement` VALUES (1,'MTN Mobile Money','MTN_MOBILE_MONEY'),(2,'Moov Flooz','MOOV_FLOOZ'),(3,'Western Union','WESTERN_UNION'),(4,'Paypal','PAYPAL'),(5,'Carte de crédit','CARTE_DE_CREDIT'),(6,'Carte bancaire','CARTE_BANCAIRE'),(7,'MoneyGram','MONEYGRAM'),(8,'Wari','WARI');
/*!40000 ALTER TABLE `mode_paiement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_access_tokens`
--

DROP TABLE IF EXISTS `oauth_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `client_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_access_tokens_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_access_tokens`
--

LOCK TABLES `oauth_access_tokens` WRITE;
/*!40000 ALTER TABLE `oauth_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_auth_codes`
--

DROP TABLE IF EXISTS `oauth_auth_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `client_id` bigint(20) unsigned NOT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_auth_codes_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_auth_codes`
--

LOCK TABLES `oauth_auth_codes` WRITE;
/*!40000 ALTER TABLE `oauth_auth_codes` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_auth_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_clients`
--

DROP TABLE IF EXISTS `oauth_clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oauth_clients` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redirect` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_clients_user_id_index` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_clients`
--

LOCK TABLES `oauth_clients` WRITE;
/*!40000 ALTER TABLE `oauth_clients` DISABLE KEYS */;
INSERT INTO `oauth_clients` VALUES (1,NULL,'Laravel Personal Access Client','Dg0tRv4D7XkfsIlrJXMNitfb1GqjduPlHWV0O01r','http://localhost',1,0,0,'2020-12-02 09:52:55','2020-12-02 09:52:55'),(2,NULL,'Laravel Password Grant Client','Mi3906MRaqGJL0PM7gAfkLl43XmiKpflSAcriH7K','http://localhost',0,1,0,'2020-12-02 09:52:57','2020-12-02 09:52:57'),(3,NULL,'Laravel Personal Access Client','RRZmh8oWO8FyobWUJp9uGtJ4QFlecvVm1Se0UAkn','http://localhost',1,0,0,'2020-12-04 16:14:35','2020-12-04 16:14:35'),(4,NULL,'Laravel Password Grant Client','Qh0FZTGOBEm1y8j7CewvxyQIEY9FoPNiC8rVLEdD','http://localhost',0,1,0,'2020-12-04 16:14:37','2020-12-04 16:14:37');
/*!40000 ALTER TABLE `oauth_clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_personal_access_clients`
--

DROP TABLE IF EXISTS `oauth_personal_access_clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_personal_access_clients`
--

LOCK TABLES `oauth_personal_access_clients` WRITE;
/*!40000 ALTER TABLE `oauth_personal_access_clients` DISABLE KEYS */;
INSERT INTO `oauth_personal_access_clients` VALUES (1,1,'2020-12-02 09:52:57','2020-12-02 09:52:57'),(2,3,'2020-12-04 16:14:37','2020-12-04 16:14:37');
/*!40000 ALTER TABLE `oauth_personal_access_clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_refresh_tokens`
--

DROP TABLE IF EXISTS `oauth_refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_refresh_tokens`
--

LOCK TABLES `oauth_refresh_tokens` WRITE;
/*!40000 ALTER TABLE `oauth_refresh_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paiement`
--

DROP TABLE IF EXISTS `paiement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paiement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mode_paiement_id` int(11) DEFAULT NULL,
  `montant_paye` bigint(20) DEFAULT NULL,
  `statut` varchar(100) DEFAULT NULL,
  `date_paiement` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `paiement_FK` (`mode_paiement_id`),
  CONSTRAINT `paiement_FK` FOREIGN KEY (`mode_paiement_id`) REFERENCES `mode_paiement` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paiement`
--

LOCK TABLES `paiement` WRITE;
/*!40000 ALTER TABLE `paiement` DISABLE KEYS */;
/*!40000 ALTER TABLE `paiement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pays`
--

DROP TABLE IF EXISTS `pays`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pays` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `indicatif` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pays`
--

LOCK TABLES `pays` WRITE;
/*!40000 ALTER TABLE `pays` DISABLE KEYS */;
INSERT INTO `pays` VALUES (1,'Benin',229,'2020-12-02 14:22:21','2020-12-02 14:22:21'),(2,'Togo',228,'2020-12-02 14:22:21','2020-12-02 14:22:21');
/*!40000 ALTER TABLE `pays` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profil`
--

DROP TABLE IF EXISTS `profil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profil` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(200) NOT NULL,
  `login` varchar(100) NOT NULL,
  `mot_de_passe` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `telephone` int(11) DEFAULT NULL,
  `pays_id` int(11) DEFAULT NULL,
  `type_auth_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `profil_un` (`login`),
  KEY `profil_FK` (`pays_id`),
  KEY `profil_FK_1` (`type_auth_id`),
  CONSTRAINT `profil_FK` FOREIGN KEY (`pays_id`) REFERENCES `pays` (`id`),
  CONSTRAINT `profil_FK_1` FOREIGN KEY (`type_auth_id`) REFERENCES `type_auth` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profil`
--

LOCK TABLES `profil` WRITE;
/*!40000 ALTER TABLE `profil` DISABLE KEYS */;
INSERT INTO `profil` VALUES (1,'Charlie','Sylvanus','bonjour','bonjour','mpocharlie@gmail.com',61772318,1,1,'2020-12-02 15:19:40','2020-12-02 15:19:40'),(2,'DJENONTIN','Marc','marc','$2y$10$xnw2g0uz3E1OkCUtLN6niemvvWsFg4AIQ4xmOUig3DLLo1Bs7pgwa','marc@gmail.com',NULL,NULL,NULL,'2020-12-04 17:52:06','2020-12-04 17:52:06');
/*!40000 ALTER TABLE `profil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projet`
--

DROP TABLE IF EXISTS `projet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(250) NOT NULL,
  `resume` text NOT NULL,
  `description` text NOT NULL,
  `categorie_id` int(11) NOT NULL,
  `departement_id` int(11) NOT NULL,
  `porteur_id` int(11) NOT NULL,
  `montant_collecte` bigint(20) NOT NULL,
  `photo_porteur` varchar(250) NOT NULL,
  `photo_mini` varchar(250) NOT NULL,
  `statut_projet_id` int(11) NOT NULL,
  `mot_porteur` text NOT NULL,
  `type_organisation_id` int(11) NOT NULL,
  `montant_a_collecte` bigint(20) NOT NULL,
  `duree_campagne` int(11) NOT NULL,
  `lien_document_projet` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `reference` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `projet_FK` (`categorie_id`),
  KEY `projet_FK_1` (`departement_id`),
  KEY `projet_FK_2` (`porteur_id`),
  KEY `projet_FK_3` (`statut_projet_id`),
  KEY `projet_FK_4` (`type_organisation_id`),
  CONSTRAINT `projet_FK` FOREIGN KEY (`categorie_id`) REFERENCES `categorie` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `projet_FK_1` FOREIGN KEY (`departement_id`) REFERENCES `departement` (`id`),
  CONSTRAINT `projet_FK_2` FOREIGN KEY (`porteur_id`) REFERENCES `profil` (`id`),
  CONSTRAINT `projet_FK_3` FOREIGN KEY (`statut_projet_id`) REFERENCES `statut_projet` (`id`),
  CONSTRAINT `projet_FK_4` FOREIGN KEY (`type_organisation_id`) REFERENCES `type_organisation` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projet`
--

LOCK TABLES `projet` WRITE;
/*!40000 ALTER TABLE `projet` DISABLE KEYS */;
INSERT INTO `projet` VALUES (2,'Chatboot','rien','rien',2,1,1,10000,'sdfgryj','https://i.pinimg.com/originals/8c/35/3a/8c353ad7b6adc1695349c2a121867b5c.jpg',1,'gtryhtuj',1,5000,2147483647,'aefgtryh','2020-12-02 15:20:30','2020-12-02 15:20:30','P002'),(3,'Network','dfyhj','fgfhgj,',2,1,1,2000,'dgtr','https://i.pinimg.com/originals/8c/35/3a/8c353ad7b6adc1695349c2a121867b5c.jpg',1,'gdbrgfb',1,5000,2147483647,'dgfhbbg','2020-12-02 17:01:13','2020-12-02 17:01:13',NULL),(4,'Network','dfyhj','fgfhgj,',7,1,1,2000,'dgtr','https://i.pinimg.com/originals/18/83/fc/1883fc866e36500372ba7a57a4556e0e.jpg',1,'gdbrgfb',1,5000,2147483647,'dgfhbbg','2020-12-02 17:01:13','2020-12-02 17:01:13',NULL),(5,'Network','dfyhj','fgfhgj,',7,1,1,2000,'dgtr','https://media.mehrnews.com/d/2018/10/28/4/2940617.jpg',1,'gdbrgfb',1,5000,2147483647,'dgfhbbg','2020-12-02 17:01:13','2020-12-02 17:01:13',NULL),(6,'Network','dfyhj','fgfhgj,',2,1,1,2000,'dgtr','https://media.mehrnews.com/d/2018/10/28/4/2940617.jpg',1,'gdbrgfb',1,5000,2147483647,'dgfhbbg','2020-12-02 17:01:13','2020-12-02 17:01:13',NULL),(7,'Network','dfyhj','fgfhgj,',19,1,1,2000,'dgtr','https://media.mehrnews.com/d/2018/10/28/4/2940617.jpg',1,'gdbrgfb',1,5000,2147483647,'dgfhbbg','2020-12-02 17:01:13','2020-12-02 17:01:13',NULL),(8,'Network','dfyhj','fgfhgj,',2,1,1,100000,'dgtr','https://i.pinimg.com/originals/18/83/fc/1883fc866e36500372ba7a57a4556e0e.jpg',1,'gdbrgfb',1,5000,2147483647,'dgfhbbg','2020-12-02 17:01:13','2020-12-02 17:01:13',NULL),(9,'Network','dfyhj','fgfhgj,',19,1,1,2000,'dgtr','https://media.mehrnews.com/d/2018/10/28/4/2940617.jpg',1,'gdbrgfb',1,5000,2147483647,'dgfhbbg','2020-12-02 17:01:13','2020-12-02 17:01:13',NULL),(10,'Network','dfyhj','fgfhgj,',19,1,1,2000,'dgtr','https://media.mehrnews.com/d/2018/10/28/4/2940617.jpg',1,'gdbrgfb',1,5000,2147483647,'dgfhbbg','2020-12-02 17:01:13','2020-12-02 17:01:13',NULL),(11,'Network','dfyhj','fgfhgj,',7,1,1,5000,'dgtr','https://media.mehrnews.com/d/2018/10/28/4/2940617.jpg',1,'gdbrgfb',1,5000,2147483647,'dgfhbbg','2020-12-02 17:01:13','2020-12-02 17:01:13',NULL),(12,'Network','dfyhj','fgfhgj,',7,1,1,2000,'dgtr','https://media.mehrnews.com/d/2018/10/28/4/2940617.jpg',1,'gdbrgfb',1,5000,2147483647,'dgfhbbg','2020-12-02 17:01:13','2020-12-02 17:01:13',NULL),(13,'Network','dfyhj','fgfhgj,',7,1,1,2000,'dgtr','https://i.pinimg.com/originals/8c/35/3a/8c353ad7b6adc1695349c2a121867b5c.jpg',1,'gdbrgfb',1,5000,2147483647,'dgfhbbg','2020-12-02 17:01:13','2020-12-02 17:01:13',NULL),(14,'Network','dfyhj','fgfhgj,',7,1,1,2000,'dgtr','https://i.pinimg.com/originals/8c/35/3a/8c353ad7b6adc1695349c2a121867b5c.jpg',1,'gdbrgfb',1,5000,2147483647,'dgfhbbg','2020-12-02 17:01:13','2020-12-02 17:01:13',NULL);
/*!40000 ALTER TABLE `projet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statut_projet`
--

DROP TABLE IF EXISTS `statut_projet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `statut_projet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `code` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statut_projet`
--

LOCK TABLES `statut_projet` WRITE;
/*!40000 ALTER TABLE `statut_projet` DISABLE KEYS */;
INSERT INTO `statut_projet` VALUES (1,'initie','INITIE','2020-12-10 16:38:56','2020-12-10 16:38:56'),(2,'etudie','ETUDIE','2020-12-10 16:40:06','2020-12-10 16:40:06'),(3,'valide','VALIDE','2020-12-10 16:41:33','2020-12-10 16:41:33'),(4,'cloture','CLOTURE','2020-12-10 16:41:33','2020-12-10 16:41:33');
/*!40000 ALTER TABLE `statut_projet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_auth`
--

DROP TABLE IF EXISTS `type_auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `type_auth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `code` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_auth`
--

LOCK TABLES `type_auth` WRITE;
/*!40000 ALTER TABLE `type_auth` DISABLE KEYS */;
INSERT INTO `type_auth` VALUES (1,'Charlie','125','2020-12-02 14:24:38','2020-12-02 14:24:38');
/*!40000 ALTER TABLE `type_auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_contribution`
--

DROP TABLE IF EXISTS `type_contribution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `type_contribution` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) DEFAULT NULL,
  `code` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_contribution`
--

LOCK TABLES `type_contribution` WRITE;
/*!40000 ALTER TABLE `type_contribution` DISABLE KEYS */;
INSERT INTO `type_contribution` VALUES (1,'financiere','FINANCIERE'),(2,'video','VIDEO');
/*!40000 ALTER TABLE `type_contribution` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_organisation`
--

DROP TABLE IF EXISTS `type_organisation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `type_organisation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(500) NOT NULL,
  `code` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_organisation`
--

LOCK TABLES `type_organisation` WRITE;
/*!40000 ALTER TABLE `type_organisation` DISABLE KEYS */;
INSERT INTO `type_organisation` VALUES (1,'Personnellle','025','2020-12-02 15:12:42','2020-12-02 15:12:42');
/*!40000 ALTER TABLE `type_organisation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video_projet`
--

DROP TABLE IF EXISTS `video_projet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `video_projet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference` varchar(100) DEFAULT NULL,
  `projet_id` int(11) NOT NULL,
  `titre` varchar(100) DEFAULT NULL,
  `url_video` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `date_ajout` datetime DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `video_projet_FK` (`projet_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video_projet`
--

LOCK TABLES `video_projet` WRITE;
/*!40000 ALTER TABLE `video_projet` DISABLE KEYS */;
INSERT INTO `video_projet` VALUES (1,'003',2,'AZ7TFYTF','jgfdkfghkj','yjtfuitf','2020-12-10 11:24:14','2020-12-10 10:24:14','2020-12-10 10:24:14'),(2,NULL,0,'Titre video',NULL,'ceci est la description',NULL,'2020-12-10 15:04:15','2020-12-10 15:04:15'),(3,NULL,2,'Titre video',NULL,'ceci est la description','2020-12-10 20:44:33','2020-12-10 18:44:33','2020-12-10 18:44:33'),(4,NULL,2,'d',NULL,'ceci est la description','2020-12-11 10:52:06','2020-12-11 08:52:05','2020-12-11 08:52:05'),(5,NULL,0,'d',NULL,'ceci est la description','2020-12-11 11:03:25','2020-12-11 09:03:25','2020-12-11 09:03:25'),(6,NULL,0,'d',NULL,'ceci est la description','2020-12-11 11:06:43','2020-12-11 09:06:43','2020-12-11 09:06:43'),(7,NULL,0,'d',NULL,'ceci est la description','2020-12-11 11:06:52','2020-12-11 09:06:52','2020-12-11 09:06:52');
/*!40000 ALTER TABLE `video_projet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'wazindo'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-01 15:28:08
