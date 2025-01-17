/*
  Warnings:

  - You are about to drop the column `AdresseFournisseur` on the `fournisseurs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `fournisseurs` DROP COLUMN `AdresseFournisseur`,
    ADD COLUMN `adresseFournisseur` TEXT NULL;
