import { createSlice } from '@reduxjs/toolkit';

// import { Note } from './';


interface UIState {
    isDateModalOpen: boolean;
}

const initialState: UIState = {
    isDateModalOpen: false
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        onOpenDateModal: (state: UIState) => {
            state.isDateModalOpen = true;
        },
        onCloseDateModal: (state: UIState) => {
            state.isDateModalOpen = false;
        }
    }
});


export const {
    onOpenDateModal,
    onCloseDateModal,
} = uiSlice.actions;
export default uiSlice.reducer;