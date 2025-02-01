-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_dept_head_id_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_officeId_fkey";

-- DropForeignKey
ALTER TABLE "Office" DROP CONSTRAINT "Office_asst_regional_manager_id_fkey";

-- DropForeignKey
ALTER TABLE "Office" DROP CONSTRAINT "Office_regional_manager_id_fkey";

-- AddForeignKey
ALTER TABLE "Office" ADD CONSTRAINT "Office_regional_manager_id_fkey" FOREIGN KEY ("regional_manager_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Office" ADD CONSTRAINT "Office_asst_regional_manager_id_fkey" FOREIGN KEY ("asst_regional_manager_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_dept_head_id_fkey" FOREIGN KEY ("dept_head_id") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "Office"("id") ON DELETE CASCADE ON UPDATE CASCADE;
