import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Typography, Box, CssBaseline, AppBar, Toolbar, CardMedia } from '@mui/material';
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
            main: '#fd9c98', // Custom color for buttons
            secondary: '#9b2f87', // Another custom color for buttons
        },
    },
});

const HomePage = () => {
    const navigate = useNavigate();

    const DEFAULT_IMAGE_URL = './../../../public/Images/img1.jpg'; // Default image

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ backgroundColor: 'white', width: '100vw' }}  >
                    <Toolbar>
                        <Typography variant="h2" sx={{ textAlign: 'left', flexGrow: 0.2, color: theme.palette.custom.main }}>

                        </Typography>
                        <Typography variant="h4" sx={{ padding: '0.5em', textAlign: 'left', flexGrow: 1, color: theme.palette.custom.main }}>
                            RecordWise
                        </Typography>
                        <Typography variant="h6" sx={{ padding: '0.5em', textAlign: 'left', flexGrow: 1, color: theme.palette.custom.main }}>
                            Manage your recordings smartly
                        </Typography>

                        <Button
                            variant="contained"
                            sx={{ backgroundColor: theme.palette.custom.main, width: '150px', margin: '0 10px', '&:hover': { backgroundColor: theme.palette.custom.secondary } }}
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: theme.palette.custom.secondary, width: '150px', margin: '0 10px', '&:hover': { backgroundColor: theme.palette.custom.main } }}
                            onClick={() => navigate('/register')}
                        >
                            Register
                        </Button>
                    </Toolbar>
                </AppBar>

                <Box sx={{ position: 'relative', width: '100vw', maxWidth: '100%', mb: 2 }}>
                    <CardMedia
                        component="img"
                        height="300" // Adjust height as needed
                        image={DEFAULT_IMAGE_URL} // Use your desired image URL
                        alt="Top Banner"
                        sx={{ width: '100%', objectFit: 'cover' }} // Ensures the image covers the full width
                    />
                    {sessionStorage.getItem('role') === 'teacher' &&
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#fd9c98', // Updated color
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 1,
                                '&:hover': { backgroundColor: theme.palette.custom.secondary } // Optional hover effect
                            }}
                            onClick={() => navigate('/add-lesson')}
                        >
                            Add New Lesson
                        </Button>

                    }

                </Box>
                {/* <ContactForm /> */}
                <Outlet />
            </ThemeProvider>

        </>
    );
};

export default HomePage;