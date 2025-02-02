/*
  Warnings:

  - You are about to drop the column `roleId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoleOptions" AS ENUM ('REGIONAL_MANAGER', 'ASST_REGIONAL_MANAGER', 'SALES_HEAD', 'SALES_ASSOCIATE', 'FINANCE_HEAD', 'FINANCE_ANALYST', 'SECURITY_OFFICER', 'JANITOR', 'RECEPTIONIST');

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_roleId_fkey";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "roleId",
ADD COLUMN     "role" "RoleOptions" NOT NULL;

-- DropTable
DROP TABLE "Role";
