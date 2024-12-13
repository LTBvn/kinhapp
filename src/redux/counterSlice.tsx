import { createSlice } from '@reduxjs/toolkit';

interface TabCustomState {
    value: boolean;
    introSeen: boolean;
}

const initialState: TabCustomState = {
    value: false,
    introSeen: false,
};

export const counterSlice = createSlice({
    name: 'tabbacustom',
    initialState,
    reducers: {
        toggleValue: (state) => {
            state.value = !state.value;
        },
        setIntroSeen: (state, action) => {
            state.introSeen = action.payload;
        },
    },
});

// Export actions để sử dụng trong các component
export const { toggleValue, setIntroSeen } = counterSlice.actions;

// Export reducer để kết hợp vào store
export default counterSlice.reducer;
