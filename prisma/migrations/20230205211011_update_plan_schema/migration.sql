/*
  Warnings:

  - You are about to drop the column `host` on the `plan` table. All the data in the column will be lost.
  - You are about to alter the column `saving_frequency` on the `plan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - Added the required column `hostId` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `plan` DROP COLUMN `host`,
    ADD COLUMN `hostId` VARCHAR(191) NOT NULL,
    MODIFY `saving_frequency` ENUM('DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY') NOT NULL;

-- AddForeignKey
ALTER TABLE `Plan` ADD CONSTRAINT `Plan_hostId_fkey` FOREIGN KEY (`hostId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
