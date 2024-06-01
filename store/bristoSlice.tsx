import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    localMenus: [],
};

const bristoConfigSlice = createSlice({
    name: 'bristo',
    initialState: initialState,
    reducers: {
        setLocalMenu(state, { payload }) {
            localStorage.setItem('localMenus', JSON.stringify(payload));
            state.localMenus = payload;
        },
    },
});

export const { setLocalMenu } = bristoConfigSlice.actions;

export default bristoConfigSlice.reducer;
