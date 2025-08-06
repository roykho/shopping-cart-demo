import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
	name: 'cart',
    initialState: [{
        name: 'HeadPhones',
        price: 59.99,
    }],
	reducers: {
		addItem(state, action) {},
		removeItem(state, action) {},
		clearCart(state, action) {},
	},
});

// Extract the action creators object and the reducer
const { actions, reducer } = cartSlice;

// Extract and export each action creator by name
export const { addItem, removeItem, clearCart } = actions;

// Export the reducer, either as a default or named export
export default reducer;
