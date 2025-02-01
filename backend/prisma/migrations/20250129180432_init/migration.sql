-- CreateTable
CREATE TABLE "Office" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "regional_manager_id" INTEGER NOT NULL,
    "asst_regional_manager_id" INTEGER NOT NULL,

    CONSTRAINT "Office_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "officeId" INTEGER NOT NULL,
    "dept_head_id" INTEGER NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" BIGINT NOT NULL,
    "roleId" INTEGER NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "officeId" INTEGER NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Office_regional_manager_id_key" ON "Office"("regional_manager_id");

-- CreateIndex
CREATE UNIQUE INDEX "Office_asst_regional_manager_id_key" ON "Office"("asst_regional_manager_id");

-- CreateIndex
CREATE UNIQUE INDEX "Department_dept_head_id_key" ON "Department"("dept_head_id");

-- AddForeignKey
ALTER TABLE "Office" ADD CONSTRAINT "Office_regional_manager_id_fkey" FOREIGN KEY ("regional_manager_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Office" ADD CONSTRAINT "Office_asst_regional_manager_id_fkey" FOREIGN KEY ("asst_regional_manager_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "Office"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_dept_head_id_fkey" FOREIGN KEY ("dept_head_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "Office"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
