import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./module/counter";
import userReducer from "./module/user";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
