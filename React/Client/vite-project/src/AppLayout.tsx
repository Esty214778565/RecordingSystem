// import { Outlet } from 'react-router-dom';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { CssBaseline } from '@mui/material';
import Header from './Components/Header';
import { Outlet } from 'react-router-dom';
import theme from './Components/Theme';


const AppLayout = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header />
                <Outlet />
            </ThemeProvider>
        </>
    );
};

export default AppLayout;