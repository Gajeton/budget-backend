/*
  Warnings:

  - You are about to drop the column `assignedAt` on the `TravelDestination` table. All the data in the column will be lost.
  - You are about to drop the column `assignedBy` on the `TravelDestination` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `TravelDestination` DROP COLUMN `assignedAt`,
    DROP COLUMN `assignedBy`;
