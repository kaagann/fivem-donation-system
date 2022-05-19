import { createSlice } from '@reduxjs/toolkit'

const data = localStorage.getItem("userData");
export const user = createSlice({
    name: "counter",
    initialState: {
        userData: data ? JSON.parse(data) : false,
    },
    reducers: {
        login: (state, action) => {
            state.userData = action.payload
        },
        logout: (state) => {
            state.userData = false;
            localStorage.clear();
        },
    }
})

export const { login, logout } = user.actions
export default user.reducer