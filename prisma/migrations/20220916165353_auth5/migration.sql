/*
  Warnings:

  - You are about to drop the column `mainPhoto` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `mainPhoto`,
    ADD COLUMN `image` VARCHAR(191) NULL;
