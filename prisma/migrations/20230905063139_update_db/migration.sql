-- DropForeignKey
ALTER TABLE `Entry` DROP FOREIGN KEY `Entry_categoryExpenseId_fkey`;

-- DropForeignKey
ALTER TABLE `Entry` DROP FOREIGN KEY `Entry_categoryIncomeId_fkey`;

-- AlterTable
ALTER TABLE `Entry` MODIFY `categoryExpenseId` INTEGER NULL,
    MODIFY `categoryIncomeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Entry` ADD CONSTRAINT `Entry_categoryExpenseId_fkey` FOREIGN KEY (`categoryExpenseId`) REFERENCES `CategoryExpense`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Entry` ADD CONSTRAINT `Entry_categoryIncomeId_fkey` FOREIGN KEY (`categoryIncomeId`) REFERENCES `CategoryIncome`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Entry` ADD CONSTRAINT `Entry_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
