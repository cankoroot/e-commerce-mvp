import { createSlice, current } from "@reduxjs/toolkit";

const getBasketFromStorage = () => {
    if (typeof window === "undefined") return [];

    const basket = localStorage.getItem("basket");
    if (!basket) return [];

    try {
        return JSON.parse(basket);
    } catch {
        return [];
    }
}

const initialState = {
    products: getBasketFromStorage(),
}

const writeFromBasketToStorage = (basket) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("basket", JSON.stringify(basket));
}



export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            const findProduct = state.products.find(
                (product) => String(product.id) === String(action.payload.id)
            );

            if (findProduct) {
                findProduct.count = (findProduct.count || 1) + 1;
            } else {
                state.products.push({ ...action.payload, count: 1 });
            }

            writeFromBasketToStorage(current(state.products));
        },
    },
})

export const { addToBasket } = basketSlice.actions
export default basketSlice.reducer