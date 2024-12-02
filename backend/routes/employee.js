// routes/employee.js
const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();

// 1. GET /api/v1/emp/employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. POST /api/v1/emp/employees
router.post('/employees', async (req, res) => {
    const employee = new Employee(req.body);
    try {
        const savedEmployee = await employee.save();
        res.status(201).json({ message: 'Employee created successfully.', employee_id: savedEmployee._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 3. GET /api/v1/emp/employees/:eid
router.get('/employees/:eid', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (employee) {
            res.status(200).json(employee);
        } else {
            res.status(404).json({ message: 'Employee not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 4. PUT /api/v1/emp/employees/:eid
router.put('/employees/:eid', async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
        if (updatedEmployee) {
            res.status(200).json({ message: 'Employee details updated successfully.', updatedEmployee });
        } else {
            res.status(404).json({ message: 'Employee not found.' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 5. DELETE /api/v1/emp/employees
router.delete('/employees', async (req, res) => {
    const { eid } = req.query;
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(eid);
        if (deletedEmployee) {
            res.status(204).json({ message: 'Employee deleted successfully.' });
        } else {
            res.status(404).json({ message: 'Employee not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
