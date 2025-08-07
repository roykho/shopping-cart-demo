import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductsState } from '../types';

const initialState: ProductsState = {
    currentPage: 1,
    addedProductId: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setAddedProductId(state, action: PayloadAction<number | null>) {
            state.addedProductId = action.payload;
        },
        clearAddedProductId(state) {
            state.addedProductId = null;
        },
    },
});

// Extract the action creators object and the reducer
const { actions, reducer } = productsSlice;

// Extract and export each action creator by name
export const { setCurrentPage, setAddedProductId, clearAddedProductId } = actions;

// Export the reducer, either as a default or named export
export default reducer;