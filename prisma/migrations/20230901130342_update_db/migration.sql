/*
  Warnings:

  - Added the required column `currency` to the `Travel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Travel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Travel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Travel` ADD COLUMN `currency` INTEGER NOT NULL,
    ADD COLUMN `endDate` DATETIME(3) NOT NULL,
    ADD COLUMN `startDate` DATETIME(3) NOT NULL;
