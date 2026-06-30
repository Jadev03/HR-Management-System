# HR Management System API Documentation

This document describes the backend HTTP API exposed by the Express server.

## Base URL

- Local: `http://localhost:8800`

## Notes

- Content type: `application/json`
- Authentication: No token-based authentication middleware is currently enabled.
- Most endpoints return raw DB rows or simple status messages.

## Health/Root

### GET /

- Description: Service check endpoint.
- Response:
```json
"Welcome to Jupiter Apparels"
```

## Auth

### POST /login

- Description: Log in by user ID and password.
- Request body:
```json
{
  "User_ID": "U000001",
  "Password": "admin123"
}
```
- Success response:
```json
{
  "status": "Success",
  "role": "Admin",
  "EMP_id": "E000001"
}
```
- Other responses: `"User not found"`, `"Invalid"`, `"Error"`

### POST /userCreate

- Description: Create a new app user. Password is hashed with bcrypt.
- Request body:
```json
{
  "User_ID": "U000999",
  "Employee_ID": "E000001",
  "Access_level": "HR",
  "Password": "somePassword"
}
```
- Response: `"Success"` or `"Error"`

## Department

### GET /department

- Description: Get all departments.

### GET /department-hr

- Description: Get all departments (HR view).

### POST /

- Description: Create department.
- Request body:
```json
{
  "Dept_ID": "SL001D3",
  "Dept_Name": "New Department",
  "Building": "Building A",
  "Branch_ID": "SL001"
}
```

### PUT /department/:Dept_ID

- Description: Update department building.
- Request body:
```json
{
  "Building": "Building Z"
}
```

### DELETE /department/:Dept_ID

- Description: Delete department by ID.

### GET /dept/:departmentId

- Description: Get employees in a specific department.

## Employee and Related

### GET /employee

- Description: Get employee list with department and title joins.

### POST /employee

- Description: Create employee and optional custom field values.
- Request body:
```json
{
  "employee": {
    "Employee_ID": "E000090",
    "First_Name": "John",
    "Last_Name": "Doe",
    "NIC": "123456789V",
    "Date_of_Birth": "1995-01-01",
    "Gender": "Male",
    "Tel_No": "0771234567",
    "Email": "john@example.com",
    "Dept_ID": "SL001D1",
    "Maritial_Status": "Single",
    "Title_ID": "JT003",
    "Paygrade_ID": "L2",
    "Status_ID": "CON_FT",
    "Supervisor_ID": "E000037"
  },
  "customFieldValue": {
    "00001": "Sri Lankan",
    "00002": "English"
  }
}
```
- Success response:
```json
{
  "message": "Employee added successfully."
}
```

### PUT /employee/:Employee_ID

- Description: Update selected employee fields.
- Request body:
```json
{
  "Tel_No": "0770000000",
  "Dept_ID": "SL001D2",
  "Title_ID": "JT004",
  "Paygrade_ID": "L3",
  "Status_ID": "PERM",
  "Supervisor_ID": "E000037"
}
```

### GET /branch

- Description: Get branch list.

### GET /emergency_cont

- Description: Get emergency contacts.

### PUT /emergency_cont/:Emerg_Contact_ID

- Description: Update emergency contact.
- Request body:
```json
{
  "First_Name": "Jane",
  "Last_Name": "Doe",
  "Tel_No": "0711111111",
  "Relationship": "Sibling",
  "Address": "Colombo",
  "Email": "jane@example.com"
}
```

### GET /dependant_info

- Description: Get dependent info.

### POST /dependant_info

- Description: Add dependent info.
- Request body:
```json
{
  "Name": "Child Name",
  "Employee_ID": "E000001",
  "Date_of_Birth": "2015-01-01",
  "Relationship": "Child"
}
```

### GET /personal-details

- Description: Placeholder route.
- Response: `"Personal details route"`

### GET /personal-details/:employeeId

- Description: Get personal details view row for one employee.

### GET /subordinate/:supervisor_ID

- Description: Get subordinates for a supervisor.

## Leave

### GET /leave_request

- Description: Get leave requests.

### GET /leave_bal

- Description: Get leave balances.

### PUT /leave_bal/:Employee_ID

- Description: Update leave balance for employee.
- Request body:
```json
{
  "Annual": 20,
  "Casual": 10,
  "Maternity": 12,
  "No_pay": 50
}
```

### POST /request_leave

- Description: Create leave request; supervisor is auto-derived from employee record.
- Request body:
```json
{
  "Leave_Request_ID": 99,
  "Employee_ID": "E000040",
  "Start_Date": "2026-07-10",
  "End_Date": "2026-07-12",
  "Leave_Type": "Casual",
  "Status": "Pending",
  "Reason": "Personal",
  "Duration": "2",
  "Comments": "",
  "Supervisor_ID": "ignored"
}
```

### PUT /leave_request_takeaction/:Employee_ID

- Description: Update leave request status/comments by employee ID.
- Request body:
```json
{
  "Status": "Approved",
  "Comments": "Enjoy"
}
```

### GET /ra_leaves/:employeeId

- Description: Get leave requests assigned to supervisor (`supervisor_ID`).

## Job and Paygrade

### GET /paygrade

- Description: Get pay grade list.

### PUT /paygrade/:Paygrade_ID

- Description: Update allowances and description.
- Request body:
```json
{
  "Annual_Leave_Allowance": 25,
  "Casual_Leave_Allowance": 12,
  "Maternity_Leave_Allowance": 14,
  "NO_pay_Allowance": 50,
  "Description": "Mid-level employees"
}
```

### GET /paygrade/:paygrade_ID

- Description: Get employees by paygrade.

### GET /job

- Description: Get job titles.

### POST /job

- Description: Add job title.
- Request body:
```json
{
  "Title_ID": "JT099",
  "Title": "New Role"
}
```

### GET /jobreport/:jobTitleId

- Description: Get employees by job title.

## Reports and Custom Fields

### GET /leavebal/?departmentId=:id&startDate=:yyyy-mm-dd&endDate=:yyyy-mm-dd

- Description: Leave report by department and date range.

### GET /custom_report/:EmployeeID

- Description: Get custom field values for employee.

### POST /add-custom-field

- Description: Create custom field definition.
- Request body:
```json
{
  "Field_ID": "00010",
  "Field_name": "Skill"
}
```

### GET /add-custom-field

- Description: Get all custom field definitions.

### POST /add-custom-field/:employeeId

- Description: Assign custom field value to employee.
- Request body:
```json
{
  "fieldId": "00010",
  "fieldVal": "React"
}
```

## Error Behavior

- Most endpoints return DB errors directly with `res.json(err)`.
- Some endpoints return custom JSON error messages.
- HTTP status codes are mostly `200`, except specific cases where `500` is used in custom field and employee creation handlers.
