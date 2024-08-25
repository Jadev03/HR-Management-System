import express from "express"
import mysql from "mysql2"
import cors from "cors"
import bcrypt from "bcrypt";
import dotenv from "dotenv"

dotenv.config()
const app = express()

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}) 

app.use(express.json())
app.use(cors())



app.get("/", (req, res) => {
    res.json("Welcome to Jupiter Apparels")
})


app.post("/login", (req, res) => {   

    const q = "SELECT * FROM user WHERE User_ID = ?";
    db.query(q, [req.body.User_ID], (err, data) => {
        if (err) {
            console.error(err);
            return res.json("Error");
        }

        if (data.length === 0) {
            // User not found
            return res.json("User not found");
        }

        const user = data[0];
        bcrypt.compare(req.body.Password,user.Password ).then(function(result) {
            if (result) {           
                return res.json({ status: "Success", role: user.Access_level,EMP_id: user.Employee_ID });


        } 
        else {
            return res.json("Invalid");
        }
        });
        
    });
});


app.post("/userCreate", (req, res) => { 

    bcrypt.hash(req.body.Password, 10).then(function(hash) {
        const q = "INSERT INTO user (User_ID, Employee_ID, Access_level, Password) VALUES (?, ?, ?,?)";
        db.query(q, [req.body.User_ID, req.body.Employee_ID,req.body.Access_level,hash], (err, data) => {

            if (err) {
                console.error(err);
                return res.json("Error");
            }

            return res.json("Success");
        });
    });
     
});

app.get("/department", (req, res) => {
    const q ="SELECT * FROM department"
    db.query(q, (err, data) => {
        if(err){
            return res.json(err)
        }
        return res.json(data)
    })
})

app.get("/department-hr", (req, res) => {
    const q ="SELECT * FROM department"
    db.query(q, (err, data) => {
        if(err){
            return res.json(err)
        }
        return res.json(data)
    })
})

app.get("/employee", (req, res) => {
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
        if(err){
            return res.json(err)
        }
        return res.json(data)
    })
})


app.get("/branch", (req, res) => {
    const q ="SELECT * FROM branch"
    db.query(q, (err, data) => {
        if(err){
            return res.json(err)
        }
        return res.json(data)
    })
})

app.get("/leave_request", (req, res) => {
    const q ="SELECT * FROM leave_request"
    db.query(q, (err, data) => {
        if(err){
            return res.json(err)
        }
        return res.json(data)
    })
})

app.get("/leave_bal", (req, res) => {
    const q ="SELECT * FROM leave_balance"
    db.query(q, (err, data) => {
        if(err){
            return res.json(err)
        }
        return res.json(data)
    })
})

app.get("/paygrade", (req, res) => {
    const q ="SELECT * FROM pay_grade"
    db.query(q, (err, data) => {
        if(err){
            return res.json(err)
        }
        return res.json(data)
    })
})

app.get("/emergency_cont", (req, res) => {
    const q ="SELECT * FROM emergency_contact"
    db.query(q, (err, data) => {
        if(err){
            return res.json(err)
        }
        return res.json(data)
    })
})



app.get("/job", (req, res) => {
    const q ="SELECT * FROM job_title"
    db.query(q, (err, data) => {
        if(err){
            return res.json(err)
        }
        return res.json(data)
    })
})


app.get("/dependant_info", (req, res) => {
    const q ="SELECT * FROM dependent_info";
    db.query(q, (err, data) => {
        if(err){
            return res.json(err)
        }
        return res.json(data)
    })
})


app.post("/job", (req, res) => {
    const q ="INSERT INTO job_title (Title_ID,Title) VALUES (?)";
    const values =[req.body.Title_ID, req.body.Title];

    db.query(q, [values], (err, data) => {
        if(err){
            return res.json(err);
        }
        return res.json(data);
    })
})

