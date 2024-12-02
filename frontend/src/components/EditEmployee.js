import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, TextField, Button, Grid, CircularProgress } from '@mui/material'; // Material UI components for styling

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);  // Loading state for API call
  const navigate = useNavigate();

  useEffect(() => {
    console.log('id:', id);
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

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/v1/emp/employees/${id}`, employee);
      navigate('/employees');
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

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
          Edit Employee
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                  fullWidth
                  variant="outlined"
                  label="Name"
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  fullWidth
                  variant="outlined"
                  label="Position"
                  name="position"
                  value={employee.position}
                  onChange={handleChange}
                  required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  fullWidth
                  variant="outlined"
                  label="Department"
                  name="department"
                  value={employee.department}
                  onChange={handleChange}
                  required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  fullWidth
                  variant="outlined"
                  label="Email"
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                  required
                  type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  fullWidth
                  variant="outlined"
                  label="Phone"
                  name="phone"
                  value={employee.phone}
                  onChange={handleChange}
                  required
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ marginTop: 2 }}
              >
                Update Employee
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
  );
};

export default EditEmployee;
