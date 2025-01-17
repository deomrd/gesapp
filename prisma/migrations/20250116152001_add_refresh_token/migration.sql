-- CreateTable
CREATE TABLE `achats` (
    `idAchat` INTEGER NOT NULL AUTO_INCREMENT,
    `idProduit` INTEGER NOT NULL,
    `dateAchat` DATE NOT NULL DEFAULT (curdate()),
    `quantiteAchat` INTEGER NOT NULL,
    `statut` BOOLEAN NULL DEFAULT true,

    INDEX `idProduit`(`idProduit`),
    PRIMARY KEY (`idAchat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clients` (
    `idClient` INTEGER NOT NULL AUTO_INCREMENT,
    `nomClient` VARCHAR(255) NOT NULL,
    `phoneClient` VARCHAR(20) NOT NULL,
    `emailClient` VARCHAR(255) NULL,
    `typeClient` ENUM('particulier', 'entreprise') NOT NULL,
    `statut` BOOLEAN NULL DEFAULT true,

    UNIQUE INDEX `emailClient`(`emailClient`),
    PRIMARY KEY (`idClient`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `factures` (
    `idFacture` INTEGER NOT NULL AUTO_INCREMENT,
    `idClient` INTEGER NOT NULL,
    `dateFacture` DATE NOT NULL DEFAULT (curdate()),
    `heureFacture` TIME(0) NOT NULL DEFAULT (curtime()),
    `statut` BOOLEAN NULL DEFAULT true,

    INDEX `idClient`(`idClient`),
    PRIMARY KEY (`idFacture`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fournisseurs` (
    `idFournisseur` INTEGER NOT NULL AUTO_INCREMENT,
    `nomFournisseur` VARCHAR(255) NOT NULL,
    `phoneFournisseur` VARCHAR(20) NOT NULL,
    `AdresseFournisseur` TEXT NULL,
    `email` VARCHAR(255) NULL,
    `type` ENUM('local', 'international') NOT NULL,
    `statut` BOOLEAN NULL DEFAULT true,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`idFournisseur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produits` (
    `idProduit` INTEGER NOT NULL AUTO_INCREMENT,
    `nomProduit` VARCHAR(255) NOT NULL,
    `prixProduit` DECIMAL(10, 2) NOT NULL,
    `dateExpiration` DATE NULL,
    `stock` INTEGER NULL DEFAULT 0,
    `id_fournisseur` INTEGER NULL,
    `statut` BOOLEAN NULL DEFAULT true,

    INDEX `id_fournisseur`(`id_fournisseur`),
    PRIMARY KEY (`idProduit`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sorties` (
    `idSortie` INTEGER NOT NULL AUTO_INCREMENT,
    `idProduit` INTEGER NOT NULL,
    `quantite` INTEGER NOT NULL,
    `prixUnitaire` DECIMAL(10, 2) NOT NULL,
    `prixTotal` DECIMAL(10, 2) NOT NULL,
    `idFacture` INTEGER NOT NULL,
    `statut` BOOLEAN NULL DEFAULT true,

    INDEX `idFacture`(`idFacture`),
    INDEX `idProduit`(`idProduit`),
    PRIMARY KEY (`idSortie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Utilisateur` (
    `idUtilisateur` INTEGER NOT NULL AUTO_INCREMENT,
    `nomUtilisateur` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `statut` BOOLEAN NULL,

    PRIMARY KEY (`idUtilisateur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RefreshToken` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUtilisateur` INTEGER NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `achats` ADD CONSTRAINT `achats_ibfk_1` FOREIGN KEY (`idProduit`) REFERENCES `produits`(`idProduit`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `factures` ADD CONSTRAINT `factures_ibfk_1` FOREIGN KEY (`idClient`) REFERENCES `clients`(`idClient`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `produits` ADD CONSTRAINT `produits_ibfk_1` FOREIGN KEY (`id_fournisseur`) REFERENCES `fournisseurs`(`idFournisseur`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sorties` ADD CONSTRAINT `sorties_ibfk_1` FOREIGN KEY (`idProduit`) REFERENCES `produits`(`idProduit`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sorties` ADD CONSTRAINT `sorties_ibfk_2` FOREIGN KEY (`idFacture`) REFERENCES `factures`(`idFacture`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RefreshToken` ADD CONSTRAINT `RefreshToken_idUtilisateur_fkey` FOREIGN KEY (`idUtilisateur`) REFERENCES `Utilisateur`(`idUtilisateur`) ON DELETE RESTRICT ON UPDATE CASCADE;
