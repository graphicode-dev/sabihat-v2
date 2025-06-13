// store/index.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import auth from "./slices/auth/authSlice";

const rootReducer = combineReducers({
    auth,
});

const store = configureStore({
    reducer: rootReducer, // لا داعي لـ persistReducer
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export { store };
