


// import React, { useState } from 'react';
// import {
//     Modal,
//     TextField,
//     Button,
//     Typography,
//     Box,
//     FormControl,
//     FormControlLabel,
//     FormLabel,
//     Radio,
//     RadioGroup,
//     InputAdornment,
// } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import { UserDispatch } from '../Store/Store';
// import { registerUser } from '../Reducers/AuthSlice';
// import { User } from '../Models/User';
// import { useNavigate } from 'react-router-dom';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import EmailIcon from '@mui/icons-material/Email';
// import LockIcon from '@mui/icons-material/Lock';

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: '#ffffff',
//     boxShadow: 24,
//     p: 4,
//     borderRadius: '10px',
// };

// type ModalProps = {
//     open: boolean;
//     handleClose: () => void;
// };

// const Register = ({ open, handleClose }: ModalProps) => {
//     const dispatch = useDispatch<UserDispatch>();
//     const navigate = useNavigate();
//     const [user, setUser] = useState<User>({
//         name: '',
//         email: '',
//         password: '',
//         role: 'user'
//     });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setUser({
//             ...user,
//             [name]: value,
//         });
//     };
//     const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setUser({
//             ...user,
//             role: e.target.value,
//         });
//     };
//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         await dispatch(registerUser(user));
//         navigate('/courses');
//         handleClose();
//     };

//     return (
//         <Modal open={open} onClose={handleClose}>
//             <Box sx={style}>
//                 <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#FF5733' }}>
//                     Register
//                 </Typography>
//                 <form onSubmit={handleSubmit}>
//                     <TextField
//                         label="Name"
//                         name="name"
//                         type="text"
//                         fullWidth
//                         margin="normal"
//                         value={user.name}
//                         onChange={handleChange}
//                         required
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <AccountCircle />
//                                 </InputAdornment>
//                             ),
//                         }}
//                     />
//                     <TextField
//                         label="Email"
//                         name="email"
//                         type="email"
//                         fullWidth
//                         margin="normal"
//                         value={user.email}
//                         onChange={handleChange}
//                         required
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <EmailIcon />
//                                 </InputAdornment>
//                             ),
//                         }}
//                     />
//                     <TextField
//                         label="Password"
//                         name="password"
//                         type="password"
//                         fullWidth
//                         margin="normal"
//                         value={user.password}
//                         onChange={handleChange}
//                         required
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <LockIcon />
//                                 </InputAdornment>
//                             ),
//                         }}
//                     />
//                     <FormControl component="fieldset" margin="normal">
//                         <FormLabel component="legend">Role</FormLabel>
//                         <RadioGroup row value={user.role} onChange={handleRoleChange}>
//                             <FormControlLabel value="student" control={<Radio />} label="Student" />
//                             <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
//                         </RadioGroup>
//                     </FormControl>
//                     <Button type="submit" variant="contained" sx={{ backgroundColor: '#FF5733', '&:hover': { backgroundColor: '#FF4500' } }} fullWidth>
//                         Register
//                     </Button>
//                 </form>
//             </Box>
//         </Modal>
//     );
// };

// export default Register;

import React, { useState } from 'react';
import {
    Modal,
    TextField,
    Button,
    Typography,
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    InputAdornment,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { UserDispatch } from '../Store/Store';
import { registerUser } from '../Reducers/AuthSlice';
import { User } from '../Models/User';
import { useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
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
//     open: boolean;
//     handleClose: () => void;
// };

// const Register = ({ open, handleClose }: ModalProps) => {
const Register = () => {
    const dispatch = useDispatch<UserDispatch>();
    const navigate = useNavigate();
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
    const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            role: e.target.value,
        });
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await dispatch(registerUser(user));
        navigate('/courses');
        // handleClose();
    };

    return (
        // <><Modal open={open} onClose={handleClose}>
        <><Modal open={true} onClose={() => { }}>
            <Box sx={style}>
                <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#9b2f87' }}>
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
                        }} />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={user.email}
                        onChange={handleChange}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon />
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
                        }} />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={user.password}
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
                        }} />
                    <FormControl component="fieldset" margin="normal">
                        <FormLabel component="legend">Role</FormLabel>
                        <RadioGroup row value={user.role} onChange={handleRoleChange}>
                            <FormControlLabel value="student" control={<Radio />} label="Student" />
                            <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
                        </RadioGroup>
                    </FormControl>
                    <Button type="submit" variant="contained" sx={{ backgroundColor: '#9b2f87', '&:hover': { backgroundColor: '#fd9c98' } }} fullWidth>
                        Register
                    </Button>
                </form>
            </Box>
        </Modal>

        </>
    );
};

export default Register;