CREATE TABLE daily_customer_shop (
    id VARCHAR(36) PRIMARY KEY,
    product_id VARCHAR(36),
    code_transaction INT,
    quantity INT,
    total_price DECIMAL(10,2),
    daily_note_id VARCHAR(36),
    created_by VARCHAR(36),
    created_dt DATETIME,
    updated_by VARCHAR(36),
    updated_dt DATETIME,
    deleted_dt DATETIME
);

CREATE TABLE categories (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    created_by VARCHAR(36),
    created_dt DATETIME,
    updated_by VARCHAR(36),
    updated_dt DATETIME,
    deleted_dt DATETIME
);

CREATE TABLE unit (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    created_by VARCHAR(36),
    created_dt DATETIME,
    updated_by VARCHAR(36),
    updated_dt DATETIME,
    deleted_dt DATETIME
);

CREATE TABLE products (
    id VARCHAR(36) PRIMARY KEY,
    product_name VARCHAR(255),
    price DECIMAL(10,2),
    quantity INT,
    description TEXT,
    unit_id VARCHAR(255),
    category_id VARCHAR(36),
    created_by VARCHAR(36),
    created_dt DATETIME,
    updated_by VARCHAR(36),
    updated_dt DATETIME,
    deleted_dt DATETIME
);

CREATE TABLE shoping (
    id VARCHAR(36) PRIMARY KEY,
    code_transaction INT,
    product_id VARCHAR(255),
    quantity INT,
    total_price DECIMAL(10,2),
    daily_note_id VARCHAR(36),
    created_by VARCHAR(36),
    created_dt DATETIME,
    updated_by VARCHAR(36),
    updated_dt DATETIME,
    deleted_dt DATETIME
);

CREATE TABLE daily_note (
    id VARCHAR(36) PRIMARY KEY,
    total_daily_customer_shop INT,
    total_shoping INT,
    modal DECIMAL(10,2),
    saldo DECIMAL(10,2),
    store_id VARCHAR(36),
    created_by VARCHAR(36),
    created_dt DATETIME,
    updated_by VARCHAR(36),
    updated_dt DATETIME,
    deleted_dt DATETIME
);

CREATE TABLE user (
    user_id VARCHAR(36) PRIMARY KEY,
    fullname VARCHAR(255),
    email VARCHAR(255),
    image_url TEXT,
    phone_number INT,
    created_by VARCHAR(36),
    created_dt DATETIME,
    updated_by VARCHAR(36),
    updated_dt DATETIME,
    deleted_dt DATETIME
);

CREATE TABLE user_password (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    hash_password TEXT,
    password VARCHAR(255),
    created_by VARCHAR(36),
    created_dt DATETIME,
    updated_by VARCHAR(36),
    updated_dt DATETIME,
    deleted_dt DATETIME
);

CREATE TABLE store (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255),
    store_image_url TEXT,
    description TEXT,
    created_by VARCHAR(36),
    created_dt DATETIME,
    updated_by VARCHAR(36),
    updated_dt DATETIME,
    deleted_dt DATETIME
);

CREATE TABLE user_store (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    store_id VARCHAR(36),
    created_by VARCHAR(36),
    created_dt DATETIME,
    updated_by VARCHAR(36),
    updated_dt DATETIME,
    deleted_dt DATETIME
);

CREATE TABLE product_store (
    id VARCHAR(36) PRIMARY KEY,
    product_id VARCHAR(36),
    store_id VARCHAR(36),
    created_by VARCHAR(36),
    created_dt DATETIME,
    updated_by VARCHAR(36),
    updated_dt DATETIME,
    deleted_dt DATETIME
);

CREATE TABLE store_type (
    id VARCHAR(36) PRIMARY KEY,
    type INT,
    name VARCHAR(255),
    description TEXT,
    created_by VARCHAR(36),
    created_dt DATETIME,
    updated_by VARCHAR(36),
    updated_dt DATETIME,
    deleted_dt DATETIME
);