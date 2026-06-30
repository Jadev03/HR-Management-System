import express from "express";

export default function leaveRoutes(db) {
  const router = express.Router();

  router.get("/leave_request", (req, res) => {
    const q = "SELECT * FROM leave_request";
    db.query(q, (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });

  router.get("/leave_bal", (req, res) => {
    const q = "SELECT * FROM leave_balance";
    db.query(q, (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });

  router.put("/leave_bal/:Employee_ID", (req, res) => {
    const id = req.params.Employee_ID;
    const anual = req.body.Annual;
    const casual = req.body.Casual;
    const maternity = req.body.Maternity;
    const no_pay = req.body.No_pay;
    const q = "UPDATE leave_balance SET `Annual` = ?, `Casual` = ?, `Maternity` = ?, `No_pay` = ? WHERE Employee_ID = ?";
    const values = [anual, casual, maternity, no_pay, id];

    db.query(q, values, (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });

  router.post("/request_leave", (req, res) => {
    const supervisorQuery = "SELECT Supervisor_ID FROM employee WHERE Employee_ID = ?";
    db.query(supervisorQuery, [req.body.Employee_ID], (err, results) => {
      if (err) {
        return res.json(err);
      }

      if (results.length === 0) {
        return res.json({ error: "Employee not found" });
      }

      const supervisorID = results[0].Supervisor_ID;

      const leaveRequestQuery = "INSERT INTO leave_request (Leave_Request_ID,Employee_ID, Start_Date, End_Date, Leave_Type, Status, Reason, Duration, Comments,Supervisor_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const leaveRequestValues = [req.body.Leave_Request_ID, req.body.Employee_ID, req.body.Start_Date, req.body.End_Date, req.body.Leave_Type, req.body.Status, req.body.Reason, req.body.Duration, req.body.Comments, supervisorID];

      db.query(leaveRequestQuery, leaveRequestValues, (leaveErr, data) => {
        if (leaveErr) {
          return res.json(leaveErr);
        }
        return res.json(data);
      });
    });
  });

  router.put("/leave_request_takeaction/:Employee_ID", (req, res) => {
    const id = req.params.Employee_ID;
    const stat = req.body.Status;
    const comm = req.body.Comments;
    const q = "UPDATE leave_request SET `Status` = ?, `Comments` = ? WHERE Employee_ID = ?";
    const values = [stat, comm, id];

    db.query(q, values, (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });

  router.get("/ra_leaves/:employeeId", (req, res) => {
    const supervisorID = req.params.employeeId;
    const q = "SELECT * FROM leave_request WHERE supervisor_ID = ?";
    db.query(q, [supervisorID], (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.json(data);
    });
  });

  return router;
}
