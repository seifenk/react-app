import { createSlice } from "@reduxjs/toolkit";

import { getToken } from "@/utils/auth";
const userSlice = createSlice({
    name: "user",
    initialState: {
        token: getToken(),
    },
    reducers: {
        login: () => {},
        logout: () => {},
    },
});

export default userSlice.reducer;
