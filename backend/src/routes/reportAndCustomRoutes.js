import express from "express";

export default function reportAndCustomRoutes(db) {
  const router = express.Router();

  router.get("/leavebal/", (req, res) => {
    const id = req.query.departmentId;
    const fromDate = req.query.startDate;
    const toDate = req.query.endDate;

    const q = `
        SELECT *
            FROM
            leave_request
            INNER JOIN
            employee ON employee.Employee_ID = leave_request.Employee_ID
            INNER JOIN
            department ON employee.Dept_ID = department.Dept_ID
            WHERE
            employee.Dept_ID = ? AND Start_Date BETWEEN ? AND ?`;

    db.query(q, [id, fromDate, toDate], (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });

  router.get("/custom_report/:EmployeeID", (req, res) => {
    const id = req.params.EmployeeID;

    const q = `
        SELECT
        field_name,
        field_val
        from
        custom_field_aspect
        where Employee_ID = ?`;
    db.query(q, [id], (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });

  router.post("/add-custom-field", (req, res) => {
    const { Field_ID, Field_name } = req.body;

    const q = "INSERT INTO custom_field (Field_ID, Field_name) VALUES (?, ?)";
    db.query(q, [Field_ID, Field_name], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to add custom field." });
      }
      return res.json({ message: "Custom field added successfully." });
    });
  });

  router.get("/add-custom-field", (req, res) => {
    const q = "select * from custom_field";
    db.query(q, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to add custom field." });
      }
      return res.json(data);
    });
  });

  router.post("/add-custom-field/:employeeId", (req, res) => {
    const employeeId = req.params.employeeId;
    const { fieldId, fieldVal } = req.body;

    const q = "INSERT INTO Employee_custom_field (Field_ID, Employee_ID, Field_val) VALUES (?, ?, ?)";
    db.query(q, [fieldId, employeeId, fieldVal], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to add custom field." });
      }
      return res.json({ message: "Custom field added successfully." });
    });
  });

  return router;
}
