import React, { useState } from 'react';
import {
    Modal,
    TextField,
    Button,
    Typography,
    Box,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { UserDispatch } from '../Store/Store';
import { registerUser } from '../Reducers/AuthSlice'; // Adjust the import based on your slice
import { User } from '../Models/User';

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

const Register = ({ open, handleClose }: ModalProps) => {
    const dispatch = useDispatch<UserDispatch>();
    const [user, setUser] = useState<User>({
        name: '',
        email: '',
        password: '',
        role: 'user'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(registerUser(user));
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h4" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        type="text"
                        fullWidth
                        margin="normal"
                        value={user.name}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Role"
                        name="role"
                        type="text"
                        fullWidth
                        margin="normal"
                        value={user.role}
                        onChange={handleChange}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Register
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default Register;
