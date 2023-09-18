const express = require("express");
const apiRoutes = require("./routes/api");
const { connectDB, sequelize } = require("./config/database");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Use your API routes
app.use("/api", apiRoutes);
