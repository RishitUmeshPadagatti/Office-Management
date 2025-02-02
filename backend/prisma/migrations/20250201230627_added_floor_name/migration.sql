/*
  Warnings:

  - Added the required column `name` to the `Floor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Floor" ADD COLUMN     "name" TEXT NOT NULL;
