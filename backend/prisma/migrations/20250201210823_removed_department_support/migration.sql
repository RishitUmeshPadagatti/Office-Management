/*
  Warnings:

  - You are about to drop the `Department` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_dept_head_id_fkey";

-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_officeId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_departmentId_fkey";

-- DropTable
DROP TABLE "Department";
