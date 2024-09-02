// server.js
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT || 5001;


app.use(express.json());


// Ensure these paths are correct
app.use("/api/contacts", require("./routes/ContactRoutes"));
app.use("/api/users", require("./routes/UserRouters")); 

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