app.post("/dependant_info", (req, res) => {
    const q ="INSERT INTO dependent_info (Name, Employee_ID, Date_of_Birth, Relationship) VALUES (?) ";
    const values =[req.body.Name, req.body.Employee_ID, req.body.Date_of_Birth, req.body.Relationship];

    db.query(q, [values], (err, data) => {
        if(err){
            return res.json(err);
        }
        return res.json(data);
    })
})

app.post("/request_leave", (req, res) => {
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
      const leaveRequestValues = [req.body.Leave_Request_ID,req.body.Employee_ID, req.body.Start_Date, req.body.End_Date, req.body.Leave_Type, req.body.Status, req.body.Reason, req.body.Duration,req.body.Comments, supervisorID];
  
      db.query(leaveRequestQuery, leaveRequestValues, (err, data) => {
        if (err) {
          return res.json(err);
        }
        return res.json(data);
      })
    })
  })
  

    

app.post("/", (req, res) => {
    const q ="INSERT INTO department (Dept_ID,Dept_Name,Building,Branch_ID) VALUES (?)";
    const values =[req.body.Dept_ID, req.body.Dept_Name, req.body.Building, req.body.Branch_ID];

    db.query(q, [values], (err, data) => {
        if(err){
            return res.json(err);
        }
        return res.json(data);
    })
})

app.post("/employee", async (req, res) => {
    console.log(req.body.employee.Employee_ID);
  
    try {
      // Insert employee data into the employee table
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
  
      // Insert custom fields into the Employee_custom_field table
      for (const field in req.body.customFieldValue) {
        const key = field;
        const Emp_Id = req.body.employee.Employee_ID;
        const value = req.body.customFieldValue[field];
  
        const q1 = "INSERT INTO Employee_custom_field (Field_ID, Employee_ID, Field_val) VALUES (?)";
        const values1 = [key, Emp_Id, value];
        
        await db.promise().query(q1, [values1]);
      }
  
      // If all database operations are successful, send a success response
      res.json({ message: "Employee added successfully." });
    } catch (err) {
      console.error(err);
      // If there's an error, send an error response
      res.status(500).json({ error: "Failed to add the employee." });
    }
  });

  
