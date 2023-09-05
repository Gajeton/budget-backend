-- CreateTable
CREATE TABLE `TravelCategoryExpense` (
    `travelId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,

    PRIMARY KEY (`travelId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TravelCategoryIncome` (
    `travelId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,

    PRIMARY KEY (`travelId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TravelCategoryExpense` ADD CONSTRAINT `TravelCategoryExpense_travelId_fkey` FOREIGN KEY (`travelId`) REFERENCES `Travel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelCategoryExpense` ADD CONSTRAINT `TravelCategoryExpense_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `CategoryExpense`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelCategoryIncome` ADD CONSTRAINT `TravelCategoryIncome_travelId_fkey` FOREIGN KEY (`travelId`) REFERENCES `Travel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TravelCategoryIncome` ADD CONSTRAINT `TravelCategoryIncome_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `CategoryIncome`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
