-- store_note_dev1.categories definition

CREATE TABLE `categories` (
  `id` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `store_type` int NOT NULL,
  `name` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_by` char(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_dt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` char(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `updated_dt` timestamp(6) NULL DEFAULT NULL,
  `deleted_dt` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- store_note_dev1.journal definition

CREATE TABLE `journal` (
  `id` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('DEBIT','CREDIT') COLLATE utf8mb4_general_ci NOT NULL,
  `amount` int NOT NULL,
  `store_id` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `code` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_by` char(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_dt` datetime DEFAULT '2024-06-20 18:35:32',
  `updated_by` char(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `updated_dt` datetime(6) DEFAULT NULL,
  `deleted_dt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- store_note_dev1.otp definition

CREATE TABLE `otp` (
  `id` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `code_otp` int NOT NULL,
  `type` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `expired_dt` datetime DEFAULT NULL,
  `created_by` char(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_dt` datetime NOT NULL DEFAULT '2024-06-15 15:44:10',
  `updated_by` char(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `updated_dt` datetime(6) DEFAULT NULL,
  `deleted_dt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- store_note_dev1.product definition

CREATE TABLE `product` (
  `id` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `image_url` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `price` int NOT NULL,
  `stock` int NOT NULL,
  `store_id` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `created_by` char(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_dt` datetime DEFAULT '2024-06-19 18:36:06',
  `updated_by` char(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `updated_dt` datetime(6) DEFAULT NULL,
  `deleted_dt` datetime(6) DEFAULT NULL,
  `data_status` datetime(6) DEFAULT NULL,
  `unit` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- store_note_dev1.product_category definition

CREATE TABLE `product_category` (
  `id` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `product_id` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `category_id` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `created_by` char(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_dt` datetime DEFAULT '2024-06-19 18:36:06',
  `updated_by` char(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `updated_dt` datetime(6) DEFAULT NULL,
  `deleted_dt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- store_note_dev1.product_history definition

CREATE TABLE `product_history` (
  `id` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `product_id` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `status` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `price` int DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `created_by` char(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_dt` datetime DEFAULT '2024-06-19 18:36:06',
  `updated_by` char(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `updated_dt` datetime(6) DEFAULT NULL,
  `deleted_dt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- store_note_dev1.product_transaction definition

CREATE TABLE `product_transaction` (
  `id` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `product_id` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `store_id` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `payment_method` char(50) COLLATE utf8mb4_general_ci NOT NULL,
  `amount` int NOT NULL,
  `product_quantity` int NOT NULL,
  `code` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_by` char(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_dt` datetime DEFAULT '2024-06-23 16:37:39',
  `updated_by` char(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `updated_dt` datetime(6) DEFAULT NULL,
  `deleted_dt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- store_note_dev1.store definition

CREATE TABLE `store` (
  `id` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `store_image_url` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `store_type` int DEFAULT NULL,
  `created_by` char(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_dt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_by` char(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `updated_dt` datetime(6) DEFAULT NULL,
  `deleted_dt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- store_note_dev1.store_type definition

CREATE TABLE `store_type` (
  `id` varchar(36) NOT NULL,
  `type` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `created_by` varchar(36) DEFAULT NULL,
  `created_dt` datetime DEFAULT NULL,
  `updated_by` varchar(36) DEFAULT NULL,
  `updated_dt` datetime DEFAULT NULL,
  `deleted_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- store_note_dev1.`user` definition

CREATE TABLE `user` (
  `user_id` varchar(36) COLLATE utf8mb4_general_ci NOT NULL,
  `fullname` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `image_url` text COLLATE utf8mb4_general_ci,
  `phone_number` int DEFAULT NULL,
  `created_by` varchar(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_dt` datetime DEFAULT NULL,
  `updated_by` varchar(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `updated_dt` datetime DEFAULT NULL,
  `deleted_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- store_note_dev1.user_password definition

CREATE TABLE `user_password` (
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) DEFAULT NULL,
  `hash_password` text,
  `password` varchar(255) DEFAULT NULL,
  `created_by` varchar(36) DEFAULT NULL,
  `created_dt` datetime DEFAULT NULL,
  `updated_by` varchar(36) DEFAULT NULL,
  `updated_dt` datetime DEFAULT NULL,
  `deleted_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- store_note_dev1.user_store definition

CREATE TABLE `user_store` (
  `id` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `store_id` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `created_by` char(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_dt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_by` char(36) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `updated_dt` datetime(6) DEFAULT NULL,
  `deleted_dt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;





