import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
    products: [],
    amount: 4,
    user: null,
    mode: 'light',
    userData: localStorage.getItem("userData"),
    cartItems: [],
    numItemsInCart: 0,
    cartTotal: 0,
    shipping: 500,
    tax: 0,
    orderTotal: 0,
}

document.documentElement.setAttribute("data-theme", initialState.mode);

const basketSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {
        userSetting: (state, { payload }) => {
            state.user = payload
        },
        toggleMode: (state) => {
            state.mode = state.mode === "dark" ? "light" : "dark";
            localStorage.setItem("mode", state.mode);
            document.documentElement.setAttribute("data-theme", state.mode);
        },
        setUserData: (state, { payload }) => {
            state.userData = payload;
        },
        addItem: (state, action) => {
            const { product } = action.payload;
            const existingItem = state.cartItems.find(
                (item) => item.productID === product.productID
            );
            if (existingItem) {
                existingItem.amount += product.amount;
            } else {
                state.cartItems.push(product);
            }
            state.numItemsInCart += product.amount;
            state.cartTotal += product.price * product.amount;
            toast.success("Item added to cart");
        },
        removeItem: (state, action) => {
            const cartID = action.payload;
            const product = state.cartItems.find((item) => item.productID === cartID);
            if (product) {
                state.cartItems = state.cartItems.filter(
                    (item) => item.productID !== cartID
                );
                state.numItemsInCart -= product.amount;
                state.cartTotal -= product.price * product.amount;
                toast.error("Item removed from cart");
            } else {
                console.warn("Item not found in the cart");
            }
        },
    },
});



export const { userSetting, toggleMode, setUserData, addItem, removeItem } = basketSlice.actions

export default basketSlice.reducer