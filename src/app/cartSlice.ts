import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    name: string;
    price: number;
}

interface CartState {
    items: CartItem[];
    isDropdownOpen: boolean;
}

const initialState: CartState = {
    items: [{
        name: 'HeadPhones',
        price: 59.99,
    }],
    isDropdownOpen: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            state.items.push(action.payload);
        },
        removeItem(state, action: PayloadAction<number>) {
            state.items.splice(action.payload, 1);
        },
        clearCart(state) {
            state.items = [];
        },
        toggleDropdown(state) {
            state.isDropdownOpen = !state.isDropdownOpen;
        },
        closeDropdown(state) {
            state.isDropdownOpen = false;
        },
        openDropdown(state) {
            state.isDropdownOpen = true;
        },
    },
});

// Extract the action creators object and the reducer
const { actions, reducer } = cartSlice;

// Extract and export each action creator by name
export const { addItem, removeItem, clearCart, toggleDropdown, closeDropdown, openDropdown } = actions;

// Export the reducer, either as a default or named export
export default reducer;
