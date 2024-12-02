import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Grid, Paper } from '@mui/material';
import axios from 'axios';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/v1/user/signup', { email, password, username: name });
            console.log(response);
            navigate('/login'); // Redirect to login after successful signup
        } catch (error) {
            setErrorMessage('Signup failed. Please try again.');
            console.error('Signup error:', error);
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} style={{ padding: '16px' }}>
                    <Typography variant="h5" align="center" gutterBottom>Sign Up</Typography>
                    <form onSubmit={handleSignup}>
                        <TextField
                            label="Name"
                            type="text"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button variant="contained" color="primary" type="submit" fullWidth style={{ marginTop: '16px' }}>
                            Sign Up
                        </Button>
                    </form>

                    {errorMessage && <Typography color="error" align="center" style={{ marginTop: '16px' }}>{errorMessage}</Typography>}

                    <p style={{ textAlign: 'center', marginTop: '16px' }}>
                        Already have an account? <a onClick={() => navigate('/login')}>Log In</a>
                    </p>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Signup;