app.put("/department/:Dept_ID", (req, res) => {
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

app.put("/leave_bal/:Employee_ID", (req, res) => {
    const id = req.params.Employee_ID;
    const anual= req.body.Annual;
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

app.put("/employee/:Employee_ID", (req, res) => {
    const id = req.params.Employee_ID;
    const telNo= req.body.Tel_No;
    const deptID = req.body.Dept_ID;
    const titleID= req.body.Title_ID;
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

app.put("/leave_request_takeaction/:Employee_ID", (req, res) => {
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

app.put("/emergency_cont/:Emerg_Contact_ID", (req, res) => {
    const id = req.params.Emerg_Contact_ID;
    const firstName= req.body.First_Name;
    const lastName = req.body.Last_Name;
    const telNo = req.body.Tel_No;
    const relationship = req.body.Relationship;
    const address = req.body.Address;
    const email = req.body.Email;
    const q = "UPDATE emergency_contact SET `First_Name` = ?, `Last_Name` = ?, `Tel_No` = ?, `Relationship` = ?, `Address` =?, `Email` =? WHERE Emerg_Contact_ID = ?";
    const values = [firstName,lastName,telNo, relationship, address, email, id];

    db.query(q, values, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.put("/paygrade/:Paygrade_ID", (req, res) => {
    const id = req.params.Paygrade_ID;
    const anual= req.body.Annual_Leave_Allowance;
    const casual = req.body.Casual_Leave_Allowance;
    const maternity = req.body.Maternity_Leave_Allowance;
    const no_pay = req.body.NO_pay_Allowance;
    const desc = req.body.Description;
    const q = "UPDATE pay_grade SET `Annual_Leave_Allowance` = ?, `Casual_Leave_Allowance` = ?, `Maternity_Leave_Allowance` = ?, `NO_pay_Allowance` = ?, `Description` = ? WHERE Paygrade_ID = ?";
    const values = [anual, casual, maternity, no_pay,desc, id];

    db.query(q, values, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.delete("/department/:Dept_ID", (req, res) => {
    const id = req.params.Dept_ID;
    const q = "DELETE FROM department WHERE Dept_ID = ?";

    db.query(q, [id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json("Book deleted successfully");
    });
});


app.get("/dept/:departmentId", (req,res) => {
    const id = req.params.departmentId;

    const q =`
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
        if(err){
            return res.json(err)
        }
        return res.json(data)
    });
});


app.get("/paygrade/:paygrade_ID", (req,res) => {
    const id = req.params.paygrade_ID;

    const q =`
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
        if(err){
            return res.json(err)
        }
        return res.json(data)
    });
});

app.get("/subordinate/:supervisor_ID", (req,res) => {
    const id = req.params.supervisor_ID;

    const q =`
        SELECT * from supervisor_aspect where Supervisor_ID = ?`;
    db.query(q, [id], (err, data) => {
        if(err){
            return res.json(err)
        }
        return res.json(data)
    });
});


app.get("/leavebal/", (req,res) => {
    console.log(req.query);
    const id = req.query.departmentId;
    const fromDate = req.query.startDate;
    const toDate = req.query.endDate;
    const q =`
        SELECT * 
            FROM
            leave_request
            INNER JOIN
            employee ON employee.Employee_ID = leave_request.Employee_ID
            INNER JOIN
            department ON employee.Dept_ID = department.Dept_ID
            WHERE
            employee.Dept_ID = ? AND Start_Date BETWEEN ? AND ?`;

    db.query(q, [id,fromDate,toDate], (err, data) => {
        if(err){
            return res.json(err)
        }
        return res.json(data)
    });
});



app.get("/jobreport/:jobTitleId", (req,res) => {
    const id = req.params.jobTitleId;

    const q =`
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
        if(err){
            return res.json(err)
        }
        return res.json(data)
    });
});

app.get("/custom_report/:EmployeeID", (req,res) => {
    const id = req.params.EmployeeID;

    const q =`
        SELECT
        field_name,
        field_val
        from
        custom_field_aspect
        where Employee_ID = ?`;
    db.query(q, [id], (err, data) => {
        if(err){
            return res.json(err)
        }
        return res.json(data)
    });
});

app.get("/personal-details", (req, res) => {
    // Handle other cases related to personal details
    res.send("Personal details route");
});

// GET personal details by Employee ID
app.get("/personal-details/:employeeId", (req, res) => {
    
    const employeeId = req.params.employeeId; 
    const q = "SELECT * FROM personal_aspect WHERE Employee_ID = ?";
    console.log(employeeId);
    db.query(q, [employeeId], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data[0]);
    });
});

app.get("/ra_leaves/:employeeId", (req, res) => {
    
    const supervisorID = req.params.employeeId; 
    const q = "SELECT * FROM leave_request WHERE supervisor_ID = ?";
    console.log(supervisorID);
    db.query(q, [supervisorID], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});

app.post("/add-custom-field", (req, res) => {
    const { Field_ID, Field_name } = req.body;

    // Add the custom field to the custom fields table
    const q = "INSERT INTO custom_field (Field_ID, Field_name) VALUES (?, ?)";
    db.query(q, [Field_ID, Field_name], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to add custom field." });
        }
        return res.json({ message: "Custom field added successfully." });
    });
});


app.get("/add-custom-field", (req, res) => {
    const { Field_ID, Field_name } = req.body;

    // Add the custom field to the custom fields table
    const q = "select * from custom_field";
    db.query(q,(err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to add custom field." });
        }
        return res.json(data);
    });
});

app.post("/add-custom-field/:employeeId", (req, res) => {
    const employeeId = req.params.employeeId;
    const { fieldId, fieldVal } = req.body;

    // Add the custom field to the Employee_custom_field table
    const q = "INSERT INTO Employee_custom_field (Field_ID, Employee_ID, Field_val) VALUES (?, ?, ?)";
    db.query(q, [fieldId, employeeId, fieldVal], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to add custom field." });
        }
        return res.json({ message: "Custom field added successfully." });
    });
});

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log("Backend server is running!!")
})
