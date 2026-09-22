const express = require("express");

const logger = require("./middleware/logger");

const studentRoutes = require("./routes/studentRoutes");

const app = express();

const PORT = 3000;


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(express.json());

app.use(logger);


// =====================================================
// HOME ROUTE
// =====================================================

app.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        message: "Student Management REST API is running"
    });

});


// =====================================================
// STUDENT ROUTES
// =====================================================

app.use("/students", studentRoutes);


// =====================================================
// 404 ROUTE
// =====================================================

app.use((req, res) => {

    res.status(404).json({
        success: false,
        message: "Route not found"
    });

});


// =====================================================
// START SERVER
// =====================================================

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});