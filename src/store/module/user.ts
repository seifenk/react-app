import { createSlice } from "@reduxjs/toolkit";

import { getToken, setToken } from "@/utils/auth";
const userSlice = createSlice({
    name: "user",
    initialState: {
        token: getToken(),
        userInfo: {
            name: "",
            avatar: "/uploads/5d67fbbf-60d9-4150-894e-6b6813e81b12-101696304368_.pic.jpg",
        },
    },
    reducers: {
        setInfo(state, action) {
            state.userInfo = action.payload;
        },
    },
});

export const { setInfo } = userSlice.actions;

export default userSlice.reducer;
