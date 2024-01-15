import express from "express";
import bycrypt from "bcrypt";

const router = express.Router();

const registerRoute = (db) => {
    router.post("/register", async (req, res) => {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" })
        }

        try {
            const hashedpassword = await bycrypt.hash(password, 10);
            const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
            const values = [username, email, hashedpassword];
            db.query(sql, values, (err, result) => {
                if (err) {
                    console.error("Error during registration:", err);
                    res.status(500).json({ message: "Registration failed. Please try again." });
                } else {
                    res.status(201).json({ message: "Registration successful!" });
                }
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Registration failed. Please try again." });
        }
    });

    return router;
}

const loginRoute = (db) => {
    router.post("/login", async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide both username and password" });
        }

        const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
        const values = [email, password];

        db.query(sql, values, (err, results) => {
            if (err) {
                console.error("Error during login:", err);
                return res.status(500).json({ message: "Login failed. Please try again." });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: "Invalid username or password" });
            }

            // You can customize the response based on your needs
            const user = results[0];
            res.status(200).json({
                message: "Login successful",
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    // Add other user properties as needed
                },
            });

        });
    });

    return router;
}

export { registerRoute, loginRoute };
