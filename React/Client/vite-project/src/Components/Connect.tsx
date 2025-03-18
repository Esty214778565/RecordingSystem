import { Button, Container, Typography } from '@mui/material';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

const LoginRegister = () => {
    // const navigate = useNavigate();
    const [modalLoginOpen, setModalLoginOpen] = useState<boolean>(false);
    const [modalRegisterOpen, setModalRegisterOpen] = useState<boolean>(false);

    const handleCloseLogin = () => {
        setModalLoginOpen(false)
    };
    const handleLogin = () => {
        console.log("Login button clicked");
        setModalLoginOpen(true);
        // navigate('/login');
    };
    const handleRegister = () => {
        setModalRegisterOpen(true);
        // navigate('/register');
    };
    const handleCloseRegister = () => {
        setModalRegisterOpen(false)
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Welcome to the System
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleLogin}
                style={{ marginRight: '10px' }}
            >
                Login
            </Button>
            <Login open={modalLoginOpen} handleClose={handleCloseLogin} />
            <Button
                variant="contained"
                color="secondary"
                onClick={handleRegister}
            >
                Register
            </Button>
            <Register open={modalRegisterOpen} handleClose={handleCloseRegister} />

        </Container>
    );
};

export default LoginRegister;
