-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  lun. 28 déc. 2020 à 20:14
-- Version du serveur :  10.4.11-MariaDB
-- Version de PHP :  7.3.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `wazindo`
--

-- --------------------------------------------------------

--
-- Structure de la table `actualite`
--

CREATE TABLE `actualite` (
  `id` int(11) NOT NULL,
  `titre` varchar(250) NOT NULL,
  `description` text NOT NULL,
  `projet_id` int(11) NOT NULL,
  `date_actualite` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `actualite`
--

INSERT INTO `actualite` (`id`, `titre`, `description`, `projet_id`, `date_actualite`, `created_at`, `updated_at`) VALUES
(1, 'rien', 'gfdgdfht', 2, '2020-12-09 00:00:00', '2020-12-02 16:07:20', '2020-12-02 16:07:20');

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `reference` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id`, `nom`, `created_at`, `updated_at`, `reference`) VALUES
(2, 'Technologie', '2020-12-02 14:23:26', '2020-12-02 14:23:26', 'CAT002'),
(7, 'SANTE', '2020-12-04 17:36:47', '2020-12-04 17:36:47', 'CAT007'),
(19, 'simp', '2020-12-10 14:41:38', '2020-12-10 14:41:38', 'CAT019');

-- --------------------------------------------------------

--
-- Structure de la table `commentaire`
--

CREATE TABLE `commentaire` (
  `id` int(11) NOT NULL,
  `contenu` text NOT NULL,
  `commente_par_id` int(11) NOT NULL,
  `projet_id` int(11) NOT NULL,
  `date_commentaire` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `commentaire`
--

INSERT INTO `commentaire` (`id`, `contenu`, `commente_par_id`, `projet_id`, `date_commentaire`, `created_at`, `updated_at`) VALUES
(1, 'erghyjfugh', 1, 2, '2020-12-16 00:00:00', '2020-12-02 16:08:02', '2020-12-02 16:08:02');

-- --------------------------------------------------------

--
-- Structure de la table `contrepartie`
--

CREATE TABLE `contrepartie` (
  `id` int(11) NOT NULL,
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
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `contrepartie`
--

INSERT INTO `contrepartie` (`id`, `projet_id`, `description`, `image`, `qte_totale`, `est_illimite`, `date_liv_est`, `qte_cde`, `mt_min`, `mt_max`, `created_at`, `updated_at`) VALUES
(1, 2, 'tghthj', 'tuykyi', 53, 1, '2020-12-02 00:00:00', 12, 14255, 152668, '2020-12-02 16:04:41', '2020-12-02 16:04:41');

-- --------------------------------------------------------

--
-- Structure de la table `contribution`
--

CREATE TABLE `contribution` (
  `id` int(11) NOT NULL,
  `profil_id` int(11) NOT NULL,
  `projet_id` int(11) NOT NULL,
  `date_contrib` datetime DEFAULT current_timestamp(),
  `montant` int(11) DEFAULT NULL,
  `est_public` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `type_contrib_id` int(11) DEFAULT NULL,
  `video_id` int(11) DEFAULT NULL,
  `paiement_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `contribution`
--

INSERT INTO `contribution` (`id`, `profil_id`, `projet_id`, `date_contrib`, `montant`, `est_public`, `created_at`, `updated_at`, `type_contrib_id`, `video_id`, `paiement_id`) VALUES
(1, 1, 2, '2020-12-10 00:00:00', 2000, 1, '2020-12-02 15:21:33', '2020-12-02 15:21:33', 0, NULL, NULL),
(4, 2, 2, '2020-12-10 20:17:39', NULL, NULL, '2020-12-10 18:17:39', '2020-12-10 18:17:39', 2, 1, NULL),
(6, 2, 2, '2020-12-10 20:18:52', NULL, NULL, '2020-12-10 18:18:52', '2020-12-10 18:18:52', 2, 1, NULL),
(7, 2, 2, '2020-12-10 20:23:35', 2000, NULL, '2020-12-10 18:23:35', '2020-12-10 18:23:35', 1, NULL, 1),
(8, 2, 2, '2020-12-10 21:09:21', 2000, NULL, '2020-12-10 19:09:21', '2020-12-10 19:09:21', 1, NULL, 8),
(9, 2, 2, '2020-12-10 21:09:27', NULL, NULL, '2020-12-10 19:09:27', '2020-12-10 19:09:27', 2, 1, NULL),
(10, 2, 2, '2020-12-10 21:10:08', NULL, NULL, '2020-12-10 19:10:08', '2020-12-10 19:10:08', 2, 1, NULL),
(11, 2, 2, '2020-12-10 21:11:02', 2000, NULL, '2020-12-10 19:11:02', '2020-12-10 19:11:02', 1, NULL, 8),
(12, 2, 2, '2020-12-11 15:41:45', NULL, NULL, '2020-12-11 13:41:45', '2020-12-11 13:41:45', 2, 1, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `departement`
--

CREATE TABLE `departement` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `pays_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `departement`
--

INSERT INTO `departement` (`id`, `nom`, `pays_id`, `created_at`, `updated_at`) VALUES
(1, 'Borgou', 1, '2020-12-02 15:13:34', '2020-12-02 15:13:34');

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2016_06_01_000001_create_oauth_auth_codes_table', 1),
(4, '2016_06_01_000002_create_oauth_access_tokens_table', 1),
(5, '2016_06_01_000003_create_oauth_refresh_tokens_table', 1),
(6, '2016_06_01_000004_create_oauth_clients_table', 1),
(7, '2016_06_01_000005_create_oauth_personal_access_clients_table', 1),
(8, '2019_08_19_000000_create_failed_jobs_table', 1),
(9, '2020_12_08_163900_create_jobs_table', 2);

-- --------------------------------------------------------

--
-- Structure de la table `mode_paiement`
--

CREATE TABLE `mode_paiement` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `code` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `mode_paiement`
--

INSERT INTO `mode_paiement` (`id`, `nom`, `code`) VALUES
(1, 'MTN Mobile Money', 'MTN_MOBILE_MONEY'),
(2, 'Moov Flooz', 'MOOV_FLOOZ'),
(3, 'Western Union', 'WESTERN_UNION'),
(4, 'Paypal', 'PAYPAL'),
(5, 'Carte de crédit', 'CARTE_DE_CREDIT'),
(6, 'Carte bancaire', 'CARTE_BANCAIRE'),
(7, 'MoneyGram', 'MONEYGRAM'),
(8, 'Wari', 'WARI');

-- --------------------------------------------------------

--
-- Structure de la table `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `oauth_auth_codes`
--

CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `oauth_clients`
--

CREATE TABLE `oauth_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redirect` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `oauth_clients`
--

INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Laravel Personal Access Client', 'Dg0tRv4D7XkfsIlrJXMNitfb1GqjduPlHWV0O01r', 'http://localhost', 1, 0, 0, '2020-12-02 09:52:55', '2020-12-02 09:52:55'),
(2, NULL, 'Laravel Password Grant Client', 'Mi3906MRaqGJL0PM7gAfkLl43XmiKpflSAcriH7K', 'http://localhost', 0, 1, 0, '2020-12-02 09:52:57', '2020-12-02 09:52:57'),
(3, NULL, 'Laravel Personal Access Client', 'RRZmh8oWO8FyobWUJp9uGtJ4QFlecvVm1Se0UAkn', 'http://localhost', 1, 0, 0, '2020-12-04 16:14:35', '2020-12-04 16:14:35'),
(4, NULL, 'Laravel Password Grant Client', 'Qh0FZTGOBEm1y8j7CewvxyQIEY9FoPNiC8rVLEdD', 'http://localhost', 0, 1, 0, '2020-12-04 16:14:37', '2020-12-04 16:14:37');

-- --------------------------------------------------------

--
-- Structure de la table `oauth_personal_access_clients`
--

CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `oauth_personal_access_clients`
--

INSERT INTO `oauth_personal_access_clients` (`id`, `client_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2020-12-02 09:52:57', '2020-12-02 09:52:57'),
(2, 3, '2020-12-04 16:14:37', '2020-12-04 16:14:37');

-- --------------------------------------------------------

--
-- Structure de la table `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `paiement`
--

CREATE TABLE `paiement` (
  `id` int(11) NOT NULL,
  `mode_paiement_id` int(11) DEFAULT NULL,
  `montant_paye` bigint(20) DEFAULT NULL,
  `statut` varchar(100) DEFAULT NULL,
  `date_paiement` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pays`
--

CREATE TABLE `pays` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `indicatif` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `pays`
--

INSERT INTO `pays` (`id`, `nom`, `indicatif`, `created_at`, `updated_at`) VALUES
(1, 'Benin', 229, '2020-12-02 14:22:21', '2020-12-02 14:22:21'),
(2, 'Togo', 228, '2020-12-02 14:22:21', '2020-12-02 14:22:21');

-- --------------------------------------------------------

--
-- Structure de la table `profil`
--

CREATE TABLE `profil` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(200) NOT NULL,
  `login` varchar(100) NOT NULL,
  `mot_de_passe` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `telephone` int(11) DEFAULT NULL,
  `pays_id` int(11) DEFAULT NULL,
  `type_auth_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `profil`
--

INSERT INTO `profil` (`id`, `nom`, `prenom`, `login`, `mot_de_passe`, `email`, `telephone`, `pays_id`, `type_auth_id`, `created_at`, `updated_at`) VALUES
(1, 'Charlie', 'Sylvanus', 'bonjour', 'bonjour', 'mpocharlie@gmail.com', 61772318, 1, 1, '2020-12-02 15:19:40', '2020-12-02 15:19:40'),
(2, 'DJENONTIN', 'Marc', 'marc', '$2y$10$xnw2g0uz3E1OkCUtLN6niemvvWsFg4AIQ4xmOUig3DLLo1Bs7pgwa', 'marc@gmail.com', NULL, NULL, NULL, '2020-12-04 17:52:06', '2020-12-04 17:52:06');

-- --------------------------------------------------------

--
-- Structure de la table `projet`
--

CREATE TABLE `projet` (
  `id` int(11) NOT NULL,
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
  `reference` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `projet`
--

INSERT INTO `projet` (`id`, `titre`, `resume`, `description`, `categorie_id`, `departement_id`, `porteur_id`, `montant_collecte`, `photo_porteur`, `photo_mini`, `statut_projet_id`, `mot_porteur`, `type_organisation_id`, `montant_a_collecte`, `duree_campagne`, `lien_document_projet`, `created_at`, `updated_at`, `reference`) VALUES
(2, 'Chatboot', 'rien', 'rien', 2, 1, 1, 10000, 'sdfgryj', 'https://i.pinimg.com/originals/8c/35/3a/8c353ad7b6adc1695349c2a121867b5c.jpg', 1, 'gtryhtuj', 1, 5000, 2147483647, 'aefgtryh', '2020-12-02 15:20:30', '2020-12-02 15:20:30', 'P002'),
(3, 'Network', 'dfyhj', 'fgfhgj,', 2, 1, 1, 2000, 'dgtr', 'https://i.pinimg.com/originals/8c/35/3a/8c353ad7b6adc1695349c2a121867b5c.jpg', 1, 'gdbrgfb', 1, 5000, 2147483647, 'dgfhbbg', '2020-12-02 17:01:13', '2020-12-02 17:01:13', NULL),
(4, 'Network', 'dfyhj', 'fgfhgj,', 7, 1, 1, 2000, 'dgtr', 'https://i.pinimg.com/originals/18/83/fc/1883fc866e36500372ba7a57a4556e0e.jpg', 1, 'gdbrgfb', 1, 5000, 2147483647, 'dgfhbbg', '2020-12-02 17:01:13', '2020-12-02 17:01:13', NULL),
(5, 'Network', 'dfyhj', 'fgfhgj,', 7, 1, 1, 2000, 'dgtr', 'https://media.mehrnews.com/d/2018/10/28/4/2940617.jpg', 1, 'gdbrgfb', 1, 5000, 2147483647, 'dgfhbbg', '2020-12-02 17:01:13', '2020-12-02 17:01:13', NULL),
(6, 'Network', 'dfyhj', 'fgfhgj,', 2, 1, 1, 2000, 'dgtr', 'https://media.mehrnews.com/d/2018/10/28/4/2940617.jpg', 1, 'gdbrgfb', 1, 5000, 2147483647, 'dgfhbbg', '2020-12-02 17:01:13', '2020-12-02 17:01:13', NULL),
(7, 'Network', 'dfyhj', 'fgfhgj,', 19, 1, 1, 2000, 'dgtr', 'https://media.mehrnews.com/d/2018/10/28/4/2940617.jpg', 1, 'gdbrgfb', 1, 5000, 2147483647, 'dgfhbbg', '2020-12-02 17:01:13', '2020-12-02 17:01:13', NULL),
(8, 'Network', 'dfyhj', 'fgfhgj,', 2, 1, 1, 100000, 'dgtr', 'https://i.pinimg.com/originals/18/83/fc/1883fc866e36500372ba7a57a4556e0e.jpg', 1, 'gdbrgfb', 1, 5000, 2147483647, 'dgfhbbg', '2020-12-02 17:01:13', '2020-12-02 17:01:13', NULL),
(9, 'Network', 'dfyhj', 'fgfhgj,', 19, 1, 1, 2000, 'dgtr', 'https://media.mehrnews.com/d/2018/10/28/4/2940617.jpg', 1, 'gdbrgfb', 1, 5000, 2147483647, 'dgfhbbg', '2020-12-02 17:01:13', '2020-12-02 17:01:13', NULL),
(10, 'Network', 'dfyhj', 'fgfhgj,', 19, 1, 1, 2000, 'dgtr', 'https://media.mehrnews.com/d/2018/10/28/4/2940617.jpg', 1, 'gdbrgfb', 1, 5000, 2147483647, 'dgfhbbg', '2020-12-02 17:01:13', '2020-12-02 17:01:13', NULL),
(11, 'Network', 'dfyhj', 'fgfhgj,', 7, 1, 1, 5000, 'dgtr', 'https://media.mehrnews.com/d/2018/10/28/4/2940617.jpg', 1, 'gdbrgfb', 1, 5000, 2147483647, 'dgfhbbg', '2020-12-02 17:01:13', '2020-12-02 17:01:13', NULL),
(12, 'Network', 'dfyhj', 'fgfhgj,', 7, 1, 1, 2000, 'dgtr', 'https://media.mehrnews.com/d/2018/10/28/4/2940617.jpg', 1, 'gdbrgfb', 1, 5000, 2147483647, 'dgfhbbg', '2020-12-02 17:01:13', '2020-12-02 17:01:13', NULL),
(13, 'Network', 'dfyhj', 'fgfhgj,', 7, 1, 1, 2000, 'dgtr', 'https://i.pinimg.com/originals/8c/35/3a/8c353ad7b6adc1695349c2a121867b5c.jpg', 1, 'gdbrgfb', 1, 5000, 2147483647, 'dgfhbbg', '2020-12-02 17:01:13', '2020-12-02 17:01:13', NULL),
(14, 'Network', 'dfyhj', 'fgfhgj,', 7, 1, 1, 2000, 'dgtr', 'https://i.pinimg.com/originals/8c/35/3a/8c353ad7b6adc1695349c2a121867b5c.jpg', 1, 'gdbrgfb', 1, 5000, 2147483647, 'dgfhbbg', '2020-12-02 17:01:13', '2020-12-02 17:01:13', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `statut_projet`
--

CREATE TABLE `statut_projet` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `code` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `statut_projet`
--

INSERT INTO `statut_projet` (`id`, `nom`, `code`, `created_at`, `updated_at`) VALUES
(1, 'initie', 'INITIE', '2020-12-10 16:38:56', '2020-12-10 16:38:56'),
(2, 'etudie', 'ETUDIE', '2020-12-10 16:40:06', '2020-12-10 16:40:06'),
(3, 'valide', 'VALIDE', '2020-12-10 16:41:33', '2020-12-10 16:41:33'),
(4, 'cloture', 'CLOTURE', '2020-12-10 16:41:33', '2020-12-10 16:41:33');

-- --------------------------------------------------------

--
-- Structure de la table `type_auth`
--

CREATE TABLE `type_auth` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `code` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `type_auth`
--

INSERT INTO `type_auth` (`id`, `nom`, `code`, `created_at`, `updated_at`) VALUES
(1, 'Charlie', '125', '2020-12-02 14:24:38', '2020-12-02 14:24:38');

-- --------------------------------------------------------

--
-- Structure de la table `type_contribution`
--

CREATE TABLE `type_contribution` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `code` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `type_contribution`
--

INSERT INTO `type_contribution` (`id`, `nom`, `code`) VALUES
(1, 'financiere', 'FINANCIERE'),
(2, 'video', 'VIDEO');

-- --------------------------------------------------------

--
-- Structure de la table `type_organisation`
--

CREATE TABLE `type_organisation` (
  `id` int(11) NOT NULL,
  `nom` varchar(500) NOT NULL,
  `code` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `type_organisation`
--

INSERT INTO `type_organisation` (`id`, `nom`, `code`, `created_at`, `updated_at`) VALUES
(1, 'Personnellle', '025', '2020-12-02 15:12:42', '2020-12-02 15:12:42');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `video_projet`
--

CREATE TABLE `video_projet` (
  `id` int(11) NOT NULL,
  `reference` varchar(100) DEFAULT NULL,
  `projet_id` int(11) NOT NULL,
  `titre` varchar(100) DEFAULT NULL,
  `url_video` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `date_ajout` datetime DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `video_projet`
--

INSERT INTO `video_projet` (`id`, `reference`, `projet_id`, `titre`, `url_video`, `description`, `date_ajout`, `created_at`, `updated_at`) VALUES
(1, '003', 2, 'AZ7TFYTF', 'jgfdkfghkj', 'yjtfuitf', '2020-12-10 11:24:14', '2020-12-10 10:24:14', '2020-12-10 10:24:14'),
(2, NULL, 2, 'Titre video', NULL, 'ceci est la description', NULL, '2020-12-10 15:04:15', '2020-12-10 15:04:15'),
(3, NULL, 2, 'Titre video', NULL, 'ceci est la description', '2020-12-10 20:44:33', '2020-12-10 18:44:33', '2020-12-10 18:44:33'),
(4, NULL, 2, 'd', NULL, 'ceci est la description', '2020-12-11 10:52:06', '2020-12-11 08:52:05', '2020-12-11 08:52:05'),
(5, NULL, 2, 'd', NULL, 'ceci est la description', '2020-12-11 11:03:25', '2020-12-11 09:03:25', '2020-12-11 09:03:25'),
(6, NULL, 2, 'd', NULL, 'ceci est la description', '2020-12-11 11:06:43', '2020-12-11 09:06:43', '2020-12-11 09:06:43'),
(7, NULL, 2, 'd', NULL, 'ceci est la description', '2020-12-11 11:06:52', '2020-12-11 09:06:52', '2020-12-11 09:06:52');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `actualite`
--
ALTER TABLE `actualite`
  ADD PRIMARY KEY (`id`),
  ADD KEY `actualite_FK` (`projet_id`);

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categorie_un` (`nom`);

--
-- Index pour la table `commentaire`
--
ALTER TABLE `commentaire`
  ADD PRIMARY KEY (`id`),
  ADD KEY `commentaire_FK` (`commente_par_id`),
  ADD KEY `commentaire_FK_1` (`projet_id`);

--
-- Index pour la table `contrepartie`
--
ALTER TABLE `contrepartie`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contrepartie_FK` (`projet_id`);

--
-- Index pour la table `contribution`
--
ALTER TABLE `contribution`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contribution_FK` (`profil_id`),
  ADD KEY `contribution_FK_1` (`projet_id`),
  ADD KEY `contribution_FK_2` (`video_id`),
  ADD KEY `contribution_FK_3` (`paiement_id`);

--
-- Index pour la table `departement`
--
ALTER TABLE `departement`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `mode_paiement`
--
ALTER TABLE `mode_paiement`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_access_tokens_user_id_index` (`user_id`);

--
-- Index pour la table `oauth_auth_codes`
--
ALTER TABLE `oauth_auth_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_auth_codes_user_id_index` (`user_id`);

--
-- Index pour la table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_clients_user_id_index` (`user_id`);

--
-- Index pour la table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `paiement`
--
ALTER TABLE `paiement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `paiement_FK` (`mode_paiement_id`);

--
-- Index pour la table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Index pour la table `pays`
--
ALTER TABLE `pays`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `profil`
--
ALTER TABLE `profil`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `profil_un` (`login`),
  ADD KEY `profil_FK` (`pays_id`),
  ADD KEY `profil_FK_1` (`type_auth_id`);

--
-- Index pour la table `projet`
--
ALTER TABLE `projet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projet_FK` (`categorie_id`),
  ADD KEY `projet_FK_1` (`departement_id`),
  ADD KEY `projet_FK_2` (`porteur_id`),
  ADD KEY `projet_FK_3` (`statut_projet_id`),
  ADD KEY `projet_FK_4` (`type_organisation_id`);

--
-- Index pour la table `statut_projet`
--
ALTER TABLE `statut_projet`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `type_auth`
--
ALTER TABLE `type_auth`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `type_contribution`
--
ALTER TABLE `type_contribution`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `type_organisation`
--
ALTER TABLE `type_organisation`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Index pour la table `video_projet`
--
ALTER TABLE `video_projet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `video_projet_FK` (`projet_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `actualite`
--
ALTER TABLE `actualite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `commentaire`
--
ALTER TABLE `commentaire`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `contrepartie`
--
ALTER TABLE `contrepartie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `contribution`
--
ALTER TABLE `contribution`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `departement`
--
ALTER TABLE `departement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `mode_paiement`
--
ALTER TABLE `mode_paiement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `paiement`
--
ALTER TABLE `paiement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `pays`
--
ALTER TABLE `pays`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `profil`
--
ALTER TABLE `profil`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `projet`
--
ALTER TABLE `projet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `statut_projet`
--
ALTER TABLE `statut_projet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `type_auth`
--
ALTER TABLE `type_auth`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `type_contribution`
--
ALTER TABLE `type_contribution`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `type_organisation`
--
ALTER TABLE `type_organisation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `video_projet`
--
ALTER TABLE `video_projet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `actualite`
--
ALTER TABLE `actualite`
  ADD CONSTRAINT `actualite_FK` FOREIGN KEY (`projet_id`) REFERENCES `projet` (`id`);

--
-- Contraintes pour la table `commentaire`
--
ALTER TABLE `commentaire`
  ADD CONSTRAINT `commentaire_FK` FOREIGN KEY (`commente_par_id`) REFERENCES `profil` (`id`),
  ADD CONSTRAINT `commentaire_FK_1` FOREIGN KEY (`projet_id`) REFERENCES `projet` (`id`);

--
-- Contraintes pour la table `contrepartie`
--
ALTER TABLE `contrepartie`
  ADD CONSTRAINT `contrepartie_FK` FOREIGN KEY (`projet_id`) REFERENCES `projet` (`id`);

--
-- Contraintes pour la table `contribution`
--
ALTER TABLE `contribution`
  ADD CONSTRAINT `contribution_FK` FOREIGN KEY (`profil_id`) REFERENCES `profil` (`id`),
  ADD CONSTRAINT `contribution_FK_1` FOREIGN KEY (`projet_id`) REFERENCES `projet` (`id`),
  ADD CONSTRAINT `contribution_FK_2` FOREIGN KEY (`video_id`) REFERENCES `video_projet` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `contribution_FK_3` FOREIGN KEY (`paiement_id`) REFERENCES `mode_paiement` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `paiement`
--
ALTER TABLE `paiement`
  ADD CONSTRAINT `paiement_FK` FOREIGN KEY (`mode_paiement_id`) REFERENCES `mode_paiement` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `profil`
--
ALTER TABLE `profil`
  ADD CONSTRAINT `profil_FK` FOREIGN KEY (`pays_id`) REFERENCES `pays` (`id`),
  ADD CONSTRAINT `profil_FK_1` FOREIGN KEY (`type_auth_id`) REFERENCES `type_auth` (`id`);

--
-- Contraintes pour la table `projet`
--
ALTER TABLE `projet`
  ADD CONSTRAINT `projet_FK` FOREIGN KEY (`categorie_id`) REFERENCES `categorie` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `projet_FK_1` FOREIGN KEY (`departement_id`) REFERENCES `departement` (`id`),
  ADD CONSTRAINT `projet_FK_2` FOREIGN KEY (`porteur_id`) REFERENCES `profil` (`id`),
  ADD CONSTRAINT `projet_FK_3` FOREIGN KEY (`statut_projet_id`) REFERENCES `statut_projet` (`id`),
  ADD CONSTRAINT `projet_FK_4` FOREIGN KEY (`type_organisation_id`) REFERENCES `type_organisation` (`id`);

--
-- Contraintes pour la table `video_projet`
--
ALTER TABLE `video_projet`
  ADD CONSTRAINT `video_projet_FK` FOREIGN KEY (`projet_id`) REFERENCES `projet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
