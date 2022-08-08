import { Route, Routes } from 'react-router-dom';

import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';

export const AppRouter = () => {
    const status: any = 'not-authenticated';

    return (
        <Routes>
            {
                status === "authenticated"
                    ? <Route path="auth/*" element={<LoginPage />} />
                    : <Route path="/*" element={<CalendarPage />} />
            }
        </Routes >
    );
};

export default AppRouter;;