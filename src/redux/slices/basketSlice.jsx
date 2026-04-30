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
    drawer: false,
    totalAmount: 0,
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
        setDrawer: (state, action) => {
            state.drawer = !state.drawer;
        },

        calculateBasketTotal: (state) => {
            state.totalAmount = 0;
            state.products && state.products.map((product) => {
                state.totalAmount += product.price * product.count;
            })
        },

        removeFromBasket: (state, action) => {
            const newProducts = state.products.filter((product) => String(product.id) !== String(action.payload));
            state.products = newProducts;
            writeFromBasketToStorage(newProducts);
            state.totalAmount = newProducts.reduce((sum, product) => sum + (product.price * (product.count || 0)), 0);
        }
    },
})

export const { addToBasket, setDrawer, calculateBasketTotal, removeFromBasket } = basketSlice.actions
export default basketSlice.reducer