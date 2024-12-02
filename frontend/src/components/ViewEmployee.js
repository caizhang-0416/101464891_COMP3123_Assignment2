import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Grid, Paper, CircularProgress } from '@mui/material'; // Material UI components for styling

const ViewEmployee = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);  // Loading state for API call

    useEffect(() => {
        axios.get(`/api/v1/emp/employees/${id}`)
            .then(response => {
                setEmployee(response.data);
                setLoading(false);  // Set loading to false once data is fetched
            })
            .catch(error => {
                console.error('Error fetching employee:', error);
                setLoading(false);  // Set loading to false in case of an error
            });
    }, [id]);

    if (loading) {
        return (
            <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: 4 }}>
                <CircularProgress />
            </Container>
        );
    }

    if (!employee) {
        return (
            <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: 4 }}>
                <Typography variant="h6" color="error">
                    Error loading employee details.
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ marginTop: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
                Employee Details
            </Typography>
            <Paper sx={{ padding: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Name: {employee.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Position: {employee.position}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Department: {employee.department}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Email: {employee.email}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Phone: {employee.phone}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default ViewEmployee;
