import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Alert, Box, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [getData, setData] = useState({
        name: '',
        email: '',
        password: '',
        appType: 'music'
    });

    const [getError, setError] = useState(null);

    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        setData({ ...getData, [event.target.name]: event.target.value });
    };

    const handleLogin = () => {
        navigate("/login");
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        setError(null);
        if (!getData.name) {
            setError('Username is mandatory');
            return;
        } else if (!getData.email) {
            setError('Email is mandatory');
            return;
        } else if (!getData.password) {
            setError('Password cannot be empty');
            return;
        }

        axios.post('https://academics.newtonschool.co/api/v1/user/signup', getData, {
            headers: {
                projectID: 'cp0doe0u3fx9'
            }
        }).then((result) => {
            localStorage.setItem('name', result.data.data.user.name);
            localStorage.setItem('token', result.data.token);
            navigate('/');
        }).catch((error) => {
            console.log(error);
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Unknown error");
            }
        });
    };

    return (
        <Container maxWidth="sm">
            <Card sx={{ mt: 5 }}>
                <CardContent>
                    <Box component="form" onSubmit={onSubmitHandler} noValidate sx={{ mt: 3 }}>
                        <Typography component="h1" variant="h4" align="center" gutterBottom>
                            Sign Up
                        </Typography>
                        {getError && <Alert severity="error" sx={{ mb: 2 }}>{getError}</Alert>}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="User Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={getData.name}
                            onChange={onChangeHandler}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={getData.email}
                            onChange={onChangeHandler}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={getData.password}
                            onChange={onChangeHandler}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 1 }}
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}

export default SignUp;
