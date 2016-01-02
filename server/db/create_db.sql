CREATE DATABASE epo_orders;

USE epo_orders;

CREATE TABLE `patrons` (
  `patron_number` varchar(5) NOT NULL UNIQUE,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `address` varchar(90) NOT NULL,
  `apartment` varchar(12) NOT NULL,
  `city` varchar(30) NOT NULL,
  `province` varchar(2) NOT NULL,
  `postal_code` varchar(7) NOT NULL,
  `email` varchar(60) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `contact` varchar(1) NOT NULL,
  PRIMARY KEY (`patron_number`)
);

CREATE TABLE `orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `patron_number` varchar(5) NOT NULL,
  `order_type` varchar(20) NOT NULL,
  `date_purchased` DATE NOT NULL,
  `date_sent` DATE NOT NULL,
  `notes` varchar(255) NOT NULL,
  `payment_received` BOOLEAN NOT NULL,
  `confirmation_sent` BOOLEAN NOT NULL,
  `new` BOOLEAN NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `order_items` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `item_sku` varchar(15) NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `items` (
  `sku` varchar(20) NOT NULL UNIQUE,
  `season` varchar(10) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` FLOAT NOT NULL,
  PRIMARY KEY (`sku`)
);

CREATE TABLE `donations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `amount` FLOAT NOT NULL,
  PRIMARY KEY (`id`)
);

ALTER TABLE `orders` ADD CONSTRAINT `orders_fk0` FOREIGN KEY (`patron_number`) REFERENCES `patrons`(`patron_number`);

ALTER TABLE `order_items` ADD CONSTRAINT `order_items_fk0` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`);

ALTER TABLE `order_items` ADD CONSTRAINT `order_items_fk1` FOREIGN KEY (`item_sku`) REFERENCES `items`(`sku`);

ALTER TABLE `donations` ADD CONSTRAINT `donations_fk0` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`);
