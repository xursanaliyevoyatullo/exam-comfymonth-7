import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    products: [],
    amount: 4,
    user: null,
    mode: 'light',
    userData: localStorage.getItem("userData"),
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
    },
});



export const { userSetting, toggleMode, setUserData } = basketSlice.actions

export default basketSlice.reducer