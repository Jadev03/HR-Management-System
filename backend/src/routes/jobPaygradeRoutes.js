import express from "express";

export default function jobPaygradeRoutes(db) {
  const router = express.Router();

  router.get("/paygrade", (req, res) => {
    const q = "SELECT * FROM pay_grade";
    db.query(q, (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });

  router.put("/paygrade/:Paygrade_ID", (req, res) => {
    const id = req.params.Paygrade_ID;
    const anual = req.body.Annual_Leave_Allowance;
    const casual = req.body.Casual_Leave_Allowance;
    const maternity = req.body.Maternity_Leave_Allowance;
    const no_pay = req.body.NO_pay_Allowance;
    const desc = req.body.Description;
    const q = "UPDATE pay_grade SET `Annual_Leave_Allowance` = ?, `Casual_Leave_Allowance` = ?, `Maternity_Leave_Allowance` = ?, `NO_pay_Allowance` = ?, `Description` = ? WHERE Paygrade_ID = ?";
    const values = [anual, casual, maternity, no_pay, desc, id];

    db.query(q, values, (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });

  router.get("/paygrade/:paygrade_ID", (req, res) => {
    const id = req.params.paygrade_ID;

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
            employee.Status_ID,
            employee.Supervisor_ID
            FROM
            employee
            INNER JOIN
            job_title ON employee.Title_ID = job_title.Title_ID
            INNER JOIN
            department ON employee.Dept_ID = department.Dept_ID
            WHERE
            employee.Paygrade_ID = ?`;
    db.query(q, [id], (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });

  router.get("/job", (req, res) => {
    const q = "SELECT * FROM job_title";
    db.query(q, (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });

  router.post("/job", (req, res) => {
    const q = "INSERT INTO job_title (Title_ID,Title) VALUES (?)";
    const values = [req.body.Title_ID, req.body.Title];

    db.query(q, [values], (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });

  router.get("/jobreport/:jobTitleId", (req, res) => {
    const id = req.params.jobTitleId;

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
            job_title ON employee.Title_ID = job_title.Title_ID
            INNER JOIN
            department ON employee.Dept_ID = department.Dept_ID
            WHERE
            employee.Title_ID = ?`;
    db.query(q, [id], (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });

  return router;
}
