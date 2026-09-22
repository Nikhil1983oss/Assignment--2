const express = require("express");

const router = express.Router();

const students = require("../data/stds");


// =====================================================
// GET ALL STUDENTS
// GET /students
// =====================================================

router.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        count: students.length,
        data: students
    });

});


// =====================================================
// GET STUDENT BY ID
// GET /students/:id
// =====================================================

router.get("/:id", (req, res) => {

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {

        return res.status(400).json({
            success: false,
            message: "Invalid student ID"
        });

    }

    const student = students.find(
        student => student.id === id
    );

    if (!student) {

        return res.status(404).json({
            success: false,
            message: "Student not found"
        });

    }

    res.status(200).json({
        success: true,
        data: student
    });

});


// =====================================================
// CREATE STUDENT
// POST /students
// =====================================================

router.post("/", (req, res) => {

    const { name, course } = req.body;

    if (!name || !course) {

        return res.status(400).json({
            success: false,
            message: "Name and course are required"
        });

    }

    let newId = 1;

    if (students.length > 0) {

        newId =
            Math.max(
                ...students.map(student => student.id)
            ) + 1;

    }

    const newStudent = {
        id: newId,
        name: name,
        course: course
    };

    students.push(newStudent);

    res.status(201).json({
        success: true,
        message: "Student created successfully",
        data: newStudent
    });

});


// =====================================================
// UPDATE STUDENT
// PUT /students/:id
// =====================================================

router.put("/:id", (req, res) => {

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {

        return res.status(400).json({
            success: false,
            message: "Invalid student ID"
        });

    }

    const student = students.find(
        student => student.id === id
    );

    if (!student) {

        return res.status(404).json({
            success: false,
            message: "Student not found"
        });

    }

    const { name, course } = req.body;

    if (!name || !course) {

        return res.status(400).json({
            success: false,
            message: "Name and course are required"
        });

    }

    student.name = name;
    student.course = course;

    res.status(200).json({
        success: true,
        message: "Student updated successfully",
        data: student
    });

});


// =====================================================
// DELETE STUDENT
// DELETE /students/:id
// =====================================================

router.delete("/:id", (req, res) => {

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {

        return res.status(400).json({
            success: false,
            message: "Invalid student ID"
        });

    }

    const studentIndex = students.findIndex(
        student => student.id === id
    );

    if (studentIndex === -1) {

        return res.status(404).json({
            success: false,
            message: "Student not found"
        });

    }

    const deletedStudent = students.splice(studentIndex, 1)[0];

    res.status(200).json({
        success: true,
        message: "Student deleted successfully",
        data: deletedStudent
    });

});


module.exports = router;