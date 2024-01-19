import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mysql from "mysql2";
import cors from "cors";
import loginRoute from "./controllers/login.js";
import registerRoute from "./controllers/register.js";

const app = express();
dotenv.config();
const SECRET_KEY = process.env.secret_key;

// Express middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Corrected route paths
app.use("/api/auth", loginRoute(db));
app.use("/api/auth", registerRoute(db));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, async () => {
  console.log("Server is listening on port 3000");
});
