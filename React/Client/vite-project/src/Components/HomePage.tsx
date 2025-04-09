import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Container, Typography, Box, Grid, Paper, CssBaseline } from '@mui/material';
import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import UpLoadS3 from './UpLoadS3';
import DownLoadS3 from './DownLoadS3';
import Try from './Try';
import { Outlet, useNavigate } from 'react-router-dom';


declare module '@mui/material/styles' {
    interface Palette {
        custom: {
            main: string;
            secondary: string;
        };
    }
    interface PaletteOptions {
        custom?: {
            main: string;
            secondary: string;
        };
    }
}

const theme = createTheme({
    palette: {
        custom: {
            main: '#FF5733', // Example custom color
            secondary: '#40E0D0', // Another custom color
        },
    },
});

const HomePage = () => {
    const [modalLoginOpen, setModalLoginOpen] = useState<boolean>(false);
    const [modalRegisterOpen, setModalRegisterOpen] = useState<boolean>(false);
    const navigate = useNavigate();


    const handleCloseLogin = () => {
        setModalLoginOpen(false);
    };
    const handleLogin = () => {
        setModalLoginOpen(true);
    };
    const handleRegister = () => {
        setModalRegisterOpen(true);
    };
    const handleCloseRegister = () => {
        setModalRegisterOpen(false);
    };

    return (
        <ThemeProvider theme={theme} >
            <CssBaseline />
            <Container maxWidth="md" sx={{ mt: 4, mb: 4 }} >
                <Paper elevation={6} sx={{ padding: 4, textAlign: 'center', borderRadius: '15px', backgroundColor: '#f5f5f5' }}>
                    <Typography variant="h4" gutterBottom sx={{ color: theme.palette.custom.main }}>
                        Welcome to the System
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3, color: '#555' }}>
                        Please choose an option below to continue.
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '20px',
                            marginTop: '20px',
                            borderRadius: '10px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            backgroundColor: '#ffffff',
                        }}
                    >
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item>
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: theme.palette.custom.main, width: '150px', '&:hover': { backgroundColor: theme.palette.custom.secondary } }}
                                    onClick={() => navigate('/login')}
                                >
                                    Login
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: theme.palette.custom.secondary, width: '150px', '&:hover': { backgroundColor: theme.palette.custom.main } }}
                                    onClick={() => navigate('/register')}
                                >
                                    Register
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
                {/* <Login open={modalLoginOpen} handleClose={() => setModalLoginOpen(false)} />
                <Register open={modalRegisterOpen} handleClose={() => setModalRegisterOpen(false)} /> */}
            </Container>
            <Box sx={{ mt: 4, textAlign: 'center', color: '#777' }}>
                <Typography variant="body2">
                    &copy; {new Date().getFullYear()} My Website. All rights reserved.
                </Typography>
            </Box>


            {/* <Try /> */}

            <Outlet />
        </ThemeProvider>

    );
};

export default HomePage;