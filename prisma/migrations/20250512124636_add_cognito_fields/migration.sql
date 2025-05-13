/*
  Warnings:

  - You are about to drop the column `address` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `otpverification` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cognitoSub]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `otpverification` DROP FOREIGN KEY `OtpVerification_userId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `address`,
    DROP COLUMN `city`,
    DROP COLUMN `state`,
    ADD COLUMN `age` INTEGER NULL,
    ADD COLUMN `cognitoSub` VARCHAR(191) NULL,
    ADD COLUMN `emailVerified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `gender` VARCHAR(191) NULL,
    ADD COLUMN `phoneVerified` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `otpverification`;

-- CreateIndex
CREATE UNIQUE INDEX `User_cognitoSub_key` ON `User`(`cognitoSub`);
