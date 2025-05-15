/*
  Warnings:

  - You are about to drop the `tbl_teste` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `tbl_teste`;

-- CreateTable
CREATE TABLE `tbl_jogo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(80) NOT NULL,
    `data_lancamento` DATE NOT NULL,
    `versao` VARCHAR(10) NOT NULL,
    `tamanho` VARCHAR(10) NULL,
    `descricao` TEXT NULL,
    `foto_capa` VARCHAR(200) NULL,
    `link` VARCHAR(200) NOT NULL,
    `foto_banner` VARCHAR(200) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_cidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cidade` VARCHAR(145) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_estado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uf` VARCHAR(2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_faixa_etaria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `classificacao` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_genero` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_multiplayer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `modo_jogo` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_pais` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pais` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_plataforma` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `ano_lancamento` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_empresa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `site` VARCHAR(45) NULL,
    `descricao` TEXT NULL,
    `data_fundacao` DATE NOT NULL,
    `email_contato` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_telefone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `telefone` VARCHAR(45) NULL,
    `id_empresa` INTEGER NOT NULL,

    INDEX `fk_telefone_empresa`(`id_empresa`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_telefone` ADD CONSTRAINT `fk_telefone_empresa` FOREIGN KEY (`id_empresa`) REFERENCES `tbl_empresa`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
