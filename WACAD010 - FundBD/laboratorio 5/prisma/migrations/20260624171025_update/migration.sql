/*
  Warnings:

  - You are about to drop the column `criadorId` on the `Grupo` table. All the data in the column will be lost.
  - You are about to alter the column `nome` on the `Grupo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - You are about to alter the column `descricao` on the `Grupo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - You are about to drop the column `grupoId` on the `Membros_Grupo` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `Membros_Grupo` table. All the data in the column will be lost.
  - You are about to alter the column `nome` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `interesse` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - You are about to alter the column `cidade` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - You are about to alter the column `estado` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(2)`.
  - You are about to alter the column `pais` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - A unique constraint covering the columns `[usuario_id,grupo_id]` on the table `Membros_Grupo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `criador_id` to the `Grupo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grupo_id` to the `Membros_Grupo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario_id` to the `Membros_Grupo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Grupo` DROP FOREIGN KEY `Grupo_criadorId_fkey`;

-- DropForeignKey
ALTER TABLE `Membros_Grupo` DROP FOREIGN KEY `Membros_Grupo_grupoId_fkey`;

-- DropForeignKey
ALTER TABLE `Membros_Grupo` DROP FOREIGN KEY `Membros_Grupo_usuarioId_fkey`;

-- DropIndex
DROP INDEX `Grupo_criadorId_fkey` ON `Grupo`;

-- DropIndex
DROP INDEX `Membros_Grupo_grupoId_fkey` ON `Membros_Grupo`;

-- DropIndex
DROP INDEX `Membros_Grupo_usuarioId_fkey` ON `Membros_Grupo`;

-- AlterTable
ALTER TABLE `Grupo` DROP COLUMN `criadorId`,
    ADD COLUMN `criador_id` INTEGER NOT NULL,
    MODIFY `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `nome` VARCHAR(45) NOT NULL,
    MODIFY `descricao` VARCHAR(45) NOT NULL;

-- AlterTable
ALTER TABLE `Membros_Grupo` DROP COLUMN `grupoId`,
    DROP COLUMN `usuarioId`,
    ADD COLUMN `grupo_id` INTEGER NOT NULL,
    ADD COLUMN `usuario_id` INTEGER NOT NULL,
    MODIFY `data_entrada` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Usuario` MODIFY `nome` VARCHAR(50) NOT NULL,
    MODIFY `interesse` VARCHAR(45) NOT NULL,
    MODIFY `bio` VARCHAR(200) NOT NULL,
    MODIFY `data_nascimento` DATE NOT NULL,
    MODIFY `cidade` VARCHAR(45) NOT NULL,
    MODIFY `estado` CHAR(2) NOT NULL,
    MODIFY `pais` VARCHAR(45) NOT NULL;

-- CreateTable
CREATE TABLE `Conexao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `usuario_id` INTEGER NOT NULL,
    `amigo_id` INTEGER NOT NULL,

    UNIQUE INDEX `Conexao_usuario_id_amigo_id_key`(`usuario_id`, `amigo_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Postagem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_hora` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `conteudo` TEXT NOT NULL,
    `usuario_id` INTEGER NOT NULL,
    `grupo_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Midia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(45) NOT NULL,
    `tipo` VARCHAR(45) NOT NULL,
    `postagem_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comentario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `conteudo` VARCHAR(140) NOT NULL,
    `data_hora` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `usuario_id` INTEGER NOT NULL,
    `postagem_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Curtida` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postagem_id` INTEGER NOT NULL,
    `usuario_id` INTEGER NOT NULL,

    UNIQUE INDEX `Curtida_usuario_id_postagem_id_key`(`usuario_id`, `postagem_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mensagem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_hora` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `conteudo` TEXT NOT NULL,
    `usuario_id` INTEGER NOT NULL,
    `conversa_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Conversa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tipo` ENUM('privada', 'grupo') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Membro_Conversa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_id` INTEGER NOT NULL,
    `conversa_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Membros_Grupo_usuario_id_grupo_id_key` ON `Membros_Grupo`(`usuario_id`, `grupo_id`);

-- AddForeignKey
ALTER TABLE `Conexao` ADD CONSTRAINT `Conexao_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conexao` ADD CONSTRAINT `Conexao_amigo_id_fkey` FOREIGN KEY (`amigo_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grupo` ADD CONSTRAINT `Grupo_criador_id_fkey` FOREIGN KEY (`criador_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Membros_Grupo` ADD CONSTRAINT `Membros_Grupo_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Membros_Grupo` ADD CONSTRAINT `Membros_Grupo_grupo_id_fkey` FOREIGN KEY (`grupo_id`) REFERENCES `Grupo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Postagem` ADD CONSTRAINT `Postagem_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Postagem` ADD CONSTRAINT `Postagem_grupo_id_fkey` FOREIGN KEY (`grupo_id`) REFERENCES `Grupo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Midia` ADD CONSTRAINT `Midia_postagem_id_fkey` FOREIGN KEY (`postagem_id`) REFERENCES `Postagem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comentario` ADD CONSTRAINT `Comentario_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comentario` ADD CONSTRAINT `Comentario_postagem_id_fkey` FOREIGN KEY (`postagem_id`) REFERENCES `Postagem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Curtida` ADD CONSTRAINT `Curtida_postagem_id_fkey` FOREIGN KEY (`postagem_id`) REFERENCES `Postagem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Curtida` ADD CONSTRAINT `Curtida_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mensagem` ADD CONSTRAINT `Mensagem_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mensagem` ADD CONSTRAINT `Mensagem_conversa_id_fkey` FOREIGN KEY (`conversa_id`) REFERENCES `Conversa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Membro_Conversa` ADD CONSTRAINT `Membro_Conversa_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Membro_Conversa` ADD CONSTRAINT `Membro_Conversa_conversa_id_fkey` FOREIGN KEY (`conversa_id`) REFERENCES `Conversa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
