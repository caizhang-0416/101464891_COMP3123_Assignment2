import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Grid, Paper } from '@mui/material';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/v1/user/login', { email, password });
            console.log(response.data);
            localStorage.setItem("authToken", response.data.token);
            navigate('/employees');
        } catch (error) {
            setErrorMessage('Invalid email or password.');
            console.error('Login failed:', error);
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '60vh' }}>
            <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} style={{ padding: '16px' }}>
                    <Typography variant="h5" align="center" gutterBottom>Login</Typography>
                    <form onSubmit={handleLogin}>
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
                            Login
                        </Button>
                    </form>

                    {errorMessage && <Typography color="error" align="center" style={{ marginTop: '16px' }}>{errorMessage}</Typography>}

                    <p style={{ textAlign: 'center', marginTop: '16px' }}>
                        Don't have an account? <a onClick={() => navigate('/signup')}>Sign Up</a>
                    </p>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Login;
