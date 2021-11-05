-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : jeu. 04 nov. 2021 à 12:43
-- Version du serveur :  10.3.31-MariaDB-cll-lve
-- Version de PHP : 7.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `c1690415c_bd_wazindo_prod`
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

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `reference` varchar(100) DEFAULT NULL,
  `icone` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id`, `nom`, `created_at`, `updated_at`, `reference`, `icone`) VALUES
(2, 'Education et Formation', '2020-12-02 14:23:26', '2020-12-02 14:23:26', 'CAT002', 'categorie_education_formation.jpg'),
(7, 'Agriculture et Elevage', '2020-12-04 17:36:47', '2020-12-04 17:36:47', 'CAT007', 'categorie_agriculture_elevage.jpg'),
(19, 'Sante et Bien-etre', '2020-12-10 14:41:38', '2020-12-10 14:41:38', 'CAT019', 'categorie_sante_bien-etre.jpg'),
(20, 'Environnement et Ecologie', '2021-03-22 17:58:34', '2021-03-22 17:58:34', NULL, 'categorie_environnement_ecologie.jpg'),
(21, 'Art et Culture', '2021-03-22 17:58:53', '2021-03-22 17:58:53', NULL, 'categorie_art_culture.jpg'),
(22, 'Litterature et Cinema', '2021-03-22 17:59:04', '2021-03-22 17:59:04', NULL, 'categorie_litterature_cinema.jpg'),
(23, 'Technologie et Web', '2021-03-22 17:59:19', '2021-03-22 17:59:19', NULL, 'categorie_technologie_web.jpg'),
(24, 'Sport et Loisir', '2021-03-22 17:59:32', '2021-03-22 17:59:32', NULL, 'categorie_sports_loisirs.jpg'),
(25, 'Communaute et Solidarite', '2021-03-22 17:59:44', '2021-03-22 17:59:44', NULL, 'categorie_communaute_solidarite.jpg');

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

-- --------------------------------------------------------

--
-- Structure de la table `commune`
--

CREATE TABLE `commune` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `departement_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `commune`
--

