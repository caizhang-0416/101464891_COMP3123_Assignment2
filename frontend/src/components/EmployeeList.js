import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Grid } from '@mui/material';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    // Fetch employees data when the component mounts
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('/api/v1/emp/employees');
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div>
            <Typography variant="h4" gutterBottom>Employee List</Typography>

            <Grid container justifyContent="flex-end" style={{ marginBottom: '16px' }}>
                <Button variant="contained" color="primary" onClick={() => window.location.href = '/employees/add'}>
                    Add Employee
                </Button>
            </Grid>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Position</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee._id}>
                                <TableCell>{employee.first_name} {employee.last_name}</TableCell>
                                <TableCell>{employee.position}</TableCell>
                                <TableCell>{employee.department}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        style={{ margin: 5 }}
                                        onClick={() => handleEdit(employee._id)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        style={{ margin: 5 }}
                                        onClick={() => handleDelete(employee._id)}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="default"
                                        style={{ margin: 5 }}
                                        onClick={() => (window.location.href = `/employees/${employee._id}`)}
                                    >
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

const handleEdit = (id) => {
    window.location.href = `/employees/edit/${id}`;
};

const handleDelete = async (id) => {
    try {
        await axios.delete(`/api/v1/emp/employees?eid=${id}`);
        window.location.reload();
    } catch (error) {
        console.error('Error deleting employee:', error);
    }
};

export default EmployeeList;
