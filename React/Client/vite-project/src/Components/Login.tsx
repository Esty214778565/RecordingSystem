
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { UserDispatch } from '../Store/Store';
import { loginUser } from '../Reducers/AuthSlice';
import {
    Modal,
    TextField,
    Button,
    Typography,
    Box,
    InputAdornment,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#ffffff',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
};

// type ModalProps = {
//     open: boolean;           // Indicates whether the modal is open
//     handleClose: () => void; // Function to close the modal
// };

// const Login = ({ open, handleClose }: ModalProps) => {
const Login = () => {

    const dispatch = useDispatch<UserDispatch>();
    const navigate = useNavigate();
    const [userLogin, setUserLogin] = useState({
        name: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserLogin({
            ...userLogin,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await dispatch(loginUser(userLogin));
        navigate('/courses');
        // handleClose();
    };

    return (
        // <Modal open={open} onClose={handleClose}>
        <Modal open={true} onClose={() => { }}>
            <Box sx={style}>
                <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#9b2f87' }}>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        type="text"
                        fullWidth
                        margin="normal"
                        value={userLogin.name}
                        onChange={handleChange}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#fd9c98', // Turquoise border color
                                },
                                '&:hover fieldset': {
                                    borderColor: '#fd9c98', // Turquoise on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#fd9c98', // Turquoise when focused
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#fd9c98', // Turquoise label color
                            },
                        }}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={userLogin.password}
                        onChange={handleChange}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#fd9c98',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#fd9c98',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#fd9c98',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#fd9c98',
                            },
                        }}
                    />
                    <Button type="submit" variant="contained" sx={{ backgroundColor: '#9b2f87', '&:hover': { backgroundColor: '#FF4500' } }} fullWidth>
                        Login
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default Login;


