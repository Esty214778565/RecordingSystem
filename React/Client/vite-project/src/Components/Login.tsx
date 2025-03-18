import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { UserDispatch } from '../Store/Store';
import { loginUser, trygetusers } from '../Reducers/AuthSlice';
import {
    Modal,
    TextField,
    Button,
    Typography,
    Box,
} from '@mui/material';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
type ModalProps = {
    open: boolean;           // Indicates whether the modal is open
    handleClose: () => void; // Function to close the modal
};
const Login = ({ open, handleClose }: ModalProps) => {
    const dispatch = useDispatch<UserDispatch>();
    const [userLogin, setUserLogin] = useState({
        name: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserLogin({
            ...userLogin,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //check if save data
        dispatch(loginUser(userLogin));
        console.log("before trygetusers");
        
        dispatch(trygetusers());
        console.log("after trygetusers");
        
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="name"
                        name="name"
                        type="text"
                        fullWidth
                        margin="normal"
                        value={userLogin.name}
                        onChange={handleChange}
                        required
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
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default Login;
