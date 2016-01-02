USE epo_orders;

ALTER TABLE `orders` DROP FOREIGN KEY `orders_fk0`;

ALTER TABLE `order_items` DROP FOREIGN KEY `order_items_fk0`;

ALTER TABLE `order_items` DROP FOREIGN KEY `order_items_fk1`;

ALTER TABLE `donations` DROP FOREIGN KEY `donations_fk0`;

DROP TABLE IF EXISTS `patrons`;

DROP TABLE IF EXISTS `orders`;

DROP TABLE IF EXISTS `order_items`;

DROP TABLE IF EXISTS `items`;

DROP TABLE IF EXISTS `donations`;
