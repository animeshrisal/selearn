import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import { useAuthentication, useSocket } from '../../shared/context';
import { useMutation } from 'react-query';
import { authenticationService } from '../AuthService';
import { Navigate } from 'react-router-dom';


const theme = createTheme();

export default function Login() {

    const { dispatch } = useAuthentication();
    const { connect } = useSocket();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsername = e => setUsername(e.target.value);
    const handlePassword = e => setPassword(e.target.value);

    const mutation = useMutation((user) => authenticationService.login({ username, password }), {
        onSuccess: (mutation) => {
            dispatch({
                type: "LOGIN",
                payload: mutation,
            });

            connect(mutation.access);
        },
    });

    if (mutation.isSuccess) {
        return <Navigate to="/dashboard/" />;
    }

    const handleLogin = () => {
        mutation.mutate({ username, password });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <Box>
                        <TextField
                            margin="normal"
                            value={username}
                            onChange={handleUsername}
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePassword}
                            autoComplete="current-password"
                        />
                        <Button
                            onClick={handleLogin}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/register" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}