import mysql from "mysql";
import express from "express";
import cors from "cors";
const app = express();
const port = 5000;

//make a pool connection for mysql
const db = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    password: "",
    port: 3306,
    user: "",
    database: ""
});

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.send("Hello World");
}
);

app.get("/users", (req, res) => {
    const sqlSelect = "SELECT * FROM userdata";
    db.query(sqlSelect, (err, result) => {
        if(err) console.log(err);
        res.send(result);
    }
    );
}
);

app.post("/create", (req, res) => {
    console.log("req received",req.body);
    const name = req.body.name;
    const age = req.body.age;
    const sqlInsert = "INSERT INTO userdata (name, age) VALUES (?,?)";
    db.query(sqlInsert, [name, age], (err, result) => {
        if (err) console.log(err);
        res.send("Values Inserted");
    }
    );
}
);


app.get('/edit/:id', (req, res) => {

    // console.log("req",re)
    const userId = req.params.id;
    console.log("userId", userId)
    const sql = 'SELECT * FROM userdata WHERE id = ?';
    db.query(sql, [userId], (err, rows) => {
        if (err) {
            console.error('Error fetching data from MySQL:', err);
            res.send('Error fetching data');
        } else {
            res.send(rows[0]);
        }
    });
});

app.post('/update/:id', (req, res) => {
    const userId = req.params.id;
    const newName = req.body.name;
    const newAge = req.body.age;
    
    const sql = 'UPDATE userdata SET name = ?, age = ? WHERE id = ?';
    db.query(sql, [newName, newAge, userId], (err, result) => {
        if (err) {
            console.error('Error updating data in MySQL:', err);
            res.send('Error updating data');
        } else {
            res.send('Value Updated');
            
        }
    });
});

app.get('/delete/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'DELETE FROM userdata WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error('Error deleting data from MySQL:', err);
            res.send('Error deleting data');
        } else {
            res.send('Successful deletion')
        }
    });
});

app.get("*", (req, res) => {
    res.send("404 not found");
}
);

app.listen(port, () => {
    console.log(`Server started at port http://localhost:${port}`);
}
);