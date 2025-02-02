const serverLocation = "http://localhost:3000"

// auth
export const adminLoginAddress = `${serverLocation}/auth/login-admin`
export const employeeLoginAddress = `${serverLocation}/auth/login-employee`

// upload
export const avatarUploadAddress = `${serverLocation}/upload/image`

// admin
export const createEmployeeAddress = `${serverLocation}/admin/create-employee` // POST
export const getAllOfficesAddress = `${serverLocation}/admin/list-all-offices` // POST
export const createNewOfficeAddress = `${serverLocation}/admin/create-office`  // POST
export const employeeToRegionalManager = `${serverLocation}/admin/normal-employee-to-regional-manager` // POST
export const employeeToAsstRegionalManager = `${serverLocation}/admin/normal-employee-to-asst-regional-manager` // POST

// general
export const searchAllEmployee = `${serverLocation}/general/search-all-employees` // GET, Query Parameters

// dashboard
export const numberOfOfficesAddress = `${serverLocation}/dashboard/number-of-offices`
export const numberOfEmployeesAddress = `${serverLocation}/dashboard/number-of-employees`