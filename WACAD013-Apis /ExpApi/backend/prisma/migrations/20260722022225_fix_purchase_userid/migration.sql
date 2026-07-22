/*
  Warnings:

  - You are about to alter the column `userId` on the `Purchase` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(36)`.

*/
-- DropForeignKey
ALTER TABLE `Purchase` DROP FOREIGN KEY `Purchase_userId_fkey`;

-- DropIndex
DROP INDEX `Purchase_userId_fkey` ON `Purchase`;

-- AlterTable
ALTER TABLE `Purchase` MODIFY `userId` CHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE `Purchase` ADD CONSTRAINT `Purchase_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
