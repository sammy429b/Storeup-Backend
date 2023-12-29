import express from "express";

import connectDB from "./utils/dbconnect.js";
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
    }
);

app.listen(3000, async() => {
    console.log("Server is listening on port 3000");
    await connectDB();
    }
);