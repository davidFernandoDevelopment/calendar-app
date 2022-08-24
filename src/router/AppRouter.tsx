import { Route, Routes } from 'react-router-dom';

import { Status } from '../store';
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';

export const AppRouter = () => {
    const status: Status = 'checking';

    return (
        <Routes>
            {
                status === "checking"
                    ? <Route path="auth/*" element={<LoginPage />} />
                    : <Route path="/*" element={<CalendarPage />} />
            }
        </Routes >
    );
};

export default AppRouter;;