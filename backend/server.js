const dns = require("dns");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const dashboardRoutes = require("./routes/dashboardRoutes");
const studentsRoutes = require("./routes/studentsRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

dns.setServers([
  "8.8.8.8", 
  "8.8.4.4", 
  "1.1.1.1"
]);

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/mentors", dashboardRoutes);
app.use("/api/mentors", studentsRoutes);

app.get("/", (req, res) => {
  res.send("AISC OJT Portal — Faculty Backend is running");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});