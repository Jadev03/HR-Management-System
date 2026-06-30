import express from "express";
import bcrypt from "bcrypt";

export default function authRoutes(db) {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.json("Welcome to Jupiter Apparels");
  });

  router.post("/login", (req, res) => {
    const q = "SELECT * FROM user WHERE User_ID = ?";
    db.query(q, [req.body.User_ID], (err, data) => {
      if (err) {
        console.error(err);
        return res.json("Error");
      }

      if (data.length === 0) {
        return res.json("User not found");
      }

      const user = data[0];
      bcrypt.compare(req.body.Password, user.Password).then((result) => {
        if (result) {
          return res.json({ status: "Success", role: user.Access_level, EMP_id: user.Employee_ID });
        }
        return res.json("Invalid");
      });
    });
  });

  router.post("/userCreate", (req, res) => {
    bcrypt.hash(req.body.Password, 10).then((hash) => {
      const q = "INSERT INTO user (User_ID, Employee_ID, Access_level, Password) VALUES (?, ?, ?,?)";
      db.query(q, [req.body.User_ID, req.body.Employee_ID, req.body.Access_level, hash], (err) => {
        if (err) {
          console.error(err);
          return res.json("Error");
        }

        return res.json("Success");
      });
    });
  });

  return router;
}
