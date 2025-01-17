/*
  Warnings:

  - You are about to drop the `utilisateur` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `refreshtoken` DROP FOREIGN KEY `RefreshToken_idUtilisateur_fkey`;

-- DropIndex
DROP INDEX `RefreshToken_idUtilisateur_fkey` ON `refreshtoken`;

-- DropTable
DROP TABLE `utilisateur`;

-- CreateTable
CREATE TABLE `Utilisateurs` (
    `idUtilisateur` INTEGER NOT NULL AUTO_INCREMENT,
    `nomUtilisateur` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `statut` BOOLEAN NULL,

    PRIMARY KEY (`idUtilisateur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RefreshToken` ADD CONSTRAINT `RefreshToken_idUtilisateur_fkey` FOREIGN KEY (`idUtilisateur`) REFERENCES `Utilisateurs`(`idUtilisateur`) ON DELETE RESTRICT ON UPDATE CASCADE;
