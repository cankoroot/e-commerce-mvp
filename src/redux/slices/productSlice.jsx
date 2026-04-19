import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    products: [],
    selectedProduct: {},
    loading: false
}

export const getAllProducts = createAsyncThunk("getAllProducts", async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
});

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedProduct = state.products.find((p) => p.id == action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.loading = false;
        });
    }
});

export const { setSelectedProduct } = productSlice.actions;
export default productSlice.reducer;