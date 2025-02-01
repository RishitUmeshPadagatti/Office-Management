/*
  Warnings:

  - Added the required column `workModel` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WorkModelOption" AS ENUM ('in_office', 'hybrid', 'remote');

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "workModel" "WorkModelOption" NOT NULL;

-- CreateTable
CREATE TABLE "Floor" (
    "id" SERIAL NOT NULL,
    "officeId" INTEGER NOT NULL,

    CONSTRAINT "Floor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Desk" (
    "id" SERIAL NOT NULL,
    "floorId" INTEGER NOT NULL,
    "occupiedById" INTEGER,

    CONSTRAINT "Desk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cabin" (
    "id" SERIAL NOT NULL,
    "floorId" INTEGER NOT NULL,
    "occupiedById" INTEGER,

    CONSTRAINT "Cabin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Desk_occupiedById_key" ON "Desk"("occupiedById");

-- CreateIndex
CREATE UNIQUE INDEX "Cabin_occupiedById_key" ON "Cabin"("occupiedById");

-- AddForeignKey
ALTER TABLE "Floor" ADD CONSTRAINT "Floor_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "Office"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Desk" ADD CONSTRAINT "Desk_floorId_fkey" FOREIGN KEY ("floorId") REFERENCES "Floor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Desk" ADD CONSTRAINT "Desk_occupiedById_fkey" FOREIGN KEY ("occupiedById") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cabin" ADD CONSTRAINT "Cabin_floorId_fkey" FOREIGN KEY ("floorId") REFERENCES "Floor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cabin" ADD CONSTRAINT "Cabin_occupiedById_fkey" FOREIGN KEY ("occupiedById") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
