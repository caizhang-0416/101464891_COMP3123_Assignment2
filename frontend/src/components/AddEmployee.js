import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure you import axios for making API calls
import { TextField, Button, Container, Grid, Typography } from '@mui/material'; // Import Material-UI components

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        first_name: '',
        last_name: '',
        email: '',
        position: '',
        salary: '',
        date_of_joining: '',
        department: ''
    });

    const navigate = useNavigate();  // For navigation after successful employee addition

    const handleSubmit = async (event) => {
        event.preventDefault();  // Prevent the default form submit behavior

        try {
            // Call the function to save employee data
            await saveEmployee(employee);

            // Navigate to the employee list after successful add
            navigate('/employees');  // Redirects to the employee list page
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    const saveEmployee = async (employeeData) => {
        const token = localStorage.getItem("authToken"); // Retrieve token from localStorage

        try {
            // Make the POST request to the backend to save the employee
            const response = await axios.post('/api/v1/emp/employees/', employeeData, {
                headers: {
                    Authorization: `Bearer ${token}` // Attach the token in the request headers
                }
            });
            console.log('Employee added:', response.data); // Log the response from the server
        } catch (error) {
            console.error('Error saving employee:', error); // Log any error
        }
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
                Add New Employee
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="First Name"
                            variant="outlined"
                            value={employee.first_name}
                            onChange={(e) => setEmployee({ ...employee, first_name: e.target.value })}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            variant="outlined"
                            value={employee.last_name}
                            onChange={(e) => setEmployee({ ...employee, last_name: e.target.value })}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            value={employee.email}
                            onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
                            required
                            type="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Position"
                            variant="outlined"
                            value={employee.position}
                            onChange={(e) => setEmployee({ ...employee, position: e.target.value })}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Salary"
                            variant="outlined"
                            value={employee.salary}
                            onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
                            required
                            type="number"
                            InputProps={{ inputProps: { min: 0 } }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Date of Joining"
                            variant="outlined"
                            value={employee.date_of_joining}
                            onChange={(e) => setEmployee({ ...employee, date_of_joining: e.target.value })}
                            required
                            type="date"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Department"
                            variant="outlined"
                            value={employee.department}
                            onChange={(e) => setEmployee({ ...employee, department: e.target.value })}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{ padding: '12px', fontSize: '16px' }}
                        >
                            Add Employee
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default AddEmployee;
