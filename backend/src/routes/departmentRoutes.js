import express from "express";

export default function departmentRoutes(db) {
  const router = express.Router();

  router.get("/department", (req, res) => {
    const q = "SELECT * FROM department";
    db.query(q, (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });

  router.get("/department-hr", (req, res) => {
    const q = "SELECT * FROM department";
    db.query(q, (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });

  router.post("/", (req, res) => {
    const q = "INSERT INTO department (Dept_ID,Dept_Name,Building,Branch_ID) VALUES (?)";
    const values = [req.body.Dept_ID, req.body.Dept_Name, req.body.Building, req.body.Branch_ID];

    db.query(q, [values], (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });

  router.put("/department/:Dept_ID", (req, res) => {
    const id = req.params.Dept_ID;
    const build = req.body.Building;
    const q = "UPDATE department SET `Building` = ? WHERE Dept_ID = ?";
    const values = [build, id];

    db.query(q, values, (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });

  router.delete("/department/:Dept_ID", (req, res) => {
    const id = req.params.Dept_ID;
    const q = "DELETE FROM department WHERE Dept_ID = ?";

    db.query(q, [id], (err) => {
      if (err) {
        return res.json(err);
      }
      return res.json("Book deleted successfully");
    });
  });

  router.get("/dept/:departmentId", (req, res) => {
    const id = req.params.departmentId;

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
            employee.Dept_ID = ?`;
    db.query(q, [id], (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });

  return router;
}
