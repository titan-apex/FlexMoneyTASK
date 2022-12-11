import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectMySQL } from "./config/mysql.js";
dotenv.config();

const connection = await connectMySQL();
await connection.execute(
  `CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, age INT NOT NULL, batch VARCHAR(255) NOT NULL)`
);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from server!" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //console.log(email, password);

  const result = await connection.execute(
    `SELECT * FROM users WHERE email = ? AND password = ?`,
    [email, password]
  );

  if (result[0].length === 0) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res
    .status(200)
    .json({ user: result[0][0].email, message: "Logged in successfully!" });
});

app.post("/register", async (req, res) => {
  const { name, email, password, age, batch } = req.body;

  await connection.execute(
    `INSERT INTO users (name, email, password, age, batch) VALUES (?, ?, ?, ?, ?)`,
    [name, email, password, age, batch]
  );

  res.status(200).json({ message: "Registered successfully!" });
});

app.put("/updatebatch", async (req, res) => {
  const { email, batch } = req.body;

  await connection.execute(`UPDATE users SET batch = ? WHERE email = ?`, [
    batch,
    email,
  ]);

  res.status(200).json({ message: "Updated successfully!" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
