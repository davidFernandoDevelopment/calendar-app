import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from '../auth';
import { useAuthStore } from '../hooks';
import { CalendarPage } from '../calendar';

export const AppRouter = () => {
    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
        //eslint-disable-next-line
    }, []);


    if (status === 'checking') return <h3>Cargando...</h3>;

    return (
        <Routes>
            {
                status === "not-authneticated"
                    ? (
                        <>
                            <Route path="/auth/*" element={<LoginPage />} />
                            <Route path="/*" element={<Navigate to="/auth/login" />} />
                        </>
                    )
                    : (
                        <>
                            <Route path="/" element={<CalendarPage />} />
                            <Route path="/*" element={<Navigate to="/" />} />
                        </>
                    )
            }
        </Routes >
    );
};

export default AppRouter;;