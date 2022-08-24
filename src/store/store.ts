import { configureStore } from '@reduxjs/toolkit';

import { uiSlice, calendarSlice, authSlice } from './';

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        auth: authSlice.reducer,
        calendar: calendarSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});


export default store;