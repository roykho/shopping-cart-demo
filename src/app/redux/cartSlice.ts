import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState } from '../types';

const initialState: CartState = {
    items: [],
    isDropdownOpen: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            // Save to localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        },
        removeItem(state, action: PayloadAction<number>) {
            const index = state.items.findIndex(item => item.id === action.payload);
            if (index !== -1) {
                state.items.splice(index, 1);
            }
            // Save to localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        },

        clearCart(state) {
            state.items = [];
            // Save to localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
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
        hydrateCart(state, action: PayloadAction<CartItem[]>) {
            state.items = action.payload;
        },
    },
});

// Extract the action creators object and the reducer
const { actions, reducer } = cartSlice;

// Extract and export each action creator by name
export const { addItem, removeItem, clearCart, toggleDropdown, closeDropdown, openDropdown, hydrateCart } = actions;

// Export the reducer, either as a default or named export
export default reducer;
