import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

const registerRoute = (db) => {
  router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const checkUser = "SELECT * FROM users WHERE email = ?";
    const checkUserValues = [email];

    // Check if the email already exists
    db.query(checkUser, checkUserValues, async (err, results) => {
      if (err) {
        console.error("Error checking email:", err);
        return res
          .status(500)
          .json({ message: "Registration failed. Please try again." });
      }

      if (results.length > 0) {
        return res.status(401).json({ message: "Email already exists" });
      }

      // If email is unique, proceed with registration
      try {
        const hashedpassword = await bcrypt.hash(password, 10);
        const insertUserSql =
          "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        const insertUserValues = [username, email, hashedpassword];

        db.query(insertUserSql, insertUserValues, (insertErr, result) => {
          if (insertErr) {
            console.error("Error during registration:", insertErr);
            res
              .status(500)
              .json({ message: "Registration failed. Please try again." });
          } else {
            res.status(201).json({ message: "Registration successful!" });
          }
        });
      } catch (err) {
        console.error("Error during registration:", err);
        res
          .status(500)
          .json({ message: "Registration failed. Please try again." });
      }
    });
  });

  return router;
};

export default registerRoute;