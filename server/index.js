const express = require("express");
const dbConnect = require("./src/config/db");
require("dotenv").config();
const authRouter = require("./src/routes/auth");
const chatRouter = require("./src/routes/chat");
const cors = require("cors");
const errorHandler = require("./src/middlewares/errorMiddleware");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", authRouter);
app.use("/", chatRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

dbConnect()
    .then(() => {
        console.log("Database connected!");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(error => console.log("Database connection failed:", error));