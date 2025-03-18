
import { Outlet } from 'react-router-dom';
import Connect from './Components/Connect';

const AppLayout = () => {
    return (
        <><Connect />
        <Outlet /></>
    );
};

export default AppLayout;