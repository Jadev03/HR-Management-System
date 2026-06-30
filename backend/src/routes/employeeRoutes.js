import express from "express";

export default function employeeRoutes(db) {
  const router = express.Router();

  router.get("/employee", (req, res) => {
    const q = `
        SELECT
            employee.Employee_ID,
            employee.First_Name,
            employee.Last_Name,
            employee.NIC,
            employee.Date_Of_Birth,
            employee.Gender,
            employee.Tel_No,
            employee.Email,
            department.Dept_Name AS Department,
            employee.Maritial_Status,
            job_title.Title AS Title,
            employee.Paygrade_ID,
            employee.Status_ID,
            employee.Supervisor_ID
        FROM
            employee
        INNER JOIN
            department ON employee.Dept_Id = department.Dept_ID
        INNER JOIN
            job_title ON employee.Title_ID = job_title.Title_ID
        ORDER BY Employee_ID ASC;
    `;
    db.query(q, (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });

  router.post("/employee", async (req, res) => {
    try {
      const q = "INSERT INTO employee (Employee_ID, First_Name, Last_Name, NIC, Date_of_Birth, Gender, Tel_No, Email, Dept_ID, Maritial_Status, Title_ID, Paygrade_ID, Status_ID, Supervisor_ID) VALUES (?)";
      const values = [
        req.body.employee.Employee_ID,
        req.body.employee.First_Name,
        req.body.employee.Last_Name,
        req.body.employee.NIC,
        req.body.employee.Date_of_Birth,
        req.body.employee.Gender,
        req.body.employee.Tel_No,
        req.body.employee.Email,
        req.body.employee.Dept_ID,
        req.body.employee.Maritial_Status,
        req.body.employee.Title_ID,
        req.body.employee.Paygrade_ID,
        req.body.employee.Status_ID,
        req.body.employee.Supervisor_ID,
      ];

      await db.promise().query(q, [values]);

      for (const field in req.body.customFieldValue) {
        const key = field;
        const Emp_Id = req.body.employee.Employee_ID;
        const value = req.body.customFieldValue[field];

        const q1 = "INSERT INTO Employee_custom_field (Field_ID, Employee_ID, Field_val) VALUES (?)";
        const values1 = [key, Emp_Id, value];

        await db.promise().query(q1, [values1]);
      }

      res.json({ message: "Employee added successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to add the employee." });
    }
  });

  router.put("/employee/:Employee_ID", (req, res) => {
    const id = req.params.Employee_ID;
    const telNo = req.body.Tel_No;
    const deptID = req.body.Dept_ID;
    const titleID = req.body.Title_ID;
    const paygrade = req.body.Paygrade_ID;
    const status = req.body.Status_ID;
    const supervisor = req.body.Supervisor_ID;
    const q = "UPDATE employee SET `Tel_No` = ?, `Dept_ID` = ?, `Title_ID` = ?, `Paygrade_ID` = ?, `Status_ID` = ?, `Supervisor_ID` = ? WHERE Employee_ID = ?";
    const values = [telNo, deptID, titleID, paygrade, status, supervisor, id];

    db.query(q, values, (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });

  router.get("/branch", (req, res) => {
    const q = "SELECT * FROM branch";
    db.query(q, (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });

  router.get("/emergency_cont", (req, res) => {
    const q = "SELECT * FROM emergency_contact";
    db.query(q, (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });

  router.put("/emergency_cont/:Emerg_Contact_ID", (req, res) => {
    const id = req.params.Emerg_Contact_ID;
    const firstName = req.body.First_Name;
    const lastName = req.body.Last_Name;
    const telNo = req.body.Tel_No;
    const relationship = req.body.Relationship;
    const address = req.body.Address;
    const email = req.body.Email;
    const q = "UPDATE emergency_contact SET `First_Name` = ?, `Last_Name` = ?, `Tel_No` = ?, `Relationship` = ?, `Address` =?, `Email` =? WHERE Emerg_Contact_ID = ?";
    const values = [firstName, lastName, telNo, relationship, address, email, id];

    db.query(q, values, (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });

  router.get("/dependant_info", (req, res) => {
    const q = "SELECT * FROM dependent_info";
    db.query(q, (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });

  router.post("/dependant_info", (req, res) => {
    const q = "INSERT INTO dependent_info (Name, Employee_ID, Date_of_Birth, Relationship) VALUES (?) ";
    const values = [req.body.Name, req.body.Employee_ID, req.body.Date_of_Birth, req.body.Relationship];

    db.query(q, [values], (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });

  router.get("/personal-details", (req, res) => {
    res.send("Personal details route");
  });

  router.get("/personal-details/:employeeId", (req, res) => {
    const employeeId = req.params.employeeId;
    const q = "SELECT * FROM personal_aspect WHERE Employee_ID = ?";
    db.query(q, [employeeId], (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data[0]);
    });
  });

  router.get("/subordinate/:supervisor_ID", (req, res) => {
    const id = req.params.supervisor_ID;

    const q = "SELECT * from supervisor_aspect where Supervisor_ID = ?";
    db.query(q, [id], (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });

  return router;
}
