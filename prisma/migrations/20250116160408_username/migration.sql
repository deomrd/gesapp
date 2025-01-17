/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Utilisateurs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Utilisateurs_username_key` ON `Utilisateurs`(`username`);