INSERT INTO `commune` (`id`, `nom`, `departement_id`, `created_at`, `updated_at`) VALUES
(1, 'Commune 1', 4, NULL, NULL),
(2, 'Commune 2', 1, NULL, NULL),
(3, 'Commune 3', 2, NULL, NULL),
(4, 'Commune 5', 5, NULL, NULL),
(5, 'Commune 6', 11, NULL, NULL),
(6, 'Commune 98', 6, NULL, NULL),
(7, 'Commune 85', 3, NULL, NULL),
(8, 'Commune 42', 12, NULL, NULL),
(9, 'Commune 78', 7, NULL, NULL),
(10, 'Commune 56', 8, NULL, NULL),
(11, 'Commune 52', 9, NULL, NULL),
(12, 'Commune 921', 10, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `contrepartie_projet`
--

CREATE TABLE `contrepartie_projet` (
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
-- Déchargement des données de la table `contrepartie_projet`
--

INSERT INTO `contrepartie_projet` (`id`, `projet_id`, `description`, `image`, `qte_totale`, `est_illimite`, `date_liv_est`, `qte_cde`, `mt_min`, `mt_max`, `created_at`, `updated_at`) VALUES
(13, 29, 'Pour les villageois ', 'https://api.wazindo.com/public/api/v1/live/operations/imageurl/20210825_1629912873_780411.jpg', 0, 0, '2021-08-26 00:00:00', 0, 250000, 250000, '2021-08-25 15:34:33', '2021-08-25 15:34:33'),
(14, 29, 'pour les personnes venues de l\'extérieurs', 'https://api.wazindo.com/public/api/v1/live/operations/imageurl/20210825_1629912923_647155.jpg', 0, 0, '2021-08-31 00:00:00', 0, 45000, 45000, '2021-08-25 15:35:23', '2021-08-25 15:35:23'),
(15, 31, 'hghghj', '', 0, 1, '2021-11-29 00:00:00', 0, 2500, 2500, '2021-11-04 10:24:33', '2021-11-04 10:24:33');

-- --------------------------------------------------------

--
-- Structure de la table `contribution_projet`
--

CREATE TABLE `contribution_projet` (
  `id` int(11) NOT NULL,
  `contributeur_id` int(11) NOT NULL,
  `projet_id` int(11) NOT NULL,
  `date_contrib` timestamp NULL DEFAULT current_timestamp(),
  `montant` int(11) DEFAULT NULL,
  `est_public` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `type_contrib_id` int(11) DEFAULT NULL,
  `video_id` int(11) DEFAULT NULL,
  `paiement_id` int(11) DEFAULT NULL,
  `transaction_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
(1, 'Borgou', 1, '2020-12-02 15:13:34', '2020-12-02 15:13:34'),
(2, 'Atacora', 1, '2021-03-25 16:08:26', '2021-03-25 16:08:26'),
(3, 'Donga', 1, '2021-03-25 16:08:26', '2021-03-25 16:08:26'),
(4, 'Alibori', 1, '2021-03-25 16:09:43', '2021-03-25 16:09:43'),
(5, 'Atlantique', 1, '2021-03-25 16:09:43', '2021-03-25 16:09:43'),
(6, 'Couffo', 1, '2021-03-25 16:10:04', '2021-03-25 16:10:04'),
(7, 'Mono', 1, '2021-03-25 16:10:04', '2021-03-25 16:10:04'),
(8, 'Ouémé', 1, '2021-03-25 16:10:23', '2021-03-25 16:10:23'),
(9, 'Plateau', 1, '2021-03-25 16:10:23', '2021-03-25 16:10:23'),
(10, 'Zou', 1, '2021-03-25 16:10:48', '2021-03-25 16:10:48'),
(11, 'Colline', 1, '2021-03-25 16:10:48', '2021-03-25 16:10:48'),
(12, 'Littoral', 1, '2021-03-25 16:11:21', '2021-03-25 16:11:21');

-- --------------------------------------------------------

--
-- Structure de la table `detail_liste_diffusion_porteur`
--

CREATE TABLE `detail_liste_diffusion_porteur` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `telephone` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `liste_diffusion_porteur_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
-- Structure de la table `financement_sponsor`
--

CREATE TABLE `financement_sponsor` (
  `id` int(11) NOT NULL,
  `sponsor_id` int(11) DEFAULT NULL,
  `pub_id` int(11) DEFAULT NULL,
  `montant_apport` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
-- Structure de la table `ligne_finance_projet`
--

CREATE TABLE `ligne_finance_projet` (
  `id` int(11) NOT NULL,
  `ligne_finance` varchar(100) DEFAULT NULL,
  `montant` varchar(100) DEFAULT NULL,
  `commentaire` varchar(100) DEFAULT NULL,
  `projet_id` int(11) DEFAULT NULL,
  `date_mise_en_oeuvre` date DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `ligne_finance_projet`
--

INSERT INTO `ligne_finance_projet` (`id`, `ligne_finance`, `montant`, `commentaire`, `projet_id`, `date_mise_en_oeuvre`, `deadline`, `updated_at`, `created_at`) VALUES
(9, 'fresco', '20000', 'pour les villageois', 29, '2021-08-24', '2021-08-31', '2021-08-25 17:31:09', '2021-08-25 17:31:09'),
(10, 'Test 1', '2500', 'Commentaire 1', 30, '2021-11-16', '2021-12-10', '2021-11-03 11:44:13', '2021-11-03 11:44:13'),
(11, 'ghghjg', '2500', 'ghgkhgh', 31, '2021-11-09', '2021-11-30', '2021-11-04 11:22:25', '2021-11-04 11:22:25');

-- --------------------------------------------------------

--
-- Structure de la table `liste_diffusion_porteur`
--

CREATE TABLE `liste_diffusion_porteur` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `profil_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `nombre_contact` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `porteur_id` int(11) NOT NULL,
  `titre` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `date_envoi` timestamp NULL DEFAULT NULL,
  `statut` tinyint(1) DEFAULT 0,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `projet_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
(9, '2020_12_08_163900_create_jobs_table', 2),
(10, '2021_08_02_174628_create_employees_table', 3);

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
-- Structure de la table `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `projet_id` int(11) NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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

--
-- Déchargement des données de la table `oauth_access_tokens`
--

INSERT INTO `oauth_access_tokens` (`id`, `user_id`, `client_id`, `name`, `scopes`, `revoked`, `created_at`, `updated_at`, `expires_at`) VALUES
('0396563fb065f73713301ea995261d115247de97b385516897641804a443d4bf557d67213e4978b2', 41, 3, 'API Token', '[]', 0, '2021-08-16 12:49:48', '2021-08-16 12:49:48', '2022-08-16 14:49:48'),
('058f1cbc669a7a30d53b8519bcf1063ec07a8a28ab59596fcaff61f00af75b7dd6b515ef891fe037', 52, 3, 'API Token', '[]', 0, '2021-11-03 10:26:49', '2021-11-03 10:26:49', '2022-11-03 11:26:49'),
('0732a89b098aeee02fd3f770551282c2ec16d529ee17074509e31dd402f3a0cb93952a06a0823e41', 52, 3, 'API Token', '[]', 0, '2021-11-03 10:20:37', '2021-11-03 10:20:37', '2022-11-03 11:20:37'),
('082df1f9166b489c8bab1989e0071c39d3fb4be650cf6cc752699beb4c4d6c411864a71aa5875140', 1, 3, 'API Token', '[]', 0, '2021-08-25 15:27:59', '2021-08-25 15:27:59', '2022-08-25 17:27:59'),
('0d116d52a7eb04a25b4b0d78a378ab5c0f54a4f8229f8a2889d90f5256e84c8478a131927173d6fa', 50, 3, 'API Token', '[]', 0, '2021-10-12 09:39:01', '2021-10-12 09:39:01', '2022-10-12 11:39:01'),
('13f8b69524056f2d4c6940b0c365c48d04fcf76a0d7d1a89ac8f71142a158a7dd6d8ae9792c79616', 47, 3, 'API Token', '[]', 0, '2021-09-20 19:33:43', '2021-09-20 19:33:43', '2022-09-20 21:33:43'),
('16127648ddd056495a87c59006c4ff7dcbed23ebf945ac45b458a8ae05a3644b160682a9c2137863', 38, 3, 'API Token', '[]', 0, '2021-08-10 14:27:40', '2021-08-10 14:27:40', '2022-08-10 16:27:40'),
('1a7f1d1ede23a070c71a84b052304eb012e9dad6815c584a68e7b674974d7e6643903b99313d09ea', 43, 3, 'API Token', '[]', 0, '2021-08-22 11:53:21', '2021-08-22 11:53:21', '2022-08-22 13:53:21'),
('1ad844a049d7f6b9c8fdc45e0da47dc7c7596932ef7a8b7dacc9dd5068ad6404e37c667c2900bb26', 46, 3, 'API Token', '[]', 0, '2021-09-20 12:26:22', '2021-09-20 12:26:22', '2022-09-20 14:26:22'),
('1b2de7b3407087aada0a8cb8dfc6d2841feac201466f0547b3331adfa5a0da4819d6ab506fd0905b', 38, 3, 'API Token', '[]', 0, '2021-08-09 09:50:46', '2021-08-09 09:50:46', '2022-08-09 11:50:46'),
('1b8978c509b5f4354ff69746c486a4a2e8324e9d771c07cb21c6df55d5a6ab4306d963c08c53fa06', 47, 3, 'API Token', '[]', 0, '2021-09-20 19:00:25', '2021-09-20 19:00:25', '2022-09-20 21:00:25'),
('23a835c4066552fd9e227f46443d498ddbd68d64486354a3b4e8c3157b2bfbc3dcfbaa6399526490', 49, 3, 'API Token', '[]', 0, '2021-09-22 02:20:54', '2021-09-22 02:20:54', '2022-09-22 04:20:54'),
('23e0a3eb50472ca216347313e64ad834eb06cddde5aca15a2a1a2d5b4432abdc3c51d3ece6418301', 49, 3, 'API Token', '[]', 0, '2021-09-26 06:07:08', '2021-09-26 06:07:08', '2022-09-26 08:07:08'),
('28b87f48b0abf30a5dcc2baa066edbd29dfd4cfa568efabefeeab033e580cc8c2ed68c1e4c5bb119', 44, 3, 'API Token', '[]', 0, '2021-08-25 14:26:29', '2021-08-25 14:26:29', '2022-08-25 16:26:29'),
('2971647c2dcb0ee36de599428a6ea9df2df292443f4657522a99cbf1eea7d369ae04e75be74e2783', 27, 3, 'API Token', '[]', 0, '2021-08-06 05:30:21', '2021-08-06 05:30:21', '2022-08-06 07:30:21'),
('2af8b3b8fa51c42bdc31276b436a7d28dcdcc97f8ad80c08e3053798c64db9b8f83d83b82187514e', 48, 3, 'API Token', '[]', 0, '2021-09-21 13:15:57', '2021-09-21 13:15:57', '2022-09-21 15:15:57'),
('2e0bd5e2e3d09d2aa672f15a98fcec433fe7b481ae02eb95767e290bfa5a4f6506c6d1529dd9b367', 38, 3, 'API Token', '[]', 0, '2021-08-09 09:37:43', '2021-08-09 09:37:43', '2022-08-09 11:37:43'),
('333e581ada3e52778cac075bd7f0b346df0d48b33f481cd167f6b487ea0e1f73c1c019e57a64ae63', 51, 3, 'API Token', '[]', 0, '2021-10-12 13:33:48', '2021-10-12 13:33:48', '2022-10-12 15:33:48'),
('34b0a8be99f9bdbddc2dd96516486c83f3605e1e2a3b769ea22e65a76abba2d280cd46177aaeb108', 46, 3, 'API Token', '[]', 0, '2021-09-20 12:28:14', '2021-09-20 12:28:14', '2022-09-20 14:28:14'),
('38565e5c6c08115828621a2ab34390081928b46ace16ac1328677d089d121a91b0c46a333a45908b', 38, 3, 'API Token', '[]', 0, '2021-08-09 09:59:24', '2021-08-09 09:59:24', '2022-08-09 11:59:24'),
('3963ea71d9562ef31f95c24c5c2542317a522ff3632c6d027fee864bd5aebd3dbdb9a1da922a1aa6', 50, 3, 'API Token', '[]', 0, '2021-10-12 13:50:35', '2021-10-12 13:50:35', '2022-10-12 15:50:35'),
('3c0c2063b661f9f1a15afe7b35f1c626cc691e1528286e6af5412e04901f31a19000ffb844723904', 47, 3, 'API Token', '[]', 0, '2021-09-20 19:08:42', '2021-09-20 19:08:42', '2022-09-20 21:08:42'),
('43143eaf6e8a4844cc23484cbf7046e4b331162d637a1fc85fab68f52adf47fc46ac2f0083e1c9bd', 38, 3, 'API Token', '[]', 0, '2021-08-09 09:48:36', '2021-08-09 09:48:36', '2022-08-09 11:48:36'),
('432d63bdf3fa6e5c0b6a74ef05cbea61a9574bf7c7bc35729123e1aa091c089e05e14e6eb83637c6', 42, 3, 'API Token', '[]', 0, '2021-08-19 04:02:49', '2021-08-19 04:02:49', '2022-08-19 06:02:49'),
('458172ba94534f51923ea97d353f995797458480495af7c2e9d41b42b3249d10eddde879aa6839d0', 49, 3, 'API Token', '[]', 0, '2021-09-22 02:34:09', '2021-09-22 02:34:09', '2022-09-22 04:34:09'),
('4f4af76cd534acad2403dd63ac8926acbc631fbda548ee2ba7041eadbac757ad5f03b9493f81b047', 50, 3, 'API Token', '[]', 0, '2021-10-12 09:37:19', '2021-10-12 09:37:19', '2022-10-12 11:37:19'),
('4ffe951ec3b71ab46a39b8be2e2a5c469bf5723520ce8fe66e7049bdb11c6a902e2ef1dd5288a619', 34, 3, 'API Token', '[]', 0, '2021-08-04 13:14:47', '2021-08-04 13:14:47', '2022-08-04 15:14:47'),
('573400662cabee82760b7be38a75f173f68d31c3a859cac8b69af453fbf570b8b76cb43ff18dd04f', 42, 3, 'API Token', '[]', 0, '2021-08-19 04:02:13', '2021-08-19 04:02:13', '2022-08-19 06:02:13'),
('5fd35111b4d2c879c98d9a8ac76bfddf3a87b04b52ada4feaed03dc1d634501465769f042f15f6ce', 51, 3, 'API Token', '[]', 0, '2021-10-12 13:50:24', '2021-10-12 13:50:24', '2022-10-12 15:50:24'),
('6024d9a46e153663622cb593322daa3f97ae43a3f8e2b51231578b12cca8f5e905bfeb0e04d6dfdf', 32, 3, 'API Token', '[]', 0, '2021-08-03 14:14:25', '2021-08-03 14:14:25', '2022-08-03 16:14:25'),
('625f0ec037ba58a1168cf93ed6978bbd4f222044af473fd10f40ea6324b47a989dbda9d07f864341', 38, 3, 'API Token', '[]', 0, '2021-08-09 09:58:27', '2021-08-09 09:58:27', '2022-08-09 11:58:27'),
('6461e35405aeb6ab5c70e0e8507f058963441e271946b1081286512a8d70cba2a4cf78cbfbbc4d3d', 51, 3, 'API Token', '[]', 0, '2021-10-12 13:34:25', '2021-10-12 13:34:25', '2022-10-12 15:34:25'),
('656d17e604a4e1ea892f9d19766ec04dcdb0b188ece7d28e02324dafdd05f8dbd6331e760abd2127', 51, 3, 'API Token', '[]', 0, '2021-10-12 13:33:41', '2021-10-12 13:33:41', '2022-10-12 15:33:41'),
('66d753f5666fa8ccb413eef80d7600494f62e545e8d02200db8de3558bbf12baea1fc8c09ecd531d', 37, 3, 'API Token', '[]', 0, '2021-08-09 08:45:44', '2021-08-09 08:45:44', '2022-08-09 10:45:44'),
('7254acefe14e86c0115d7a521bf686a6ff89153aa51dd3f28d885739f2c2fabc1632c5f87234a689', 40, 3, 'API Token', '[]', 0, '2021-08-16 07:01:53', '2021-08-16 07:01:53', '2022-08-16 09:01:53'),
('72a1bb06f8972ca552e4a5213bd67f817dab6863444575e86a5fb6fab5c5146e14234401b587741c', 38, 3, 'API Token', '[]', 0, '2021-08-09 09:53:06', '2021-08-09 09:53:06', '2022-08-09 11:53:06'),
('789944267ba430410dfc297794b42decdffeec6062fd7eba5f17e20d2ccf2275b125160e7e249a7b', 51, 3, 'API Token', '[]', 0, '2021-10-12 12:55:33', '2021-10-12 12:55:33', '2022-10-12 14:55:33'),
('79cb6965e49bbdfe7ed58c4604573c30091fa361805a633000af96a15acca642ce41162448088ac9', 36, 3, 'API Token', '[]', 0, '2021-08-09 08:36:26', '2021-08-09 08:36:26', '2022-08-09 10:36:26'),
('7dbb282a49a9fa6f5bcd3647ee9be3fc9551e53d5fb808fba3939650b4c8385ed17eb643850fd286', 38, 3, 'API Token', '[]', 0, '2021-08-09 09:49:49', '2021-08-09 09:49:49', '2022-08-09 11:49:49'),
('8168ee77746fb72e9fbedb5742fe33b697679cef9ad1406700e7798319ade139ac95690fa6be4f3d', 49, 3, 'API Token', '[]', 0, '2021-09-23 08:41:23', '2021-09-23 08:41:23', '2022-09-23 10:41:23'),
('81cbe81be1b446823f5aea29f227f7f12a92d4a2cc5be61fcf124d0245390104a0942a170bb487af', 44, 3, 'API Token', '[]', 0, '2021-08-25 14:27:08', '2021-08-25 14:27:08', '2022-08-25 16:27:08'),
('8a9c14981b160d6dac50538c3f37a8aa379e343c42f2eeec67bc3bfd956fcd2ed457899a0a3c4106', 38, 3, 'API Token', '[]', 0, '2021-08-09 09:46:08', '2021-08-09 09:46:08', '2022-08-09 11:46:08'),
('8c2fbb745e86573ae39a755419c252c7fe905199dfbd1b659a36509a0e26674ae646bf4e3804f240', 39, 3, 'API Token', '[]', 0, '2021-08-16 06:28:11', '2021-08-16 06:28:11', '2022-08-16 08:28:11'),
('8cec7a86dca42035a6376da696623b9d85f8ab283b7a0e86e1184b189582ecae93d626ccda972423', 40, 3, 'API Token', '[]', 0, '2021-08-16 08:40:48', '2021-08-16 08:40:48', '2022-08-16 10:40:48'),
('90995c506c6592e68c8009c5e948283422145ae7160aa8f5481131623021b5cb097b1fe86d014ab4', 44, 3, 'API Token', '[]', 0, '2021-08-25 14:26:03', '2021-08-25 14:26:03', '2022-08-25 16:26:03'),
('9231fc27699181b831527546b3b08f9b5d443067ed94f36e7fecd4caf72b4aefc14ac1480c46b71d', 42, 3, 'API Token', '[]', 0, '2021-08-20 10:31:52', '2021-08-20 10:31:52', '2022-08-20 12:31:52'),
('94c74e08925741e75e5c27ea8bb7c1489c7cf75aa0fd85ee4438f84865340886a69514c39a147365', 48, 3, 'API Token', '[]', 0, '2021-09-21 13:19:45', '2021-09-21 13:19:45', '2022-09-21 15:19:45'),
('a2b9445bfea5c02cf493e1d795f0af8a14b35dc263e716523e7b8f0dd280c6ee605ab67a7690038e', 38, 3, 'API Token', '[]', 0, '2021-08-09 10:08:22', '2021-08-09 10:08:22', '2022-08-09 12:08:22'),
('a52a438ed40f1326fe27d8fea09cc0ff71526a78ecbb6ef512203124a1707c78ec7408c77958fc14', 46, 3, 'API Token', '[]', 0, '2021-09-20 12:27:15', '2021-09-20 12:27:15', '2022-09-20 14:27:15'),
('a658b745729b995e9deccf39ac634feff65b0f29adb19ee8deeceee5d42f658e59e0df399e0cecd9', 42, 3, 'API Token', '[]', 0, '2021-08-19 04:02:36', '2021-08-19 04:02:36', '2022-08-19 06:02:36'),
('a9fca89badcaaab890145ac5ceed5e108b8f8ce042d3e9555e6ea332362a45b1570081efd5918871', 38, 3, 'API Token', '[]', 0, '2021-08-09 09:47:50', '2021-08-09 09:47:50', '2022-08-09 11:47:50'),
('aab13ed835fd79940cd30bdecd551cbe186d61c789e7a26d2f564e236c2f8b2b2c7671b4f8fdc742', 38, 3, 'API Token', '[]', 0, '2021-08-09 10:07:54', '2021-08-09 10:07:54', '2022-08-09 12:07:54'),
('aee69ece7d7820f1e8565dd51ccb12e218af08b50a97cc2659fc76325925a8932eeb0a64943a0f72', 31, 3, 'API Token', '[]', 0, '2021-08-03 13:23:26', '2021-08-03 13:23:26', '2022-08-03 15:23:26'),
('b0250e7fea360cdac3e1fbf4537f47cd5eb4fdd58c9cecc193240a64d4ef2b014b5386848caed138', 38, 3, 'API Token', '[]', 0, '2021-08-09 09:54:39', '2021-08-09 09:54:39', '2022-08-09 11:54:39'),
('b420e539e74f9f24261a80cb0668dc75604ea2f90e102d5552cfb0c4f561e9fc3909a3a2c5281795', 38, 3, 'API Token', '[]', 0, '2021-08-09 09:52:32', '2021-08-09 09:52:32', '2022-08-09 11:52:32'),
('b4d6e136f8239973b3a83079ecfa62cc39ea77291f83010f3430d65f0b11155f998c9ed43c5754c2', 39, 3, 'API Token', '[]', 0, '2021-08-16 06:27:48', '2021-08-16 06:27:48', '2022-08-16 08:27:48'),
('b6d19791595638c6f7b95f034e798e6769e50d6d2e18efec28e02c845f94187630ff4c16b31bf9b0', 33, 3, 'API Token', '[]', 0, '2021-08-04 09:45:52', '2021-08-04 09:45:52', '2022-08-04 11:45:52'),
('bb52c17a85f2ff8a2544e1d0e12b24918a3bcc1e40655e6194fdd4fb9dbf56402cc8edd53d256c05', 52, 3, 'API Token', '[]', 0, '2021-11-04 10:14:53', '2021-11-04 10:14:53', '2022-11-04 11:14:53'),
('bb64b2f308c0ab1cbb1c56783e6cb63638ff67ef02408424252284ac6426edecff7669d0e2d7d16a', 38, 3, 'API Token', '[]', 0, '2021-08-09 09:41:38', '2021-08-09 09:41:38', '2022-08-09 11:41:38'),
('bb8fdc86e49d7e16dd1a8b37d28a9e91d7b8b4605496946502007803ca45c2f7625b61cc581e0ae8', 40, 3, 'API Token', '[]', 0, '2021-08-16 07:01:11', '2021-08-16 07:01:11', '2022-08-16 09:01:11'),
('bc6edae8e3baa66d421b48cd175bbd19dfb032cb97e06c1749b627fc09a78c81b428316032ec39ad', 36, 3, 'API Token', '[]', 0, '2021-08-09 08:35:45', '2021-08-09 08:35:45', '2022-08-09 10:35:45'),
('bddad639f57e139ebab70a404e7833281ee3dd6a6447df9c914131d28cf121a1868535782dca3856', 50, 3, 'API Token', '[]', 0, '2021-10-12 09:39:17', '2021-10-12 09:39:17', '2022-10-12 11:39:17'),
('bdf8e111cbd6ff39c6faa473c86c5c86f36d1d191732afef1be08596e184357fae54815e1c21cd6c', 41, 3, 'API Token', '[]', 0, '2021-08-16 12:56:53', '2021-08-16 12:56:53', '2022-08-16 14:56:53'),
('c129c66fc15d51940b23885b9fb405fbe0d598dfa96107c1c714e8835d44f8e9988a33e0314663c6', 52, 3, 'API Token', '[]', 0, '2021-11-03 11:04:13', '2021-11-03 11:04:13', '2022-11-03 12:04:13'),
('c8971ec7cfb0030c29856e0c9597bb490aa9f78676403fc4cc2e0a5c9658abcbb5382d908effa616', 38, 3, 'API Token', '[]', 0, '2021-08-10 05:50:46', '2021-08-10 05:50:46', '2022-08-10 07:50:46'),
('ce9afadebf7a9420512cdc3702f13618bb0fc6310cf7d545ebd75cd0dfbbb835fa4e0578f351b30e', 38, 3, 'API Token', '[]', 0, '2021-08-09 09:38:20', '2021-08-09 09:38:20', '2022-08-09 11:38:20'),
('cf00776a0510597e00be41790873124fc206e0b5b81542590259020dbeb921d250db72ed3892af3e', 51, 3, 'API Token', '[]', 0, '2021-10-12 12:56:07', '2021-10-12 12:56:07', '2022-10-12 14:56:07'),
('d0b84cd3c2299906151510861f420dd6a605b8b8699c3635de88478d0d30530ef08eb963edcbde59', 27, 3, 'API Token', '[]', 0, '2021-08-06 05:33:09', '2021-08-06 05:33:09', '2022-08-06 07:33:09'),
('d170f94dfb927e00acfae25296c930f0367e289402e6570d8e12378366b5ea261b02ac12c2357bfa', 33, 3, 'API Token', '[]', 0, '2021-08-04 09:46:23', '2021-08-04 09:46:23', '2022-08-04 11:46:23'),
('d254abeab0ea196b639c158b2b52c9801e740463f4b7093d1e20a182ef97f6abb5c233609f244710', 27, 3, 'API Token', '[]', 0, '2021-08-06 05:55:46', '2021-08-06 05:55:46', '2022-08-06 07:55:46'),
('d7580618c28b73d5b55ae5afb78c9a9d47e73030a4f28c4f306a4186deb3d26ed8f4bc9e2e29c665', 42, 3, 'API Token', '[]', 0, '2021-08-19 04:03:57', '2021-08-19 04:03:57', '2022-08-19 06:03:57'),
('d8f050f2d46b5c2e8a6efa5f45a583ffcc7763042b091362a2730ad248ff81f1f7e6689e8584e496', 33, 3, 'API Token', '[]', 0, '2021-08-04 09:59:48', '2021-08-04 09:59:48', '2022-08-04 11:59:48'),
('db28d0e5668705212976deb4c7bc501140d18421137417e58bd0ee548091aa1f47e28b068a564205', 48, 3, 'API Token', '[]', 0, '2021-09-21 13:38:37', '2021-09-21 13:38:37', '2022-09-21 15:38:37'),
('dbd5aee69c2248709d509b72551553d9e3e53ac024bbd37eff8e62c9c9827458abb58772d0659332', 50, 3, 'API Token', '[]', 0, '2021-10-12 09:36:30', '2021-10-12 09:36:30', '2022-10-12 11:36:30'),
('de3635e5cb8e8c21da862248316b8b6fcc9c0153b72d1eb562c7482fbb0a98f4915a1fab096d63b8', 35, 3, 'API Token', '[]', 0, '2021-08-04 13:22:40', '2021-08-04 13:22:40', '2022-08-04 15:22:40'),
('df638234030d74f819da31c908b2e196b2719627dbc410995113d3260a73c5fd9dcbd0b562d7e73f', 43, 3, 'API Token', '[]', 0, '2021-08-22 11:54:28', '2021-08-22 11:54:28', '2022-08-22 13:54:28'),
('e255002ed8b316b94ed3a7394ecd2d58ca9eb1bc7a444fed17c6cfdac25ffe5c5028c22580295692', 38, 3, 'API Token', '[]', 0, '2021-08-09 09:17:17', '2021-08-09 09:17:17', '2022-08-09 11:17:17'),
('e7a5d7a269335dd44cc835d52d70abdb7c23974d301518147c5b183f410ec8577e3d25acc3e9a3ff', 38, 3, 'API Token', '[]', 0, '2021-08-09 09:44:48', '2021-08-09 09:44:48', '2022-08-09 11:44:48'),
('ec25ea3faf873416fdc31c29048e0254d252053c8d3cc1941101dfd68ea5160286e0a10c6f73a3e2', 38, 3, 'API Token', '[]', 0, '2021-08-09 09:57:10', '2021-08-09 09:57:10', '2022-08-09 11:57:10'),
('ef6439a4c954b8a880c684cc7d0d057c64d61ea7257d698fa6776cc0d5445f5659abb48933934ca1', 51, 3, 'API Token', '[]', 0, '2021-10-12 13:31:25', '2021-10-12 13:31:25', '2022-10-12 15:31:25'),
('efa958d1b45646c4064c792ee8ba1d4a3f014adb4542840422ccda71f7500d3876eaa2b34e32114f', 38, 3, 'API Token', '[]', 0, '2021-08-09 09:37:51', '2021-08-09 09:37:51', '2022-08-09 11:37:51'),
('f4bcf02cb3e02f247c5d854fa5f9f14ccd66fdb00a3481455f8cfe9ed339873c066f9dfeb88108e9', 27, 3, 'API Token', '[]', 0, '2021-08-09 06:45:52', '2021-08-09 06:45:52', '2022-08-09 08:45:52'),
('fa8825ac6f146d9731d08fba8e0fe456ee548f1a109f85e3b8c57793983cd1713a61bebf5c4d995c', 43, 3, 'API Token', '[]', 0, '2021-08-22 12:08:07', '2021-08-22 12:08:07', '2022-08-22 14:08:07'),
('faf9e9f5020d39fe6df65ef30d3a8bcd3e4f5c81ab5bbcbd4d27d9f9760a19c1c203d804d68337fc', 38, 3, 'API Token', '[]', 0, '2021-08-09 09:46:56', '2021-08-09 09:46:56', '2022-08-09 11:46:56'),
('fbf605ffe89320da7f6cc06c6bb555e37e96f10589169590dd9a5770daddf28d6c8f8481029687e0', 38, 3, 'API Token', '[]', 0, '2021-08-09 09:40:17', '2021-08-09 09:40:17', '2022-08-09 11:40:17'),
('fe4f20e3f8d60f91f7a379e709c6e0c3baa581456a0cb17a45445c9383a999ec83a3b74ba2259103', 52, 3, 'API Token', '[]', 0, '2021-11-04 10:16:20', '2021-11-04 10:16:20', '2022-11-04 11:16:20'),
('ff9046828764672beb06c5248ec4cb791375fa094cdfecb2ede3887ecf05d97eafd157f3a13f0929', 35, 3, 'API Token', '[]', 0, '2021-08-04 13:21:31', '2021-08-04 13:21:31', '2022-08-04 15:21:31');

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
-- Structure de la table `parametre`
--

CREATE TABLE `parametre` (
  `id` int(11) NOT NULL,
  `code` varchar(100) DEFAULT NULL,
  `valeur` varchar(100) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `parametre`
--

INSERT INTO `parametre` (`id`, `code`, `valeur`, `updated_at`, `created_at`) VALUES
(1, 'COMMISSION', '4', NULL, NULL);

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
  `id` smallint(5) UNSIGNED NOT NULL,
  `indicatif` int(3) NOT NULL,
  `code` varchar(2) NOT NULL,
  `nom` varchar(45) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `pays`
--

INSERT INTO `pays` (`id`, `indicatif`, `code`, `nom`, `created_at`, `updated_at`) VALUES
(1, 4, 'AF', 'Afghanistan', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(2, 8, 'AL', 'Albanie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(3, 10, 'AQ', 'Antarctique', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(4, 12, 'DZ', 'Algérie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(5, 16, 'AS', 'Samoa Américaines', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(6, 20, 'AD', 'Andorre', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(7, 24, 'AO', 'Angola', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(8, 28, 'AG', 'Antigua-et-Barbuda', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(9, 31, 'AZ', 'Azerbaïdjan', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(10, 32, 'AR', 'Argentine', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(11, 36, 'AU', 'Australie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(12, 40, 'AT', 'Autriche', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(13, 44, 'BS', 'Bahamas', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(14, 48, 'BH', 'Bahreïn', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(15, 50, 'BD', 'Bangladesh', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(16, 51, 'AM', 'Arménie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(17, 52, 'BB', 'Barbade', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(18, 56, 'BE', 'Belgique', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(19, 60, 'BM', 'Bermudes', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(20, 64, 'BT', 'Bhoutan', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(21, 68, 'BO', 'Bolivie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(22, 70, 'BA', 'Bosnie-Herzégovine', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(23, 72, 'BW', 'Botswana', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(24, 74, 'BV', 'Île Bouvet', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(25, 76, 'BR', 'Brésil', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(26, 84, 'BZ', 'Belize', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(27, 86, 'IO', 'Territoire Britannique de l\'Océan Indien', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(28, 90, 'SB', 'Îles Salomon', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(29, 92, 'VG', 'Îles Vierges Britanniques', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(30, 96, 'BN', 'Brunéi Darussalam', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(31, 100, 'BG', 'Bulgarie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(32, 104, 'MM', 'Myanmar', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(33, 108, 'BI', 'Burundi', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(34, 112, 'BY', 'Bélarus', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(35, 116, 'KH', 'Cambodge', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(36, 120, 'CM', 'Cameroun', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(37, 124, 'CA', 'Canada', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(38, 132, 'CV', 'Cap-vert', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(39, 136, 'KY', 'Îles Caïmanes', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(40, 140, 'CF', 'République Centrafricaine', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(41, 144, 'LK', 'Sri Lanka', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(42, 148, 'TD', 'Tchad', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(43, 152, 'CL', 'Chili', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(44, 156, 'CN', 'Chine', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(45, 158, 'TW', 'Taïwan', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(46, 162, 'CX', 'Île Christmas', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(47, 166, 'CC', 'Îles Cocos (Keeling)', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(48, 170, 'CO', 'Colombie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(49, 174, 'KM', 'Comores', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(50, 175, 'YT', 'Mayotte', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(51, 178, 'CG', 'République du Congo', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(52, 180, 'CD', 'République Démocratique du Congo', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(53, 184, 'CK', 'Îles Cook', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(54, 188, 'CR', 'Costa Rica', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(55, 191, 'HR', 'Croatie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(56, 192, 'CU', 'Cuba', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(57, 196, 'CY', 'Chypre', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(58, 203, 'CZ', 'République Tchèque', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(59, 204, 'BJ', 'Bénin', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(60, 208, 'DK', 'Danemark', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(61, 212, 'DM', 'Dominique', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(62, 214, 'DO', 'République Dominicaine', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(63, 218, 'EC', 'Équateur', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(64, 222, 'SV', 'El Salvador', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(65, 226, 'GQ', 'Guinée Équatoriale', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(66, 231, 'ET', 'Éthiopie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(67, 232, 'ER', 'Érythrée', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(68, 233, 'EE', 'Estonie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(69, 234, 'FO', 'Îles Féroé', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(70, 238, 'FK', 'Îles (malvinas) Falkland', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(71, 239, 'GS', 'Géorgie du Sud et les Îles Sandwich du Sud', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(72, 242, 'FJ', 'Fidji', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(73, 246, 'FI', 'Finlande', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(74, 248, 'AX', 'Îles Åland', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(75, 250, 'FR', 'France', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(76, 254, 'GF', 'Guyane Française', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(77, 258, 'PF', 'Polynésie Française', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(78, 260, 'TF', 'Terres Australes Françaises', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(79, 262, 'DJ', 'Djibouti', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(80, 266, 'GA', 'Gabon', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(81, 268, 'GE', 'Géorgie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(82, 270, 'GM', 'Gambie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(83, 275, 'PS', 'Territoire Palestinien Occupé', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(84, 276, 'DE', 'Allemagne', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(85, 288, 'GH', 'Ghana', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(86, 292, 'GI', 'Gibraltar', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(87, 296, 'KI', 'Kiribati', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(88, 300, 'GR', 'Grèce', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(89, 304, 'GL', 'Groenland', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(90, 308, 'GD', 'Grenade', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(91, 312, 'GP', 'Guadeloupe', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(92, 316, 'GU', 'Guam', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(93, 320, 'GT', 'Guatemala', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(94, 324, 'GN', 'Guinée', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(95, 328, 'GY', 'Guyana', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(96, 332, 'HT', 'Haïti', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(97, 334, 'HM', 'Îles Heard et Mcdonald', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(98, 336, 'VA', 'Saint-Siège (état de la Cité du Vatican)', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(99, 340, 'HN', 'Honduras', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(100, 344, 'HK', 'Hong-Kong', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(101, 348, 'HU', 'Hongrie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(102, 352, 'IS', 'Islande', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(103, 356, 'IN', 'Inde', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(104, 360, 'ID', 'Indonésie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(105, 364, 'IR', 'République Islamique d\'Iran', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(106, 368, 'IQ', 'Iraq', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(107, 372, 'IE', 'Irlande', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(108, 376, 'IL', 'Israël', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(109, 380, 'IT', 'Italie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(110, 384, 'CI', 'Côte d\'Ivoire', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(111, 388, 'JM', 'Jamaïque', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(112, 392, 'JP', 'Japon', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(113, 398, 'KZ', 'Kazakhstan', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(114, 400, 'JO', 'Jordanie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(115, 404, 'KE', 'Kenya', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(116, 408, 'KP', 'République Populaire Démocratique de Corée', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(117, 410, 'KR', 'République de Corée', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(118, 414, 'KW', 'Koweït', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(119, 417, 'KG', 'Kirghizistan', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(120, 418, 'LA', 'République Démocratique Populaire Lao', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(121, 422, 'LB', 'Liban', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(122, 426, 'LS', 'Lesotho', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(123, 428, 'LV', 'Lettonie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(124, 430, 'LR', 'Libéria', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(125, 434, 'LY', 'Jamahiriya Arabe Libyenne', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(126, 438, 'LI', 'Liechtenstein', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(127, 440, 'LT', 'Lituanie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(128, 442, 'LU', 'Luxembourg', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(129, 446, 'MO', 'Macao', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(130, 450, 'MG', 'Madagascar', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(131, 454, 'MW', 'Malawi', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(132, 458, 'MY', 'Malaisie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(133, 462, 'MV', 'Maldives', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(134, 466, 'ML', 'Mali', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(135, 470, 'MT', 'Malte', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(136, 474, 'MQ', 'Martinique', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(137, 478, 'MR', 'Mauritanie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(138, 480, 'MU', 'Maurice', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(139, 484, 'MX', 'Mexique', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(140, 492, 'MC', 'Monaco', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(141, 496, 'MN', 'Mongolie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(142, 498, 'MD', 'République de Moldova', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(143, 500, 'MS', 'Montserrat', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(144, 504, 'MA', 'Maroc', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(145, 508, 'MZ', 'Mozambique', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(146, 512, 'OM', 'Oman', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(147, 516, 'NA', 'Namibie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(148, 520, 'NR', 'Nauru', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(149, 524, 'NP', 'Népal', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(150, 528, 'NL', 'Pays-Bas', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(151, 530, 'AN', 'Antilles Néerlandaises', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(152, 533, 'AW', 'Aruba', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(153, 540, 'NC', 'Nouvelle-Calédonie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(154, 548, 'VU', 'Vanuatu', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(155, 554, 'NZ', 'Nouvelle-Zélande', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(156, 558, 'NI', 'Nicaragua', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(157, 562, 'NE', 'Niger', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(158, 566, 'NG', 'Nigéria', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(159, 570, 'NU', 'Niué', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(160, 574, 'NF', 'Île Norfolk', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(161, 578, 'NO', 'Norvège', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(162, 580, 'MP', 'Îles Mariannes du Nord', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(163, 581, 'UM', 'Îles Mineures Éloignées des États-Unis', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(164, 583, 'FM', 'États Fédérés de Micronésie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(165, 584, 'MH', 'Îles Marshall', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(166, 585, 'PW', 'Palaos', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(167, 586, 'PK', 'Pakistan', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(168, 591, 'PA', 'Panama', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(169, 598, 'PG', 'Papouasie-Nouvelle-Guinée', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(170, 600, 'PY', 'Paraguay', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(171, 604, 'PE', 'Pérou', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(172, 608, 'PH', 'Philippines', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(173, 612, 'PN', 'Pitcairn', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(174, 616, 'PL', 'Pologne', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(175, 620, 'PT', 'Portugal', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(176, 624, 'GW', 'Guinée-Bissau', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(177, 626, 'TL', 'Timor-Leste', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(178, 630, 'PR', 'Porto Rico', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(179, 634, 'QA', 'Qatar', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(180, 638, 'RE', 'Réunion', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(181, 642, 'RO', 'Roumanie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(182, 643, 'RU', 'Fédération de Russie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(183, 646, 'RW', 'Rwanda', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(184, 654, 'SH', 'Sainte-Hélène', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(185, 659, 'KN', 'Saint-Kitts-et-Nevis', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(186, 660, 'AI', 'Anguilla', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(187, 662, 'LC', 'Sainte-Lucie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(188, 666, 'PM', 'Saint-Pierre-et-Miquelon', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(189, 670, 'VC', 'Saint-Vincent-et-les Grenadines', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(190, 674, 'SM', 'Saint-Marin', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(191, 678, 'ST', 'Sao Tomé-et-Principe', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(192, 682, 'SA', 'Arabie Saoudite', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(193, 686, 'SN', 'Sénégal', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(194, 690, 'SC', 'Seychelles', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(195, 694, 'SL', 'Sierra Leone', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(196, 702, 'SG', 'Singapour', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(197, 703, 'SK', 'Slovaquie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(198, 704, 'VN', 'Viet Nam', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(199, 705, 'SI', 'Slovénie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(200, 706, 'SO', 'Somalie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(201, 710, 'ZA', 'Afrique du Sud', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(202, 716, 'ZW', 'Zimbabwe', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(203, 724, 'ES', 'Espagne', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(204, 732, 'EH', 'Sahara Occidental', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(205, 736, 'SD', 'Soudan', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(206, 740, 'SR', 'Suriname', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(207, 744, 'SJ', 'Svalbard etÎle Jan Mayen', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(208, 748, 'SZ', 'Swaziland', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(209, 752, 'SE', 'Suède', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(210, 756, 'CH', 'Suisse', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(211, 760, 'SY', 'République Arabe Syrienne', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(212, 762, 'TJ', 'Tadjikistan', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(213, 764, 'TH', 'Thaïlande', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(214, 768, 'TG', 'Togo', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(215, 772, 'TK', 'Tokelau', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(216, 776, 'TO', 'Tonga', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(217, 780, 'TT', 'Trinité-et-Tobago', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(218, 784, 'AE', 'Émirats Arabes Unis', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(219, 788, 'TN', 'Tunisie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(220, 792, 'TR', 'Turquie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(221, 795, 'TM', 'Turkménistan', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(222, 796, 'TC', 'Îles Turks et Caïques', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(223, 798, 'TV', 'Tuvalu', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(224, 800, 'UG', 'Ouganda', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(225, 804, 'UA', 'Ukraine', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(226, 807, 'MK', 'L\'ex-République Yougoslave de Macédoine', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(227, 818, 'EG', 'Égypte', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(228, 826, 'GB', 'Royaume-Uni', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(229, 833, 'IM', 'Île de Man', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(230, 834, 'TZ', 'République-Unie de Tanzanie', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(231, 840, 'US', 'États-Unis', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(232, 850, 'VI', 'Îles Vierges des États-Unis', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(233, 854, 'BF', 'Burkina Faso', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(234, 858, 'UY', 'Uruguay', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(235, 860, 'UZ', 'Ouzbékistan', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(236, 862, 'VE', 'Venezuela', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(237, 876, 'WF', 'Wallis et Futuna', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(238, 882, 'WS', 'Samoa', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(239, 887, 'YE', 'Yémen', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(240, 891, 'CS', 'Serbie-et-Monténégro', '2021-05-17 08:55:35', '2021-05-17 08:55:35'),
(241, 894, 'ZM', 'Zambie', '2021-05-17 08:55:35', '2021-05-17 08:55:35');

-- --------------------------------------------------------

--
-- Structure de la table `projet`
--

CREATE TABLE `projet` (
  `id` int(11) NOT NULL,
  `titre` varchar(100) NOT NULL,
  `resume` text NOT NULL,
  `description` text NOT NULL,
  `categorie_id` int(11) NOT NULL,
  `commune_id` int(11) DEFAULT NULL,
  `porteur_id` int(11) NOT NULL,
  `montant_collecte` bigint(20) NOT NULL,
  `photo_porteur` varchar(100) DEFAULT NULL,
  `photo_mini` varchar(100) DEFAULT NULL,
  `statut_projet_id` int(11) NOT NULL,
  `mot_porteur` text NOT NULL,
  `type_organisation_id` int(11) NOT NULL,
  `montant_a_collecte` bigint(20) NOT NULL,
  `duree_campagne` int(11) NOT NULL,
  `lien_document_projet` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `reference` varchar(100) NOT NULL,
  `desc_contrepartie` text NOT NULL,
  `pays_id` int(11) NOT NULL,
  `url_facebook` varchar(100) DEFAULT NULL,
  `url_linkedin` varchar(100) DEFAULT NULL,
  `url_twitter` varchar(100) DEFAULT NULL,
  `url_youtube` varchar(100) DEFAULT NULL,
  `adresse` varchar(100) DEFAULT NULL,
  `adresse_email` varchar(100) DEFAULT NULL,
  `telephone` varchar(100) DEFAULT NULL,
  `bibliographie` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `projet`
--

INSERT INTO `projet` (`id`, `titre`, `resume`, `description`, `categorie_id`, `commune_id`, `porteur_id`, `montant_collecte`, `photo_porteur`, `photo_mini`, `statut_projet_id`, `mot_porteur`, `type_organisation_id`, `montant_a_collecte`, `duree_campagne`, `lien_document_projet`, `created_at`, `updated_at`, `reference`, `desc_contrepartie`, `pays_id`, `url_facebook`, `url_linkedin`, `url_twitter`, `url_youtube`, `adresse`, `adresse_email`, `telephone`, `bibliographie`) VALUES
(29, 'Projet D\'analphabétisation', 'Besoin d\'aide particulière pour le projet', 'Notre projet a pour but d\'aider toutes les personnes qui ont les difficultés à lire et écrire de mieux s\'améliorer et s\'adapter au monde extérieur en vu de bien faire leurs activitées', 2, NULL, 1, 0, NULL, 'https://api.wazindo.com/public/api/v1/live/operations/imageurl/20210825_1629913033_49881.jpg', 7, 'Notre projet a pour but d\'aider toutes les personnes qui ont les difficultés à lire et écrire de mieux s\'améliorer et s\'adapter au monde extérieur en vu de bien faire leurs activitées', 1, 150000, 25, '', '2021-08-25 15:30:31', '2021-08-25 15:37:14', 'REF1629912631', 'Aidez nous a faire de ce projet une réussite', 59, 'http://wazindo.com/', 'http://wazindo.com/', 'http://wazindo.com/', 'http://wazindo.com/', 'calavi', 'zogbadjè', '0022965352563', 'Je suis le porteur de ce projet'),
(30, 'Test Projet', '', 'Ceci est un projet test', 7, NULL, 52, 0, NULL, '', 7, 'Ceci est un projet test', 1, 200000, 13, '', '2021-11-03 10:29:21', '2021-11-03 11:00:03', 'REF1635938961', 'Ce sont des contreparties raisonnables', 59, 'http://www.facebook.com/iwajutech', 'http://www.linkedin.com/iwajutech', 'http://www.twitter.com/iwajutech', 'http://www.youtube.com/iwajutech', 'Cotonou, Gare Taxi Tokpa', 'dgtdg@sdhghsgd.bj', '229676-54433', 'Ceci ets une biographie'),
(31, 'Test2', 'hjqgchsdgcsg', 'cfgsfdfsgjfdsg', 21, NULL, 52, 0, NULL, NULL, 7, 'cfgsfdfsgjfdsg', 1, 3000, 14, '', '2021-11-04 10:20:37', '2021-11-04 10:25:39', 'REF1636024837', 'cfgsfdfsgjfdsg', 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `pub_solidaire`
--

CREATE TABLE `pub_solidaire` (
  `id` int(11) NOT NULL,
  `titre` varchar(100) NOT NULL,
  `description` varchar(256) NOT NULL,
  `created_by_id` int(11) NOT NULL,
  `lien_image_projet` varchar(100) DEFAULT NULL,
  `lien_video` varchar(100) DEFAULT NULL,
  `total_vues` int(11) DEFAULT NULL,
  `montant_soutien` varchar(100) DEFAULT NULL,
  `montant_projet` varchar(100) DEFAULT NULL,
  `montant_visualisation` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `soutien_solidaire`
--

CREATE TABLE `soutien_solidaire` (
  `id` int(11) NOT NULL,
  `date_visualisation` timestamp NULL DEFAULT NULL,
  `pub_id` int(11) DEFAULT NULL,
  `user_agent` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `sponsor`
--

CREATE TABLE `sponsor` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `adresse` varchar(100) DEFAULT NULL,
  `contact` varchar(100) DEFAULT NULL,
  `personne_reference` varchar(100) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `statut_projet`
--

CREATE TABLE `statut_projet` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `code` varchar(20) NOT NULL,
  `ordre` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `statut_projet`
--

INSERT INTO `statut_projet` (`id`, `nom`, `code`, `ordre`, `created_at`, `updated_at`) VALUES
(1, 'Proposé', 'PROPOSE', 1, '2020-12-10 16:38:56', '2020-12-10 16:38:56'),
(2, 'Validé', 'VALIDE_INIT', 2, '2020-12-10 16:40:06', '2020-12-10 16:40:06'),
(4, 'En Ligne', 'EN_LIGNE', 4, '2020-12-10 16:41:33', '2020-12-10 16:41:33'),
(7, 'Publie', 'PUBLIE', 3, '2021-03-27 12:33:56', '2021-03-27 12:33:56'),
(8, 'Cloture', 'CLOTURE', 5, '2021-03-27 12:34:22', '2021-03-27 12:34:22');

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
(1, 'Startup', 'STARTUP', '2020-12-02 15:12:42', '2020-12-02 15:12:42'),
(2, 'Entreprise', 'ENTREPRISE', '2021-05-17 08:53:07', '2021-05-17 08:53:07'),
(3, 'Association', 'ASSOCIATION', '2021-05-17 08:53:07', '2021-05-17 08:53:07'),
(4, 'Collectivité Locale', 'COLLECTIVITE_LOCALE', '2021-05-17 08:53:32', '2021-05-17 08:53:32');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
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
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(200) DEFAULT NULL,
  `login` varchar(100) DEFAULT NULL,
  `password` varchar(250) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL,
  `est_admin` tinyint(1) DEFAULT 0,
  `telephone` varchar(15) DEFAULT NULL,
  `pays_id` int(11) DEFAULT NULL,
  `type_auth_id` int(11) DEFAULT NULL,
  `date_exp` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `bibliographie` text DEFAULT NULL,
  `est_actif` tinyint(1) NOT NULL DEFAULT 0,
  `code_activation` varchar(100) DEFAULT NULL,
  `url_youtube` varchar(100) DEFAULT NULL,
  `url_twitter` varchar(100) DEFAULT NULL,
  `url_facebook` varchar(100) DEFAULT NULL,
  `url_linkedin` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `nom`, `prenom`, `login`, `password`, `email`, `est_admin`, `telephone`, `pays_id`, `type_auth_id`, `date_exp`, `created_at`, `updated_at`, `bibliographie`, `est_actif`, `code_activation`, `url_youtube`, `url_twitter`, `url_facebook`, `url_linkedin`, `name`, `email_verified_at`, `remember_token`) VALUES
(1, 'Admin', 'Wazindo', 'admin', '$2y$10$lXuehcT3idd5caRAeIeRiefjW4b2gZVOkuNtSJDdu4c8p8ffpD.3q', 'admin@gmail.com', 1, '61772318', 1, 1, NULL, '2020-12-02 15:19:40', '2021-08-25 15:33:22', 'Je suis le porteur de ce projet', 1, '', 'http://wazindo.com/', 'http://wazindo.com/', 'http://wazindo.com/', 'http://wazindo.com/', NULL, NULL, NULL),
(42, 'Technology', 'Ola', NULL, '$2y$10$1Uh5Py3DP8gK/VAe/hlDV.nhoTlMq.2kT0ScAZy0Rq58dvYcU1pCS', 'olaongbenin@gmail.com', 0, '62521111', 59, NULL, NULL, '2021-08-19 04:02:12', '2021-08-19 04:02:13', NULL, 0, '69o=dc1kqca#7t2', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(43, 'LAWANI', 'Arsène', NULL, '$2y$10$t03jIs794zQRzTxqv/LMaesfU9XfRYqutSM9LQ62H16f.M14oG91K', 'iwaju.office@gmail.com', 0, '1491351677', 84, NULL, NULL, '2021-08-22 11:53:20', '2021-08-22 11:53:21', NULL, 0, '=gul4zdo=eaivxt', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(44, 'beken', 'Sodotchin', NULL, '$2y$10$lXuehcT3idd5caRAeIeRiefjW4b2gZVOkuNtSJDdu4c8p8ffpD.3q', 'bsodotchin@gmail.com', 0, '552252652', 59, NULL, '2021-08-25 16:26:03', '2021-08-25 14:26:02', '2021-08-25 14:26:59', NULL, 1, 'q53jh5wywrz7m=l', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(46, 'AZIHOU', 'Merveilleux', NULL, '$2y$10$PVRxK1Vyq0rO3BqjyxmsTe6zGDBBtaJDcpjytaqO94S.BNpQhNdhK', 'merveilleuxazihou@gmail.com', 0, '65287953', 59, NULL, '2021-09-20 14:26:22', '2021-09-20 12:26:21', '2021-09-20 12:27:37', NULL, 1, 'tdv1t25tpy1=cva', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(47, 'Olatech', 'Ola', NULL, '$2y$10$9pr9IS75YC5xxG/ozayejeteZQKL.fjzLX/CBwb.SHWjhxqQWjWqu', 'osonslutterpourlavenir@gmail.c', 0, '97111149', 59, NULL, '2021-09-20 21:00:25', '2021-09-20 19:00:25', '2021-09-20 19:00:25', NULL, 0, 'cvjw2d5gxk@ud=q', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(48, 'Boston', 'Leo', NULL, '$2y$10$Ev6Q6GmnhRH.WgVQMLt.F.NENuBXR/aU6jGtfAayj2VUntFcE4zWq', 'develop4iwaju@gmail.com', 0, '1490190101', 59, NULL, '2021-09-21 15:15:57', '2021-09-21 13:15:56', '2021-09-21 13:37:39', NULL, 1, 'x3beetugox@nw6z', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(49, 'Olatech', 'Ola', NULL, '$2y$10$S7Ry.eL0sshx/uPi0rR1lu3HM.eMf0GU3/wolfgRDGn7D5cWCI9di', 'wazindo.info@gmail.com', 0, '97111149', 59, NULL, '2021-09-22 04:20:54', '2021-09-22 02:20:54', '2021-09-22 02:22:08', NULL, 1, 'bvswqmdhg01l=9=', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(50, 'Dine', 'Junior', NULL, '$2y$10$ugilvFZUBOBMmle8t2L5ze4YGQggVAvMCEsAxvFR2k71Gf2ahTBjK', 'aiboukicharafdine1@gmail.com', 0, '8596', 192, NULL, '2021-10-12 11:36:30', '2021-10-12 09:36:30', '2021-10-12 09:38:23', NULL, 1, '2x0lokfdmlw1wf2', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(51, 'junior', 'Junior', NULL, '$2y$10$fc5IEuIUOiq6.OGJ/elInuzBM2x/qTSYrrFz.4XHuC33iPQ/rKt5i', 'dcharaf20@gmail.com', 0, '69130719', 59, NULL, '2021-10-12 14:55:33', '2021-10-12 12:55:33', '2021-10-12 12:55:33', NULL, 0, 'gw263b=4j4#e#iq', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(52, 'LAWANI', 'Arsène', NULL, '$2y$10$HOi0/.C7jn8.iEJ6kXI15OVhvHuUthsCQWbXBHTSHPt5yRiRyS0Ga', 'glart03@gmail.com', 0, '22966188157', 59, NULL, '2021-11-03 12:20:37', '2021-11-03 10:20:36', '2021-11-03 10:52:10', 'Ceci ets une biographie', 1, 'm@iu5s@0fq8q6r8', 'http://www.youtube.com/iwajutech', 'http://www.twitter.com/iwajutech', 'http://www.facebook.com/iwajutech', 'http://www.linkedin.com/iwajutech', NULL, NULL, NULL);

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
-- Index pour la table `commune`
--
ALTER TABLE `commune`
  ADD PRIMARY KEY (`id`),
  ADD KEY `commune_FK` (`departement_id`);

--
-- Index pour la table `contrepartie_projet`
--
ALTER TABLE `contrepartie_projet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contrepartie_FK` (`projet_id`);

--
-- Index pour la table `contribution_projet`
--
ALTER TABLE `contribution_projet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contribution_FK` (`contributeur_id`),
  ADD KEY `contribution_FK_1` (`projet_id`),
  ADD KEY `contribution_FK_2` (`video_id`),
  ADD KEY `contribution_FK_3` (`paiement_id`);

--
-- Index pour la table `departement`
--
ALTER TABLE `departement`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `detail_liste_diffusion_porteur`
--
ALTER TABLE `detail_liste_diffusion_porteur`
  ADD PRIMARY KEY (`id`),
  ADD KEY `detail_liste_diffusion_porteur_FK` (`liste_diffusion_porteur_id`);

--
-- Index pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `financement_sponsor`
--
ALTER TABLE `financement_sponsor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `financement_sponsor_FK` (`sponsor_id`),
  ADD KEY `financement_sponsor_FK_1` (`pub_id`);

--
-- Index pour la table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Index pour la table `ligne_finance_projet`
--
ALTER TABLE `ligne_finance_projet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ligne_finance_projet_FK` (`projet_id`);

--
-- Index pour la table `liste_diffusion_porteur`
--
ALTER TABLE `liste_diffusion_porteur`
  ADD PRIMARY KEY (`id`),
  ADD KEY `diffusion_FK` (`profil_id`);

--
-- Index pour la table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `message_FK` (`porteur_id`),
  ADD KEY `message_FK_1` (`projet_id`);

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
-- Index pour la table `notification`
--
ALTER TABLE `notification`
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
-- Index pour la table `parametre`
--
ALTER TABLE `parametre`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Index pour la table `pays`
--
ALTER TABLE `pays`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD UNIQUE KEY `indicatif` (`indicatif`);

--
-- Index pour la table `projet`
--
ALTER TABLE `projet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projet_FK` (`categorie_id`),
  ADD KEY `projet_FK_1` (`commune_id`),
  ADD KEY `projet_FK_2` (`statut_projet_id`),
  ADD KEY `projet_FK_3` (`type_organisation_id`),
  ADD KEY `projet_FK_4` (`porteur_id`),
  ADD KEY `projet_FK_pays` (`pays_id`);

--
-- Index pour la table `pub_solidaire`
--
ALTER TABLE `pub_solidaire`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pub_solidaire_FK` (`created_by_id`);

--
-- Index pour la table `soutien_solidaire`
--
ALTER TABLE `soutien_solidaire`
  ADD PRIMARY KEY (`id`),
  ADD KEY `soutien_solidaire_FK` (`pub_id`);

--
-- Index pour la table `sponsor`
--
ALTER TABLE `sponsor`
  ADD PRIMARY KEY (`id`);

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
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `profil_un` (`login`),
  ADD KEY `profil_FK` (`pays_id`),
  ADD KEY `profil_FK_1` (`type_auth_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT pour la table `commentaire`
--
ALTER TABLE `commentaire`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `commune`
--
ALTER TABLE `commune`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `contrepartie_projet`
--
ALTER TABLE `contrepartie_projet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `contribution_projet`
--
ALTER TABLE `contribution_projet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `departement`
--
ALTER TABLE `departement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `detail_liste_diffusion_porteur`
--
ALTER TABLE `detail_liste_diffusion_porteur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `financement_sponsor`
--
ALTER TABLE `financement_sponsor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `ligne_finance_projet`
--
ALTER TABLE `ligne_finance_projet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `liste_diffusion_porteur`
--
ALTER TABLE `liste_diffusion_porteur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `mode_paiement`
--
ALTER TABLE `mode_paiement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `parametre`
--
ALTER TABLE `parametre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `pays`
--
ALTER TABLE `pays`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=242;

--
-- AUTO_INCREMENT pour la table `projet`
--
ALTER TABLE `projet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT pour la table `pub_solidaire`
--
ALTER TABLE `pub_solidaire`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `soutien_solidaire`
--
ALTER TABLE `soutien_solidaire`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `sponsor`
--
ALTER TABLE `sponsor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `statut_projet`
--
ALTER TABLE `statut_projet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT pour la table `video_projet`
--
ALTER TABLE `video_projet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
  ADD CONSTRAINT `commentaire_FK` FOREIGN KEY (`commente_par_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `commentaire_FK_1` FOREIGN KEY (`projet_id`) REFERENCES `projet` (`id`);

--
-- Contraintes pour la table `commune`
--
ALTER TABLE `commune`
  ADD CONSTRAINT `commune_FK` FOREIGN KEY (`departement_id`) REFERENCES `departement` (`id`);

--
-- Contraintes pour la table `detail_liste_diffusion_porteur`
--
ALTER TABLE `detail_liste_diffusion_porteur`
  ADD CONSTRAINT `detail_liste_diffusion_porteur_FK` FOREIGN KEY (`liste_diffusion_porteur_id`) REFERENCES `liste_diffusion_porteur` (`id`);

--
-- Contraintes pour la table `financement_sponsor`
--
ALTER TABLE `financement_sponsor`
  ADD CONSTRAINT `financement_sponsor_FK` FOREIGN KEY (`sponsor_id`) REFERENCES `sponsor` (`id`),
  ADD CONSTRAINT `financement_sponsor_FK_1` FOREIGN KEY (`pub_id`) REFERENCES `pub_solidaire` (`id`);

--
-- Contraintes pour la table `ligne_finance_projet`
--
ALTER TABLE `ligne_finance_projet`
  ADD CONSTRAINT `ligne_finance_projet_FK` FOREIGN KEY (`projet_id`) REFERENCES `projet` (`id`);

--
-- Contraintes pour la table `liste_diffusion_porteur`
--
ALTER TABLE `liste_diffusion_porteur`
  ADD CONSTRAINT `diffusion_FK` FOREIGN KEY (`profil_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_FK` FOREIGN KEY (`porteur_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `message_FK_1` FOREIGN KEY (`projet_id`) REFERENCES `projet` (`id`);

--
-- Contraintes pour la table `paiement`
--
ALTER TABLE `paiement`
  ADD CONSTRAINT `paiement_FK` FOREIGN KEY (`mode_paiement_id`) REFERENCES `mode_paiement` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `projet`
--
ALTER TABLE `projet`
  ADD CONSTRAINT `projet_FK` FOREIGN KEY (`categorie_id`) REFERENCES `categorie` (`id`),
  ADD CONSTRAINT `projet_FK_1` FOREIGN KEY (`commune_id`) REFERENCES `commune` (`id`),
  ADD CONSTRAINT `projet_FK_2` FOREIGN KEY (`statut_projet_id`) REFERENCES `statut_projet` (`id`),
  ADD CONSTRAINT `projet_FK_3` FOREIGN KEY (`type_organisation_id`) REFERENCES `type_organisation` (`id`),
  ADD CONSTRAINT `projet_FK_4` FOREIGN KEY (`porteur_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `pub_solidaire`
--
ALTER TABLE `pub_solidaire`
  ADD CONSTRAINT `pub_solidaire_FK` FOREIGN KEY (`created_by_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `soutien_solidaire`
--
ALTER TABLE `soutien_solidaire`
  ADD CONSTRAINT `soutien_solidaire_FK` FOREIGN KEY (`pub_id`) REFERENCES `pub_solidaire` (`id`);

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `profil_FK_1` FOREIGN KEY (`type_auth_id`) REFERENCES `type_auth` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
