const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

// const DB_HOST =
//   "mongodb+srv://zeeper90:Zeeperbernard90@cluster0.wdllc6e.mongodb.net/noteBook?retryWrites=true&w=majority";

const authRouter = require("./routes/api/users");
const contactsRouter = require("./routes/api/contacts");
const currentRouter = require("./routes/api/current");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", authRouter);
app.use("/api/users", currentRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
