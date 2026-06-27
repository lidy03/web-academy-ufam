/*
  Warnings:

  - You are about to drop the column `data_criacao` on the `Conexao` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Conexao` DROP COLUMN `data_criacao`,
    ADD COLUMN `data_conexao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
