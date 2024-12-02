import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Employee Management System
                </Typography>
                {(() => {
                    if(localStorage.getItem('token')) {
                        return <Button color="inherit" component={Link} to="/logout">
                            Logout
                        </Button>
                    } else {
                        return <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>
                    }
                })()}
                <Button color="inherit" component={Link} to="/employees">
                    Employees
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
