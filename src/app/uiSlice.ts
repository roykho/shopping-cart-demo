import { createSlice } from '@reduxjs/toolkit';

interface UIState {
    isMobileMenuOpen: boolean;
}

const initialState: UIState = {
    isMobileMenuOpen: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleMobileMenu(state) {
            state.isMobileMenuOpen = !state.isMobileMenuOpen;
        },
        closeMobileMenu(state) {
            state.isMobileMenuOpen = false;
        },
        openMobileMenu(state) {
            state.isMobileMenuOpen = true;
        },
    },
});

// Extract the action creators object and the reducer
const { actions, reducer } = uiSlice;

// Extract and export each action creator by name
export const { toggleMobileMenu, closeMobileMenu, openMobileMenu } = actions;

// Export the reducer, either as a default or named export
export default reducer;