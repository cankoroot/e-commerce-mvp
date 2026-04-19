import { createSlice } from "@reduxjs/toolkit";

const getBasketFromStorage = () => {
    if (localStorage.getItem("basket")) {
        return JSON.parse(localStorage.getItem("basket"));
    }
    return [];
}

const initialState = {
    products: getBasketFromStorage(),
}

const writeFromBasketToStorage = (basket) => {
    localStorage.setItem("basket", JSON.stringify(basket));
}



export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            products && products.map((product) => {
                const findProduct = products && products.find((product) => product.id === action.payload.id);
                if (findProduct) {

                } else {
                    state.products = [...state.products, action.payload];
                    writeFromBasketToStorage(state.products);
                }
            })

        }
    },
})

export const { } = basketSlice.actions
export default basketSlice.reducer